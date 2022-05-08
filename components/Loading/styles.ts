import styled from '@emotion/styled';

import { Color } from '@/constants';

export const Container = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
`;

export const Spinner = styled.div`
    position: relative;
    width: 50px;
    height: 50px;
    border: 5px solid ${Color.blue};
    border-bottom: 5px solid ${Color.grey[300]};
    animation: spin 1s linear infinite;
    border-radius: 50%;

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
    }
`;
