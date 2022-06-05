import { useEffect, useRef, Suspense } from 'react';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import styled from '@emotion/styled';
import Div100vh from '@rodmg/react-div-100vh';
import Image from 'next/image';
import { Global } from '@emotion/react';
import { QueryClientProvider, Hydrate, dehydrate, QueryClient } from 'react-query';

import { getMe } from '@/api/auth';
import { setAccessToken } from '@/api';
import { BreakPoint, Color, Dimension } from '@/constants';
import { globalStyle } from '@/styles/global';
import { useMeState } from '@/atoms';
import { queryClient } from '@/query';

// import backgroundImage from '@/assets/background.jpg';

const MyApp = ({ Component, pageProps }: AppProps) => {
    // const dehydratedState = dehydrate(queryClient);
    const queryClientRef = useRef<QueryClient>();
    if (!queryClientRef.current) {
        queryClientRef.current = queryClient;
    }

    return (
        <>
            <Global styles={globalStyle} />
            <Script
                src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_KEY}&libraries=services&autoload=false`}
                strategy='beforeInteractive'
            />

            <QueryClientProvider client={queryClientRef.current}>
                <Hydrate state={pageProps.dehydratedState}>
                    <AppContainer>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Component {...pageProps} />
                        </Suspense>
                    </AppContainer>
                </Hydrate>
            </QueryClientProvider>
            <BackgroundWrapper>
                {/* <Image src='/background.jpg' /> */}
                {/* <Image src={backgroundImage} /> */}
            </BackgroundWrapper>
        </>
    );
};

const AppContainer = styled(Div100vh)`
    position: relative;
    display: flex;
    width: 100%;
    max-width: ${Dimension.MaxWidth};
    flex-direction: column;
    margin: auto;
    background-color: ${Color.white};
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);

    ${BreakPoint.GreaterThanTablet} {
        transform: translateX(50%);
    }
`;

const BackgroundWrapper = styled.div`
    display: flex;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export default MyApp;
