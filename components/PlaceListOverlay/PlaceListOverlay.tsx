import React, { FC, useEffect, useLayoutEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { Container, Wrapper, Top, Title, Total, CloseIcon, PlaceList, NoPlace } from './styles';
import { getMarkersHelper } from 'src/query';
import PlaceListItem from '@/components/PlaceListItem';

// import icClose from '@/assets/map/ic_close.svg';
import icClose from '@/assets/map/ic_close.png';

type PlaceListOverlayProps = {
    close: () => void;
};

const PlaceListOverlay: FC<PlaceListOverlayProps> = ({ close }) => {
    const router = useRouter();
    const { mapId } = router.query;
    const { data: markers } = getMarkersHelper.useQuery(Number(mapId));

    const rootRef = useRef<HTMLElement>();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        rootRef.current = window.document.getElementById('__next')!;

        const handler = (event: MouseEvent) => {
            if (ref.current?.contains(event.target as Element)) return;

            close();
        };

        rootRef.current?.addEventListener('click', handler);

        return () => rootRef.current?.removeEventListener('click', handler);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!markers) {
        return <></>;
    }

    return (
        <Container>
            <Wrapper ref={ref}>
                <Top>
                    <Title>
                        장소목록&nbsp;&nbsp;
                        <Total>{markers.length}개</Total>
                    </Title>
                    <Image src={icClose} width={24} height={24} onClick={close} />
                </Top>
                <PlaceList>
                    {markers.length === 0 && <NoPlace>저장되어있는 장소가 없습니다.</NoPlace>}
                    {markers.map(marker => (
                        <PlaceListItem key={marker.id} place={marker} />
                    ))}
                </PlaceList>
            </Wrapper>
        </Container>
    );
};

export default PlaceListOverlay;
