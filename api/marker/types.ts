export type GetMarkerParam = {
    mapId: number;
};

export type GetMarkersResponse = {
    id: number;
    locationName: string;
    latitude: string;
    longitude: string;
    addressId: number;
    address?: string;
    roadAddress?: string;
    isMyLocation: boolean;
    isLike: boolean;
    likeCount: number;
    replyCount: number;
};

export type CreateMarkerParam = {
    mapId: number;
};

export type CreateMarkerBody = {
    locationName: string;
    latitude: string;
    longitude: string;
    addressId: number;
    address?: string;
};

export type CreateMarkerResponse = {
    id: number;
    userId: number;
    mapId: number;
    locationName: string;
    latitude: string;
    longitude: string;
    addressId: number;
    address?: string;
    roadAddress?: string;
};

export type DeleteMarkerParam = {
    markerId: number;
};

export type CreateMyLocationBody = {
    locationName: string;
    addressId: number;
    address?: string;
    roadAddress?: string;
};

export type DeleteMyLocationParam = {
    addressId: number;
};

export type GetMyLocationResponse = {
    name: string;
    id: number;
    address?: string;
    roadAddress?: string;
    addressId: number;
};

export type GetLocationsQuery = {
    offset?: number;
    limit?: number;
};
