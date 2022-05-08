import { request } from 'src/api';
import type {
    GetRepliesParam,
    GetRepliesQuery,
    GetRepliesResponse,
    CreateReplyParam,
    CreateReplyBody,
    CreateReplyResponse,
    UpdateReplyParam,
    UpdateReplyBody,
    DeleteReplyParam
} from './types';

export const getReplies = ({ markerId }: GetRepliesParam, query: GetRepliesQuery) => {
    return request<GetRepliesResponse[]>({ method: 'GET', url: `/map/marker/${markerId}/replies`, params: query });
};

export const createReply = ({ markerId }: CreateReplyParam, body: CreateReplyBody) => {
    return request<CreateReplyResponse>({ method: 'POST', url: `/map/marker/${markerId}/replies`, data: body });
};

export const updateReply = ({ replyId }: UpdateReplyParam, body: UpdateReplyBody) => {
    return request({ method: 'PUT', url: `/map/marker/replies/${replyId}`, data: body });
};

export const deleteReply = ({ replyId }: DeleteReplyParam) => {
    return request({ method: 'DELETE', url: `/map/marker/replies/${replyId}` });
};
