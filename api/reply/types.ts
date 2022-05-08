export type GetRepliesParam = {
    markerId: number;
};

export type GetRepliesQuery = {
    offset?: number;
    limit?: number;
};

export type GetRepliesResponse = {
    id: number;
    created: number;
    userId: number;
    userNickName: string;
    markerId: number;
    message: string;
};

export type CreateReplyParam = {
    markerId: number;
};

export type CreateReplyBody = {
    message: string;
};

export type CreateReplyResponse = {
    id: number;
    created: number;
    message: string;
    userId: number;
    markerId: number;
    userNickName: string;
};

export type UpdateReplyParam = {
    replyId: number;
};

export type UpdateReplyBody = {
    message: string;
};

export type DeleteReplyParam = {
    replyId: number;
};
