import { atom, useAtom } from 'jotai';

interface Me {
    id: number;
    nickname: string;
    thumbnail?: string;
}

const meState = atom<Me | undefined>(undefined);

export const useMeState = () => {
    const [me, setMe] = useAtom(meState);

    return { me, setMe };
};
