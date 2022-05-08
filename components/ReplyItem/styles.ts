import styled from '@emotion/styled';

import { Color } from '@/constants';

export const Container = styled.li`
    padding: 1rem;
    border-bottom: 1px solid ${Color.grey[200]};

    &:last-child {
        border-bottom: none;
    }
`;

export const Top = styled.div`
    display: flex;
    align-items: center;
`;

export const Nickname = styled.div`
    color: ${Color.grey[800]};
    font-weight: 500;
    line-height: 2;
`;

export const Created = styled.div`
    margin-left: 0.625rem;
    color: ${Color.grey[500]};
    font-size: 0.625rem;
`;

export const Content = styled.p<{ hide: boolean }>`
    max-height: ${({ hide }) => (hide ? 'unset' : '7.5rem')};
    padding: 0.5rem 0;
    color: ${Color.grey[600]};
    font-size: 0.75rem;
    line-height: 1.5;
    overflow-y: hidden;
    word-break: break-all;
`;

export const TextArea = styled.textarea`
    width: 100%;
    padding: 1rem;
    background-color: ${Color.grey[100]};
`;

export const ButtonArea = styled.div`
    display: flex;
    margin-top: 0.625rem;
`;

export const OwnerButton = styled.button`
    padding: 0.25rem 0.5rem;
    border: 1px solid ${Color.grey[200]};
    border-radius: 0.25rem;
    color: ${Color.grey[500]};
    cursor: pointer;
    font-size: 0.75rem;

    &:last-child {
        margin-left: 0.375rem;
    }
`;

export const MoreTextLabel = styled.div`
    cursor: pointer;
    font-size: 0.75rem;
`;
