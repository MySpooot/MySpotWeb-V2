import styled from '@emotion/styled';

import { Color, ScrollbarStyle } from '@/constants';
// import Icon from '@/components/Icon';

export const Container = styled.div`
    position: absolute;
    z-index: 99;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.25);
`;

export const Wrapper = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 1.875rem 0;
    background-color: ${Color.white};
    border-radius: 0.75rem 0.75rem 0 0;
`;

export const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.25rem 1.5rem;
`;

export const Title = styled.div`
    display: flex;
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 1.375rem;
`;

export const Total = styled.div`
    color: ${Color.grey[500]};
`;

export const CloseIcon = styled.img`
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
`;

export const PlaceList = styled.ul`
    ${ScrollbarStyle}
    display: flex;
    overflow: auto;
    height: 20rem;
    flex-direction: column;
`;

export const NoPlace = styled.div`
    margin: 7.5rem 0;
    text-align: center;
`;
