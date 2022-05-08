import { useEffect, useRef } from 'react';

const useKeyPress = <Element extends HTMLElement>(key: string, callback: () => void, options?: { runOnlyFocusedElement?: boolean }) => {
    const keyPressRef = useRef<Element>(null);

    useEffect(() => {
        const keyPressCallback = (event: KeyboardEvent) => {
            if (event.code !== key) return;
            if (options?.runOnlyFocusedElement && keyPressRef.current !== document.activeElement) return;

            callback();
        };

        window.addEventListener('keydown', keyPressCallback);

        return () => window.removeEventListener('keydown', keyPressCallback);
    }, [key, callback, options]);

    return { keyPressRef };
};

export default useKeyPress;
