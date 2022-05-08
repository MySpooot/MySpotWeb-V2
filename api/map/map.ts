import { request } from 'src/api';
import type {
    GetMapDetailParam,
    GetMapsQuery,
    GetMapsResponse,
    GetRecentMapsResponse,
    GetFavoriteMapsResponse,
    CreateMapBody,
    GetMapDetailResponse,
    CreateFavoriteMapsParam,
    DeleteFavoriteMapParam,
    CreateRecenMapsParam,
    DeleteRecentMapsParam,
    GetPrivateCodeParam,
    GetPrivateCodeResponse,
    GetCreateMyMapResponse
} from './types';

// 지도 상세
export const getMapDetail = ({ mapId }: GetMapDetailParam) => {
    return request<GetMapDetailResponse>({ method: 'GET', url: `/map/${mapId}/detail` });
};

// 내 지도
export const getMaps = (params?: GetMapsQuery) => {
    return request<GetMapsResponse[]>({ method: 'GET', url: '/map', params });
};
export const createMap = (body: CreateMapBody) => {
    return request<GetCreateMyMapResponse>({ method: 'POST', url: '/map', data: body });
};
export const updateMap = () => {
    return request({ method: 'PUT', url: '/map/mapId' });
};
export const deleteMap = (mapId: number) => {
    return request({ method: 'DELETE', url: `/map/${mapId}` });
};

// 최근 지도
export const getRecentMaps = (params?: GetMapsQuery) => {
    return request<GetRecentMapsResponse[]>({ method: 'GET', url: '/map/recent', params });
};
export const createRecentMap = (params: CreateRecenMapsParam) => {
    return request({ method: 'POST', url: `/map/recent/${params.recentMapId}` });
};
export const deleteRecentMap = (params: DeleteRecentMapsParam) => {
    return request({ method: 'DELETE', url: `/map/recent/${params.recentMapId}` });
};

// 즐겨찾기 지도
export const getFavoriteMaps = (query?: GetMapsQuery) => {
    return request<GetFavoriteMapsResponse[]>({ method: 'GET', url: '/map/favorite', params: query });
};
export const createFavoriteMap = ({ favoriteMapId }: CreateFavoriteMapsParam) => {
    return request({ method: 'POST', url: `/map/favorite/${favoriteMapId}` });
};
export const deleteFavoriteMap = ({ favoriteMapId }: DeleteFavoriteMapParam) => {
    return request({ method: 'DELETE', url: `/map/favorite/${favoriteMapId}` });
};

export const getPrivateCode = ({ mapId }: GetPrivateCodeParam) => {
    return request<GetPrivateCodeResponse>({ method: 'GET', url: `/map/${mapId}/code` });
};

export const checkPrivateCode = (param: { mapId: number }, body: { code: string }) => {
    return request<boolean>({ method: 'POST', url: `/map/${param.mapId}/code/match`, data: body });
};
