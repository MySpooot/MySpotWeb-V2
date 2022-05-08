import { GetMarkersResponse } from 'src/api/marker';

export class MapMarkerVO {
    id: number;
    name: string;
    kakaoAddressId: number;
    address?: string;
    roadAddress?: string;
    latitude: number;
    longitude: number;
    isMyLocation: boolean;
    isLike: boolean;
    likeCount: number;
    replyCount: number;

    static from(marker: GetMarkersResponse) {
        return new MapMarkerVO(marker);
    }

    constructor(marker: GetMarkersResponse) {
        this.id = marker.id;
        this.name = marker.locationName;
        this.kakaoAddressId = marker.addressId;
        this.address = marker.address;
        this.roadAddress = marker.roadAddress;
        this.latitude = Number(marker.latitude);
        this.longitude = Number(marker.longitude);
        this.isMyLocation = marker.isMyLocation;
        this.isLike = marker.isLike;
        this.likeCount = marker.likeCount;
        this.replyCount = marker.replyCount;
    }
}
