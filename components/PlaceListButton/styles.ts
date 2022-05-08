import styled from '@emotion/styled';

import { Color } from '@/constants';

export const Container = styled.button<{ up: boolean }>`
    display: flex;
    width: 8.5rem;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 1.25rem;
    border: 1px solid ${Color.grey[200]};
    margin-bottom: ${({ up }) => (up ? '0.75rem' : '1.75rem')};
    background-color: ${Color.white};
    border-radius: 2.75rem;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
`;

export const ButtonText = styled.div`
    font-size: 1.125rem;
    font-weight: 400;
`;
