// 지도 상세
export type GetMapDetailParam = {
    mapId: number;
};

export type GetMapDetailResponse = {
    isOwner: boolean;
    mapId: number;
    isPrivate: boolean;
    mapName: string;
    accessible: boolean;
    isFavorite: boolean;
};

// 내 지도
export type GetMapsQuery = {
    offset?: number;
    limit?: number;
};

export type GetMapsResponse = {
    id: number;
    userId: number;
    mapName: string;
    isPrivate: boolean;
    created: number;
};

// 최근 지도
export type GetRecentMapsResponse = {
    id: number;
    userId: number;
    mapName: string;
    isPrivate: boolean;
    created: number;
};

export type CreateRecenMapsParam = {
    recentMapId: number;
};

export type DeleteRecentMapsParam = {
    recentMapId: number;
};

// 즐겨찾기 지도
export type GetFavoriteMapsResponse = {
    id: number;
    userId: number;
    mapId: number;
    mapName: string;
    isPrivate: boolean;
    created: number;
};

export type CreateFavoriteMapsParam = {
    favoriteMapId: number;
};

export type CreateMapBody = {
    mapName: string;
    isPrivate: boolean;
};

export type DeleteFavoriteMapParam = {
    favoriteMapId: number;
};

// 초대 코드
export type GetPrivateCodeParam = {
    mapId: number;
};

export type GetPrivateCodeResponse = {
    code: string;
};

export type GetCreateMyMapResponse = {
    id: number;
};
