import { useCallback } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

// import { Container, Top, LikeArea, LikeIcon, BookmarkIcon, Bottom, BackIcon, ButtonText } from './styles';
import { Container, Top, Bottom, LikeArea, ButtonText } from './styles';
import { MapMarkerVO } from '@/vo';
import { Path } from '@/constants';
import { useMeState } from '@/atoms';
import useMarkerUserAction from '@/hooks/useMarkerUserAction';
import Button from '@/components/Button';

import icArrowLeft from '@/assets/map/ic_arrow_left.svg';
import icBookmark from '@/assets/map/ic_bookmark.png';
import icMarkedBookmark from '@/assets/map/ic_marked_bookmark.png';
import icLikeOn from '@/assets/map/ic_like_on.png';
import icLikeOff from '@/assets/map/ic_like_off.png';

type MapDetailFooterProps = {
    marker: MapMarkerVO;
    viewButton: {
        text: string;
        onClick: () => void;
    };
};

const MapDetailFooter = ({ marker, viewButton }: MapDetailFooterProps) => {
    const router = useRouter();
    const { mapId } = router.query;

    const { me } = useMeState();
    const { onBookmarkClick: onBookmarkClick_, onLikeClick: onLikeClick_ } = useMarkerUserAction(mapId as string);

    const onBookmarkClick = useCallback(() => {
        if (!me) return;

        onBookmarkClick_(marker);
    }, [me, onBookmarkClick_, marker]);

    const onLikeClick = useCallback(() => {
        if (!me) return;

        onLikeClick_(marker);
    }, [me, onLikeClick_, marker]);

    return (
        <Container>
            <Top>
                <LikeArea on={marker.isLike} onClick={onLikeClick}>
                    <Image src={marker.isLike ? icLikeOn : icLikeOff} />
                    <div className='count'>{marker.likeCount}</div>
                </LikeArea>
                <Image src={marker.isMyLocation ? icMarkedBookmark : icBookmark} onClick={onBookmarkClick} />
            </Top>
            <Bottom>
                <Button fullWidth={false} rounded onClick={() => router.push(`${Path.myMap}/${mapId}`)}>
                    <Image src={icArrowLeft} />
                </Button>
                <Button style={{ marginLeft: '1rem' }} rounded onClick={viewButton.onClick}>
                    <ButtonText>{viewButton.text}</ButtonText>
                </Button>
            </Bottom>
        </Container>
    );
};

export default MapDetailFooter;
