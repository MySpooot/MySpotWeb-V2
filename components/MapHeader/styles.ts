import styled from '@emotion/styled';

import { Color } from '@/constants';
// import Icon from 'src/components/Icon';

// export const HeaderIcon = styled(Icon)`
//     width: 2.125rem;
//     height: 2.125rem;
//     cursor: pointer;
// `;

export const Title = styled.h1`
    font-size: 1.25rem;
    font-weight: 400;
`;

export const RightArea = styled.div`
    display: flex;
    align-items: center;
`;

export const Tooltip = styled.div`
    position: absolute;
    z-index: 11;
    top: 0;
    display: flex;
    width: 14rem;
    flex-direction: column;
    padding: 1rem 0.75rem;
    background-color: ${Color.blue};
    border-radius: 0.25rem;
    color: ${Color.white};
    transform: translate(-77.5%, 60%);

    :before {
        position: absolute;
        top: -0.5rem;
        right: 1.5rem;
        border-top: 0x solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid ${Color.blue};
        border-left: 10px solid transparent;
        content: '';
    }

    h3 {
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
    }
`;

export const TooltipDescription = styled.div`
    margin-top: 0.5rem;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1.3;
`;

export const TooltipButton = styled.button`
    width: fit-content;
    align-self: flex-end;
    padding: 0.25rem 0.875rem;
    margin-top: 0.5rem;
    background-color: ${Color.white};
    border-radius: 0.125rem;
    color: ${Color.blue};
    font-size: 0.75rem;
    line-height: 1.3;
`;
