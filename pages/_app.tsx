import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import styled from '@emotion/styled';
import Div100vh from '@rodmg/react-div-100vh';
import Image from 'next/image';
import { Global } from '@emotion/react';
import { QueryClientProvider } from 'react-query';

import { getMe } from '@/api/auth';
import { setAccessToken } from '@/api';
import { BreakPoint, Color, Dimension } from '@/constants';
import { globalStyle } from '@/styles/global';
import { useMeState } from '@/atoms';
import { queryClient } from '@/query';

import backgroundImage from '@/assets/background.jpg';

const MyApp = ({ Component, pageProps }: AppProps) => {
    console.log({ pageProps });
    const { setMe } = useMeState();
    useEffect(() => {
        // setMe(pageProps.me);
        setAccessToken(
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUwLCJ1c2VyTGV2ZWwiOjEsImlhdCI6MTY1MTc0ODcwOSwiZXhwIjoxNjU0MzQwNzA5fQ.lnMWPMGwaQrKSWJmIotkY5m-XE_TKsGJAwftR7AaMzg'
        );
        setMe({
            id: 50,
            nickname: '백인재',
            thumbnail: 'http://k.kakaocdn.net/dn/CKOTn/btrfEm77yMD/0yeOb5spzcu4Edr1c6bwHk/img_110x110.jpg'
        });
    }, []);

    return (
        <>
            <Global styles={globalStyle} />
            <Script
                src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_KEY}=services&autoload=false`}
                strategy='beforeInteractive'
            />

            <QueryClientProvider client={queryClient}>
                <AppContainer>
                    <Component {...pageProps} />
                </AppContainer>
            </QueryClientProvider>
            <BackgroundWrapper>
                {/* <Image src='/background.jpg' /> */}
                <Image src={backgroundImage} />
            </BackgroundWrapper>
        </>
    );
};

MyApp.getInitialProps = async (context: any) => {
    const token = context.ctx.req?.cookies.token;

    if (token) {
        setAccessToken(token);
        const me = await getMe();

        return { pageProps: { me } };
    }

    return {
        // redirect: {
        //     destination: '/login'
        // }
    };
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
