import { useCallback } from 'react';
import { useMutation } from 'react-query';

import { createMyLocation, deleteMyLocation, createMarkerLike, deleteMarkerLike } from 'src/api';
import { useMapPlaceOverlayState } from 'src/atoms';
import { getMarkersHelper } from 'src/query';
import { MapMarkerVO } from 'src/vo';

const useMarkerUserAction = (mapId?: string) => {
    const { setMapPlaceOverlay } = useMapPlaceOverlayState();

    const { mutate: fetchCreateMyLocation, isLoading: isCreatMyLocationLoading } = useMutation(createMyLocation, {
        onMutate: ({ addressId }) => {
            getMarkersHelper.setQueryData(Number(mapId), markers => {
                if (!markers) return;

                return markers.map(marker => {
                    if (marker.kakaoAddressId === addressId) {
                        return { ...marker, isMyLocation: true };
                    }

                    return marker;
                });
            });

            setMapPlaceOverlay(value => {
                if (!value) return;

                if (value.id === addressId) {
                    return { ...value, isMyLocation: true };
                }

                return value;
            });
        }
    });

    const { mutate: fetchDeleteMyLocation, isLoading: isDeleteMyLocationLoading } = useMutation(deleteMyLocation, {
        onMutate: ({ addressId }) => {
            getMarkersHelper.setQueryData(Number(mapId), markers => {
                if (!markers) return;

                return markers.map(marker => {
                    if (marker.kakaoAddressId === addressId) {
                        return { ...marker, isMyLocation: false };
                    }

                    return marker;
                });
            });

            setMapPlaceOverlay(value => {
                if (!value) return;

                if (value.id === addressId) {
                    return { ...value, isMyLocation: false };
                }

                return value;
            });
        }
    });

    const onBookmarkClick = useCallback(
        (place: MapMarkerVO) => {
            if (isCreatMyLocationLoading || isDeleteMyLocationLoading) return;

            if (place.isMyLocation) {
                fetchDeleteMyLocation({ addressId: place.kakaoAddressId });
            } else {
                fetchCreateMyLocation({
                    addressId: place.kakaoAddressId,
                    locationName: place.name,
                    address: place.address,
                    roadAddress: place.roadAddress
                });
            }
        },
        [isCreatMyLocationLoading, isDeleteMyLocationLoading, fetchDeleteMyLocation, fetchCreateMyLocation]
    );

    const { mutate: fetchCreateMarkerLike, isLoading: isCreateMarkerLikeLoading } = useMutation(createMarkerLike, {
        onMutate: ({ markerId }) => {
            getMarkersHelper.setQueryData(Number(mapId), markers => {
                if (!markers) return;

                return markers.map(marker => {
                    if (marker.id === markerId) {
                        return { ...marker, isLike: true, likeCount: marker.likeCount + 1 };
                    }

                    return marker;
                });
            });
        },
        onError: error => {
            // TODO: 실패시 롤백
            console.error(error);
        }
    });

    const { mutate: fetchDeleteMarkerLike, isLoading: isDeleteMarkerLikeLoading } = useMutation(deleteMarkerLike, {
        onMutate: ({ markerId }) => {
            getMarkersHelper.setQueryData(Number(mapId), markers => {
                if (!markers) return;

                return markers.map(marker => {
                    if (marker.id === markerId) {
                        return { ...marker, isLike: false, likeCount: marker.likeCount - 1 };
                    }

                    return marker;
                });
            });
        },
        onError: error => {
            // TODO: 실패시 롤백
            console.error(error);
        }
    });

    const onLikeClick = useCallback(
        (place: MapMarkerVO) => {
            if (isCreateMarkerLikeLoading || isDeleteMarkerLikeLoading) return;

            if (place.isLike) {
                fetchDeleteMarkerLike({ markerId: place.id });
            } else {
                fetchCreateMarkerLike({ markerId: place.id });
            }
        },
        [fetchCreateMarkerLike, fetchDeleteMarkerLike, isCreateMarkerLikeLoading, isDeleteMarkerLikeLoading]
    );

    return { onLikeClick, onBookmarkClick };
};

export default useMarkerUserAction;
