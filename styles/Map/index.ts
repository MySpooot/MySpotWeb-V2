import styled from '@emotion/styled';

// import Icon from 'src/components/Icon';

export const Container = styled.div`
    position: relative;
    display: flex;
    height: 100vh;
    flex-direction: column;
`;

export const MapContainer = styled.div`
    width: 100%;
    flex-grow: 1;
`;

export const Map = styled.div`
    width: 100%;
    height: 100%;
`;

// export const FavoriteIcon = styled(Icon)`
//     position: absolute;
//     z-index: 11;
//     top: 5rem;
//     left: 0.5rem;
//     width: 3rem;
//     height: 3rem;
//     cursor: pointer;
// `;

// export const ShareIcon = styled(Icon)`
//     position: absolute;
//     z-index: 11;
//     top: 8.25rem;
//     left: 0.5rem;
//     width: 3rem;
//     height: 3rem;
//     cursor: pointer;
// `;

export const OverlayContainer = styled.div`
    position: absolute;
    z-index: 999;
    bottom: 0;
    width: 100%;
    padding: 0 1rem;
`;
