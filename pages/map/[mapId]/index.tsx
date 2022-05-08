import { useState, useMemo, useCallback } from 'react';
// import { flushSync } from 'react-dom';
import { NextPage, NextPageContext } from 'next';
import Image from 'next/image';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { Map as KakaoMap, MapMarker } from 'react-kakao-maps-sdk';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Container, MapContainer, OverlayContainer } from '@/styles/Map';
import MapHeader from '@/components/MapHeader';
import { getMapDetailHelper, getMarkersHelper } from '@/query';
import { createFavoriteMap, deleteFavoriteMap, getMapDetail, getMarkers, getPrivateCode } from '@/api';
import { useMeState, useMapAccessible, useMapPlaceOverlayState } from '@/atoms';
import { Path } from '@/constants';
import PlaceListOverlay from '@/components/PlaceListOverlay';
import PlaceListButton from '@/components/PlaceListButton';
import PlaceOverlay from '@/components/PlaceOverlay';

import icFavoriteOn from '@/assets/map/ic_favorite_on.png';
import icFavoriteOff from '@/assets/map/ic_favorite_off.png';
// import icMarker from '@/assets/map/ic_marker.svg';
// import icMarkedMarker from '@/assets/map/ic_marked_marker.svg';
import icMarker from '@/assets/map/ic_marker.png';
import icMarkedMarker from '@/assets/map/ic_marked_marker.png';
// import icShare from '@/assets/map/ic_share.svg';
import icShare from '@/assets/map/ic_share.png';

const Map: NextPage<any> = props => {
    const router = useRouter();
    const { mapId } = router.query;

    console.log({ mapId, router });

    const [mapLevel, setMapLevel] = useState(5);
    const [isOpenPlayListOverlay, setIsOpenPlayListOverlay] = useState(false);

    const { data: mapDetail } = getMapDetailHelper.useQuery(Number(mapId), { initialData: props.mapDetail });
    const { data: markers } = getMarkersHelper.useQuery(Number(mapId), { initialData: props.markers });
    const { data: privateCode } = useQuery(['getPrivateCode', mapId], () => getPrivateCode({ mapId: Number(mapId) }).then(({ code }) => code), {
        enabled: !!mapDetail?.isPrivate
    });
    console.log({ markers });
    const { mapAccessible } = useMapAccessible();
    const { mapPlaceOverlay, setMapPlaceOverlay } = useMapPlaceOverlayState();

    const centerLocation = useMemo(() => {
        if (!markers?.length) {
            return { latitude: 37.516, longitude: 127.13 };
        }

        if (mapPlaceOverlay) {
            return { latitude: mapPlaceOverlay.latitude, longitude: mapPlaceOverlay.longitude };
        }

        return { latitude: markers[0].latitude, longitude: markers[0].longitude };
    }, [markers, mapPlaceOverlay]);

    const markerSize = useMemo(() => {
        if (mapLevel >= 6 && mapLevel < 8) {
            return { width: 36.8, height: 50.4 };
        }

        if (mapLevel >= 8 && mapLevel <= 10) {
            return { width: 27.6, height: 37.8 };
        }

        return {
            width: 46,
            height: 63
        };
    }, [mapLevel]);

    const onFavoriteClick = useCallback(() => {
        if (!mapDetail) return;

        if (mapDetail?.isFavorite) {
            getMapDetailHelper.setQueryData(Number(mapId), detail => {
                if (!detail) return;

                return {
                    ...detail,
                    isFavorite: false
                };
            }); // eslint-disable-line @typescript-eslint/no-non-null-assertion
            deleteFavoriteMap({ favoriteMapId: Number(mapId) });

            return;
        }

        getMapDetailHelper.setQueryData(Number(mapId), detail => {
            if (!detail) return;

            return {
                ...detail,
                isFavorite: true
            };
        }); // eslint-disable-line @typescript-eslint/no-non-null-assertion
        createFavoriteMap({ favoriteMapId: Number(mapId) });
    }, [mapId, mapDetail]);

    if (!mapDetail || !markers) {
        return <></>;
    }

    return (
        <Container>
            <MapHeader />
            <MapContainer>
                <KakaoMap
                    level={mapLevel}
                    maxLevel={10}
                    minLevel={2}
                    onZoomChanged={map => setMapLevel(map.getLevel())}
                    style={{ width: '100%', height: '100%' }}
                    center={{ lat: centerLocation.latitude, lng: centerLocation.longitude }}
                >
                    {markers.map((marker, index) => (
                        <MapMarker
                            key={marker.id}
                            image={{
                                src: marker.isMyLocation ? icMarkedMarker.src : icMarker.src,
                                size: markerSize,
                                options: { alt: 'marker' }
                            }}
                            position={{ lat: marker.latitude, lng: marker.longitude }}
                            onClick={() => setMapPlaceOverlay(markers[index])}
                        />
                    ))}
                    {isOpenPlayListOverlay ? (
                        <PlaceListOverlay close={() => setIsOpenPlayListOverlay(false)} />
                    ) : (
                        <OverlayContainer>
                            <PlaceListButton up={!!mapPlaceOverlay} onClick={() => setIsOpenPlayListOverlay(true)} />
                            {mapPlaceOverlay && <PlaceOverlay />}
                        </OverlayContainer>
                    )}
                </KakaoMap>
                {/* <FavoriteIcon alt='favorite' src={mapDetail.isFavorite ? icFavoriteOn : icFavoriteOff} onClick={onFavoriteClick} /> */}
                <div style={{ position: 'absolute', top: '5rem', left: '0.5rem', zIndex: 11 }}>
                    <Image
                        width={48}
                        height={48}
                        alt='favorite'
                        src={mapDetail.isFavorite ? icFavoriteOn : icFavoriteOff}
                        onClick={onFavoriteClick}
                    />
                </div>
                <CopyToClipboard
                    // text={`${window.location.origin}${Path.myMap}/${mapId}${privateCode ? `?code=${privateCode}` : ''}`}
                    text={`https://myspot.co.kr${Path.myMap}/${mapId}${privateCode ? `?code=${privateCode}` : ''}`}
                    onCopy={() => alert('복사 성공')}
                >
                    {/* <ShareIcon src={icShare} /> */}
                    <div style={{ position: 'absolute', top: '8.25rem', left: '0.5rem', zIndex: 11 }}>
                        <Image width={48} height={48} src={icShare} />
                    </div>
                </CopyToClipboard>
            </MapContainer>
        </Container>
    );
};

export const getServerSideProps = async (context: NextPageContext) => {
    // console.log('@@', context.query);
    // console.log('##', context.query.mapId);
    const mapId = Number(context.query.mapId);

    const [mapDetail, markers] = await Promise.all([getMapDetail({ mapId }), getMarkers({ mapId })]);
    // const [mapDetail, markers] = await Promise.all([getMapDetail({ mapId: 235 }), getMarkers({ mapId: 235 })]);

    return { props: { mapDetail, markers } };
};

export default Map;
