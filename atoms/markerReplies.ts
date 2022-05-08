import { atom, useAtom } from 'jotai';

import { MarkerReplyVO } from 'src/vo';

const markerRepliesState = atom<MarkerReplyVO[] | undefined>(undefined);

export const useMarkerRepliesState = () => {
    const [markerReplies, setMarkerReplies] = useAtom(markerRepliesState);

    return { markerReplies, setMarkerReplies };
};
