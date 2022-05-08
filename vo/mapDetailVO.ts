import { GetMapDetailResponse } from 'src/api/map';

export class MapDetailVO {
    id: number;
    name: string;
    isFavorite: boolean;
    isOwner: boolean;
    isPrivate: boolean;
    accessible: boolean;

    static from(mapDetail: GetMapDetailResponse) {
        return new MapDetailVO(mapDetail);
    }

    constructor(mapDetail: GetMapDetailResponse) {
        this.id = mapDetail.mapId;
        this.name = mapDetail.mapName;
        this.isFavorite = mapDetail.isFavorite;
        this.isOwner = mapDetail.isOwner;
        this.isPrivate = mapDetail.isPrivate;
        this.accessible = mapDetail.accessible;
    }
}
