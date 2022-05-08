import { atom, useAtom } from 'jotai';

const mapAccessibleState = atom<boolean>(false);

export const useMapAccessible = () => {
    const [mapAccessible, setMapAccessible] = useAtom(mapAccessibleState);

    return { mapAccessible, setMapAccessible };
};
