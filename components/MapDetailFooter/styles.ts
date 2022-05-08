import styled from '@emotion/styled';

import { Color, Dimension } from '@/constants';
// import Icon from 'src/components/Icon';

export const Container = styled.footer`
    position: fixed;
    bottom: 0;
    display: flex;
    width: 100%;
    max-width: ${Dimension.MaxWidth};
    box-sizing: border-box;
    flex-direction: column;
`;

export const Top = styled.div`
    position: absolute;
    top: 0.75rem;
    right: 1.25rem;
    display: flex;
    width: 8.0625rem;
    height: 2.75rem;
    justify-content: space-between;
    padding: 0.625rem 1.5rem;
    border: 1px solid ${Color.grey[300]};
    border-bottom: 1px solid ${Color.grey[200]};
    background-color: ${Color.white};
    border-radius: 2.25rem;
    transform: translateY(-100%);
`;

export const LikeArea = styled.div<{ on: boolean }>`
    display: flex;
    align-items: center;
    cursor: pointer;

    .count {
        margin-left: 0.375rem;
        color: ${({ on }) => (on ? Color.blue : Color.grey[600])};
        font-size: 0.875rem;
    }
`;

// export const LikeIcon = styled(Icon)`
//     width: 1.25rem;
//     height: 1.25rem;
// `;

// export const BookmarkIcon = styled(Icon)`
//     width: 1.25rem;
//     height: 1.25rem;
//     cursor: pointer;
// `;

export const Bottom = styled.div`
    display: flex;
    padding: 1.25rem 1rem;
`;

// export const BackIcon = styled(Icon)`
//     width: 2.375rem;
//     height: 2.375rem;
// `;

export const ButtonText = styled.span`
    color: ${Color.blue};
    font-size: 1.125rem;
`;
