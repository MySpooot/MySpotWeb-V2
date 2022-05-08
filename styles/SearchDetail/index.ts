import styled from '@emotion/styled';

import { Color, Dimension } from '@/constants';

export const Container = styled.div`
    display: flex;
    height: 100vh;
    flex-direction: column;
`;

export const Footer = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    max-width: ${Dimension.MaxWidth};
    padding: 1.25rem 1rem;
`;

export const ButtonText = styled.span`
    color: ${Color.blue};
    font-size: 1.125rem;
`;
