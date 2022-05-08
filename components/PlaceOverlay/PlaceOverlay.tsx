import React, { FC, MouseEvent, useCallback } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useMutation } from 'react-query';
import { Popup } from 'reactjs-popup';

import {
    Container,
    Wrapper,
    PlaceName,
    // BookMarkIcon,
    // VerticalThreeIcon,
    DeletePopup,
    Address,
    RoadAddress,
    RoadAddressName,
    ButtonArea,
    ActiveSpan
} from './styles';
import { Path } from '@/constants';
import { useMapPlaceOverlayState, useMeState } from 'src/atoms';
import { MapMarkerVO } from 'src/vo';
import { deleteMarker } from 'src/api';
import { getMapDetailHelper, getMarkersHelper } from 'src/query';
import useMarkerUserAction from 'src/hooks/useMarkerUserAction';
// import Icon from 'src/components/Icon';

// import BookmarkOff from '@/assets/map/ic_bookmark.svg';
// import BookmarkOn from '@/assets/map/ic_marked_bookmark.svg';
// import icComment from '@/assets/map/ic_comment.svg';
// import icLikeOn from '@/assets/map/ic_like_on.svg';
// import icLikeOff from '@/assets/map/ic_like_off.svg';
// import icDotThree from '@/assets/home/ic-vertical-circle.svg';

import icBookmark from '@/assets/map/ic_bookmark.png';
import icMarkedBookmark from '@/assets/map/ic_marked_bookmark.png';
import icDotThree from '@/assets/map/ic_vertical_circle.png';
import icLikeOn from '@/assets/map/ic_like_on.png';
import icLikeOff from '@/assets/map/ic_like_off.png';
import icComment from '@/assets/map/ic_comment.png';

const PlaceOverlay: FC = () => {
    const router = useRouter();
    const { mapId } = router.query;
    // const navigate = useNavigate();
    // const { mapId } = useParams<{ mapId: string }>();

    const { mapPlaceOverlay, setMapPlaceOverlay } = useMapPlaceOverlayState();

    const { onBookmarkClick: onBookmarkClick_, onLikeClick: onLikeClick_ } = useMarkerUserAction(mapId as string);

    const { me } = useMeState();
    const { data: mapDetail } = getMapDetailHelper.useQuery(Number(mapId));

    const { mutate: fetchDeleteMarker } = useMutation(deleteMarker, {
        onMutate: () => {
            setMapPlaceOverlay(undefined);
            getMarkersHelper.setQueryData(Number(mapId), markers => {
                if (!markers) return undefined;

                return markers.filter(marker => marker.kakaoAddressId !== mapPlaceOverlay?.kakaoAddressId);
            });
        },
        onError: error => {
            // TODO: 실패시 롤백
            console.error(error);
        }
    });

    const onPlaceOverlayClick = useCallback(() => {
        if (!mapPlaceOverlay) return;

        router.push(`/map/${mapId}/kakao/${mapPlaceOverlay.kakaoAddressId}`);
    }, [mapId, mapPlaceOverlay]);

    const onBookMarkClick = useCallback(
        (marker: MapMarkerVO) => {
            if (!me) return;

            setMapPlaceOverlay(value => {
                if (!value) return;

                return { ...value, isMyLocation: !marker.isMyLocation };
            });

            onBookmarkClick_(marker);
        },
        [me, onBookmarkClick_, setMapPlaceOverlay]
    );

    const onLikeClick = useCallback(() => {
        if (!mapPlaceOverlay) return;

        setMapPlaceOverlay(value => {
            if (!value) return;

            return { ...value, isLike: !value.isLike, likeCount: value.isLike ? value.likeCount - 1 : value.likeCount + 1 };
        });

        onLikeClick_(mapPlaceOverlay);
    }, [mapPlaceOverlay, setMapPlaceOverlay, onLikeClick_]);

    const onDeleteClick = useCallback(() => {
        if (!mapPlaceOverlay) return;

        fetchDeleteMarker({ markerId: mapPlaceOverlay.id });
    }, [mapPlaceOverlay, fetchDeleteMarker]);

    if (!mapPlaceOverlay) {
        return <></>;
    }

    return (
        <Container data-testid='placeOverlay' onClick={onPlaceOverlayClick}>
            <Wrapper>
                <div style={{ display: 'flex' }}>
                    <Image
                        src={mapPlaceOverlay.isMyLocation ? icMarkedBookmark : icBookmark}
                        height='28'
                        width='28'
                        layout='fixed'
                        onClick={event => {
                            event.stopPropagation();
                            onBookMarkClick(mapPlaceOverlay);
                        }}
                    />
                    <div style={{ flexGrow: 1, marginLeft: '1rem' }}>
                        <div className='title'>
                            <PlaceName>{mapPlaceOverlay.name}</PlaceName>
                            {mapDetail?.isOwner && (
                                <Popup
                                    on='click'
                                    position='bottom right'
                                    trigger={<Image src={icDotThree} onClick={(event: MouseEvent<HTMLImageElement>) => event.stopPropagation()} />}
                                    closeOnDocumentClick
                                >
                                    {/* {() => <DeletePopup onClick={onDeleteClick}>삭제</DeletePopup>} */}
                                    <DeletePopup onClick={onDeleteClick}>삭제</DeletePopup>
                                </Popup>
                            )}
                        </div>
                        <Address data-testid='address'>{mapPlaceOverlay.address}</Address>
                        {mapPlaceOverlay.roadAddress && (
                            <RoadAddress>
                                <div className='label'>지번</div>
                                <RoadAddressName data-testid='roadAddress'>{mapPlaceOverlay.roadAddress}</RoadAddressName>
                            </RoadAddress>
                        )}
                    </div>
                </div>

                <ButtonArea>
                    <Image
                        src={mapPlaceOverlay.isLike ? icLikeOn : icLikeOff}
                        width={28}
                        height={28}
                        style={{ cursor: 'pointer' }}
                        onClick={event => {
                            event.stopPropagation();
                            onLikeClick();
                        }}
                    />
                    <ActiveSpan active={mapPlaceOverlay.isLike} style={{ marginRight: '0.875rem' }}>
                        {mapPlaceOverlay.likeCount}
                    </ActiveSpan>
                    <Image
                        src={icComment}
                        width={28}
                        height={28}
                        style={{ cursor: 'pointer' }}
                        onClick={event => {
                            event.stopPropagation();
                            router.push(`${Path.myMap}/${mapId}/review/${mapPlaceOverlay.kakaoAddressId}`);
                        }}
                    />
                    <ActiveSpan>{mapPlaceOverlay.replyCount}</ActiveSpan>
                </ButtonArea>
            </Wrapper>
        </Container>
    );
};

export default PlaceOverlay;
