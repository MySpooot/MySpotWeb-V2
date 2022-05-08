import { FC, useCallback, MouseEvent } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { useMutation } from 'react-query';

import {
    Container,
    BookmarkIcon,
    CenterArea,
    AddressName,
    JibunAddress,
    RoadAddressWrapper,
    RoadAddressLabel,
    RoadAddress,
    DeleteButton,
    ButtonArea,
    ButtonWrapper,
    PlaceActionIcon,
    ActiveSpan
} from './styles';
import { Path } from '@/constants';
import { MapMarkerVO } from 'src/vo';
import useMarkerUserAction from '@/hooks/useMarkerUserAction';
import { deleteMarker } from 'src/api';
import { getMapDetailHelper, getMarkersHelper } from 'src/query';

// import icBookmark from '@/assets/map/ic_bookmark.svg';
// import icMarkedBookmark from '@/assets/map/ic_marked_bookmark.svg';
// import icLikeOn from '@/assets/map/ic_like_on.svg';
// import icLikeOff from '@/assets/map/ic_like_off.svg';
// import icComment from '@/assets/map/ic_comment.svg';
import icBookmark from '@/assets/map/ic_bookmark.png';
import icMarkedBookmark from '@/assets/map/ic_marked_bookmark.png';
import icLikeOn from '@/assets/map/ic_like_on.png';
import icLikeOff from '@/assets/map/ic_like_off.png';
import icComment from '@/assets/map/ic_comment.png';

type PlaceListItemProps = {
    place: MapMarkerVO;
};

const PlaceListItem: FC<PlaceListItemProps> = ({ place }) => {
    const router = useRouter();
    const { mapId } = router.query;
    // const navigate = useNavigate();
    // const { mapId } = useParams<{ mapId: string }>();

    const { onBookmarkClick: onBookmarkClick_, onLikeClick: onLikeClick_ } = useMarkerUserAction(mapId as string);

    const { data: mapDetail } = getMapDetailHelper.useQuery(Number(mapId));

    const { mutate: fetchDeleteMarker } = useMutation(deleteMarker, {
        onSuccess: () => {
            getMarkersHelper.setQueryData(Number(mapId), markers => {
                if (!markers) return;

                return markers.filter(marker => marker.id !== place.id);
            });
        }
    });

    const onBookmarkClick = useCallback(
        (event: MouseEvent<HTMLImageElement>) => {
            event.stopPropagation();

            onBookmarkClick_(place);
        },
        [place, onBookmarkClick_]
    );

    const onPlaceClick = useCallback(() => {
        router.push(`${Path.myMap}/${mapId}/kakao/${place.kakaoAddressId}`);
    }, [mapId, place]);

    const onLikeClick = useCallback(() => {
        onLikeClick_(place);
    }, [onLikeClick_, place]);

    const onCommentClick = useCallback(() => {
        // navigate(`${Path.myMap}/${mapId}/review/${place.kakaoAddressId}`);
        router.push(`${Path.myMap}/${mapId}/review/${place.kakaoAddressId}`);
    }, [mapId, place]);

    const onDeleteClick = useCallback(() => {
        if (!confirm('정말 삭제하시겠습니까?')) return;

        fetchDeleteMarker({ markerId: place.id });
    }, [fetchDeleteMarker, place]);

    return (
        <Container>
            <div style={{ display: 'flex' }}>
                <Image
                    width={28}
                    height={28}
                    alt='bookmark'
                    layout='fixed'
                    src={place.isMyLocation ? icMarkedBookmark : icBookmark}
                    onClick={event => onBookmarkClick(event)}
                />
                <CenterArea onClick={onPlaceClick}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <AddressName>{place.name}</AddressName>
                        {mapDetail?.isOwner && <DeleteButton onClick={onDeleteClick}>삭제</DeleteButton>}
                    </div>
                    {place.address && <JibunAddress>{place.address}</JibunAddress>}
                    {place.roadAddress && (
                        <RoadAddressWrapper>
                            <RoadAddressLabel>지번</RoadAddressLabel>
                            <RoadAddress>{place.roadAddress}</RoadAddress>
                        </RoadAddressWrapper>
                    )}
                </CenterArea>
            </div>
            <ButtonArea>
                <ButtonWrapper onClick={onLikeClick}>
                    <Image width={28} height={28} alt='like' src={place.isLike ? icLikeOn : icLikeOff} />
                    <ActiveSpan active={place.isLike}>{place.likeCount}</ActiveSpan>
                </ButtonWrapper>
                <ButtonWrapper onClick={onCommentClick}>
                    <Image width={28} height={28} alt='comment' src={icComment} />
                    <ActiveSpan>{place.replyCount}</ActiveSpan>
                </ButtonWrapper>
            </ButtonArea>
        </Container>
    );
};

export default PlaceListItem;
