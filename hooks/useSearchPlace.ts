import { useState, useCallback } from 'react';

export type Place = {
    id: number;
    locationName: string;
    longitude: string;
    latitude: string;
    addressId: number;
    address: string;
    roadAddress?: string;
    // phone: string;
    // placeName: string;
    // placeUrl: string;
    // categoryGroupCode: string;
    // categoryGroupName: string;
    // categoryName: string;
    // distance: string;
};

const useSearchMap = () => {
    const [places, setPlaces] = useState<Place[]>();

    const searchPlaces = useCallback((keyword: string) => {
        if (!window.kakao.maps.services) return;

        const ps = new window.kakao.maps.services.Places();

        // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
        ps.keywordSearch(keyword, (places: any, status: any) => {
            if (status === window.kakao.maps.services.Status.OK) {
                setPlaces(
                    places.map(place => ({
                        locationName: place.place_name,
                        longitude: place.x,
                        latitude: place.y,
                        addressId: place.id,
                        address: place.address_name,
                        roadAddress: place.road_address_name
                        // phone: place.phone,
                        // placeUrl: place.place_url,
                        // categoryGroupCode: place.category_group_code,
                        // categoryGroupName: place.category_group_name,
                        // categoryName: place.category_name,
                        // distance: place.distance,
                    }))
                );
            } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
                alert('검색 결과가 존재하지 않습니다.');
                return;
            } else if (status === window.kakao.maps.services.Status.ERROR) {
                alert('검색 결과 중 오류가 발생했습니다.');
                return;
            }
        });
    }, []);

    return { searchPlaces, places };
};

export default useSearchMap;
