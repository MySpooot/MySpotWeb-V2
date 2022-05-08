import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import KakaoPlaceIframe from '@/components/KakaoPlaceIframe';
import MapDetailFooter from '@/components/MapDetailFooter';
import { Path } from '@/constants';
import { getMarkersHelper } from '@/query';
import { MapMarkerVO } from '@/vo';

const Kakao = () => {
    const router = useRouter();
    const { mapId, kakaoAddressId } = router.query;

    const [marker, setMarker] = useState<MapMarkerVO>();

    const { data: markers } = getMarkersHelper.useQuery(Number(mapId));

    useEffect(() => {
        const marker = markers?.find(marker => marker.kakaoAddressId === Number(kakaoAddressId));

        if (!marker) {
            router.push(Path.home);
            return;
        }

        setMarker(marker);
    }, [markers]); // eslint-disable-line react-hooks/exhaustive-deps

    if (!kakaoAddressId || !marker) {
        return <></>;
    }

    return (
        <Container>
            <KakaoPlaceIframe addressId={kakaoAddressId as string} />
            <MapDetailFooter
                marker={marker}
                viewButton={{ text: '후기 보기', onClick: () => router.push(`${Path.myMap}/${mapId}/review/${kakaoAddressId}`) }}
            />
        </Container>
    );
};

export default Kakao;

export const Container = styled.div`
    display: flex;
    height: 100vh;
    flex-direction: column;
`;
