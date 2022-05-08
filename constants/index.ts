export const BreakPoint = {
    PC: '@media (min-width: 768px)', // PC, Tablet
    Phone: '@media (max-width: 768px)',
    BelowThanTablet: '@media (max-width: 1000px)',
    GreaterThanTablet: '@media (min-width: 1000px)'
} as const;

export const Dimension = {
    MaxWidth: '450px'
    // Phone: '378px'
} as const;

export const Path = {
    home: '/',
    login: '/login',
    join: '/join',
    myMap: '/map',
    search: '/search',
    authKakao: '/auth/kakao',
    myPage: '/mypage',
    mapList: '/maplist',
    newMap: '/newmap'
} as const;

/**
 * @deprecated
 */
export const Palette = {
    White: '#ffffff',
    Black: '#000000',
    Grey: {
        '50': '#fafafa',
        '100': '#f5f5f5',
        '200': '#eeeeee',
        '300': '#e0e0e0',
        '400': '#bdbdbd',
        '500': '#9e9e9e',
        '600': '#757575',
        '700': '#616161',
        '800': '#424242',
        '900': '#212121'
    },
    Blue: {
        '50': '#e3f2fd',
        '100': '#bbdefb',
        '200': '#90caf9',
        '300': '#64b5f6',
        '400': '#42a5f5',
        '500': '#2196f3',
        '600': '#1e88e5',
        '700': '#1976d2',
        '800': '#1565c0',
        '900': '#0d47a1',
        a100: '#82b1ff',
        a200: '#448aff',
        a400: '#2979ff',
        a700: '#2962ff'
    }
};

export const Color = {
    white: '#ffffff',
    black: '#000000',
    blue: '#008fff',
    red: '#ff7854',
    grey: {
        '100': '#f5f5f5',
        '200': '#e8e8e8',
        '300': '#d3d3d3',
        '400': '#bebebe',
        '500': '#9e9e9e',
        '600': '#7f7f7f',
        '700': '#666666',
        '800': '#333333'
    }
} as const;

export const ScrollbarStyle = ` 
    /* 스크롤바 전체 */
    ::-webkit-scrollbar {
        width: 0.25rem;
        background-color: ${Color.grey[500]};
    }

    /* 스크롤 막대 */
    ::-webkit-scrollbar-thumb {
        background-color: ${Color.grey[600]};
    }

    /* 스크롤 막대 외부 */
    ::-webkit-scrollbar-track {
        background-color: ${Color.grey[300]};
    }
`;
