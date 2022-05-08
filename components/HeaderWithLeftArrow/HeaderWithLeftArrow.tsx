import React, { FC, CSSProperties, PropsWithChildren } from 'react';
import Image from 'next/image';

import { Container } from './styles';

import icArrowLeft from '@/assets/map/ic_arrow_left.svg';
// import ArrowLeft from '@/assets/map/ic_arrow_left.svg';

type HeaderWithLeftArrowProps = {
    onLeftArrowClick: () => void;
    style?: CSSProperties;
};

const HeaderWithLeftArrow: FC<PropsWithChildren<HeaderWithLeftArrowProps>> = ({ children, style, onLeftArrowClick }) => (
    <Container style={style}>
        <Image alt='arrowLeft' src={icArrowLeft} style={{ cursor: 'pointer', width: '2.125rem', height: '2.125rem' }} onClick={onLeftArrowClick} />
        {/* <ArrowLeft /> */}
        {children}
    </Container>
);

export default HeaderWithLeftArrow;
