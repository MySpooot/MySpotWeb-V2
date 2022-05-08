import { makeQueryHelper } from 'react-query-helper';

import { getMe, logIn, setAccessToken } from '@/api';
import { queryClient } from '@/query';

/**
 * @deprecated
 */
export const getMeHelper = makeQueryHelper({
    baseQueryKey: ['getMe'],
    queryClient,
    queryFn: () => () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        setAccessToken(token);
        return getMe();
    }
});

export const logInHelper = makeQueryHelper({
    baseQueryKey: ['logIn'],
    queryClient,
    queryFn: () => (code: string) => logIn({ code })
});
