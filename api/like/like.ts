import { request } from '@/api';
import type { CreateMarkerLikeParam, DeleteMarkerLikeParam } from './types';

export const createMarkerLike = ({ markerId }: CreateMarkerLikeParam) => {
    return request({ method: 'POST', url: `/map/marker/${markerId}/like` });
};

export const deleteMarkerLike = ({ markerId }: DeleteMarkerLikeParam) => {
    return request({ method: 'DELETE', url: `/map/marker/${markerId}/like` });
};
