import styled from '@emotion/styled';

import { Color } from '@/constants';

export const Card = styled.div`
    display: flex;
    height: 3.75rem;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem;
    border: solid 0.0625rem ${Color.grey[200]};
    margin-bottom: 0.625rem;
    border-radius: 0.625rem;
`;

export const CardText = styled.div`
    display: flex;
    width: 100%;
    height: 4rem;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;

    .map-title {
        color: ${Color.grey[800]};
        font-size: 0.875rem;
        line-height: 1.14;
    }

    .create-date {
        margin: 0.125rem;
        color: #a4a4a4;
        font-size: 0.6875rem;
        line-height: 1.27;
    }
`;

export const UpdateMap = styled.div`
    position: relative;
    display: block;

    .vertical-circle {
        width: 1.375rem;
        height: 1.375rem;
        cursor: pointer;
    }
`;

export const SeeMore = styled.div`
    display: flex;
    width: 11.25rem;
    height: 3rem;
    align-items: center;
    background-color: #fff;
    border-radius: 0.25rem;
    box-shadow: 0 1px 5px 0 #d3d3d3;
    cursor: pointer;
`;
export const MapBtn = styled.div`
    display: flex;
    width: 50%;
    height: fit-content;
    align-items: center;
    justify-content: center;
    color: #000;
    cursor: pointer;
    font-size: 1rem;
    letter-spacing: 0.006875rem;
    line-height: 1;

    img {
        margin-right: 0.625rem;

        &.ic-share {
            width: 0.625rem;
            height: 1rem;
        }

        &.ic-remove {
            width: 1rem;
            height: 1.25rem;
        }
    }
`;

export const VerticalDivider = styled.div`
    width: 0.0625rem;
    height: 1.25rem;
    background-color: ${Color.grey[200]};
`;
