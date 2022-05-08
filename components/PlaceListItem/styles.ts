import styled from '@emotion/styled';

import { Color } from '@/constants';
// import Icon from 'src/components/Icon';

export const Container = styled.li`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.25rem;
    border-bottom: 1px solid ${Color.grey[200]};
    cursor: pointer;

    &:hover {
        opacity: 0.7;
    }
`;

export const AddressName = styled.h3`
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 1.375rem;
`;

export const JibunAddress = styled.div`
    margin-top: 0.5rem;
    color: ${Color.grey[800]};
    font-size: 1rem;
`;

export const RoadAddressWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-top: 0.5rem;
`;

export const RoadAddressLabel = styled.div`
    flex-shrink: 0;
    padding: 0.125rem 0.25rem;
    border: 1px solid ${Color.grey[200]};
    margin-right: 0.25rem;
    border-radius: 0.25rem;
    color: ${Color.grey[400]};
    font-size: 0.75rem;
`;

export const RoadAddress = styled.div`
    color: ${Color.grey[600]};
    font-size: 0.875rem;
`;

export const CenterArea = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: center;
`;
export const BookmarkIcon = styled.img`
    width: 1.375rem;
    height: 1.75rem;
    margin-right: 1.25rem;
`;

export const DeleteButton = styled.button`
    flex-shrink: 0;
    align-self: flex-start;
    color: ${Color.grey[400]};
    font-size: 0.875rem;
    font-weight: 400;
`;

export const ButtonArea = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 0.5rem;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;

    :first-of-type {
        margin-right: 0.5rem;
    }
`;

export const PlaceActionIcon = styled.img`
    width: 1.75rem;
    height: 1.75rem;
`;

export const ActiveSpan = styled.span<{ active?: boolean }>`
    margin-left: 0.25rem;
    color: ${({ active }) => (active ? Color.blue : Color.grey[600])};
    font-size: 0.875rem;
`;
