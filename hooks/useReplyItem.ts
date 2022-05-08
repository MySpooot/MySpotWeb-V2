import { useMutation } from 'react-query';

import { updateReply, deleteReply, UpdateReplyParam, UpdateReplyBody } from '@/api';
import { useMarkerRepliesState } from '@/atoms';
import { getMarkersHelper } from '@/query';

const useReplyItem = (mapId?: string, kakaoAddressId?: string) => {
    const { setMarkerReplies } = useMarkerRepliesState();

    const { mutate: mutateUpdateReply } = useMutation<unknown, unknown, UpdateReplyParam & UpdateReplyBody>(
        ({ replyId, message }) => updateReply({ replyId }, { message }),
        {
            onMutate: ({ replyId, message }) => {
                setMarkerReplies(replies => {
                    if (!replies) return;

                    return replies.map(reply => {
                        if (reply.id === replyId) {
                            return { ...reply, message };
                        }

                        return reply;
                    });
                });
            },
            onError: error => {
                // TODO: 실패시 롤백
                console.error(error);
            }
        }
    );

    const { mutate: mutateDeleteReply } = useMutation(deleteReply, {
        onMutate: ({ replyId }) => {
            getMarkersHelper.setQueryData(Number(mapId), markers => {
                if (!markers) return;

                return markers.map(marker => {
                    if (marker.kakaoAddressId === Number(kakaoAddressId)) {
                        return { ...marker, replyCount: marker.replyCount - 1 };
                    }
                    return marker;
                });
            });
            setMarkerReplies(replies => {
                if (!replies) return;

                return replies.filter(reply => reply.id !== replyId);
            });
        },
        onError: error => {
            // TODO: 실패시 롤백
            console.error(error);
        }
    });

    return { mutateUpdateReply, mutateDeleteReply };
};

export default useReplyItem;
