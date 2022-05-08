import { atom, useAtom } from 'jotai';

import { MapMarkerVO } from 'src/vo';

const mapPlaceOverlayState = atom<undefined | MapMarkerVO>(undefined);

export const useMapPlaceOverlayState = () => {
    const [mapPlaceOverlay, setMapPlaceOverlay] = useAtom(mapPlaceOverlayState);

    return { mapPlaceOverlay, setMapPlaceOverlay };
};
