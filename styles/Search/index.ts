import styled from '@emotion/styled';

import { ScrollbarStyle } from '@/constants';
// import Icon from 'src/components/Icon';

export const Container = styled.div`
    display: flex;
    overflow: auto;
    flex-direction: column;
    flex-grow: 1;
`;

export const Main = styled.ul`
    ${ScrollbarStyle}
    flex-grow: 1;
    margin-top: 1.875rem;
    overflow-y: auto;
`;

// export const HeaderIcon = styled(Icon)`
//     width: 1.5rem;
//     height: 1.5rem;
//     cursor: pointer;
// `;
