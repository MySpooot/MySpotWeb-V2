import dayjs from 'dayjs';

import { GetRepliesResponse } from 'src/api/reply';

export class MarkerReplyVO {
    id: number;
    created: string;
    userId: number;
    nickName: string;
    message: string;

    static from(reply: GetRepliesResponse) {
        return new MarkerReplyVO(reply);
    }

    constructor(reply: GetRepliesResponse) {
        this.id = reply.id;
        this.created = dayjs(reply.created).format('YY.MM.DD');
        this.userId = reply.userId;
        this.nickName = reply.userNickName;
        this.message = reply.message;
    }
}
