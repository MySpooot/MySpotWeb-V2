import styled from '@emotion/styled';

import { Color } from '@/constants';

export const Container = styled.li`
    display: flex;
    align-items: center;
    padding: 1.25rem 1rem;
    border-bottom: 1px solid ${Color.grey[100]};
    cursor: pointer;
`;

export const Info = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

export const PlaceName = styled.h3`
    font-weight: 500;
`;

export const Address = styled.div`
    margin-top: 0.25rem;
    color: ${Color.grey[600]};
    font-size: 0.75rem;
`;

export const RoadAddress = styled.div`
    display: flex;
    align-items: center;
    margin-top: 0.25rem;
    font-size: 0.75rem;

    .label {
        padding: 0.125rem;
        border: 1px solid ${Color.grey[200]};
        margin-right: 0.25rem;
        border-radius: 0.25rem;
        color: ${Color.grey[400]};
    }
`;

export const AddButton = styled.button`
    padding: 0.5rem 0.75rem;
    background-color: ${Color.grey[100]};
    border-radius: 0.25rem;
    color: ${Color.grey[600]};
    font-size: 0.875rem;

    :hover {
        opacity: 0.7;
    }
`;
