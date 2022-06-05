import { HTMLAttributes } from 'react';
import styled from '@emotion/styled';

interface IconProps extends HTMLAttributes<HTMLImageElement> {
    src?: File | string;
}

const Icon = styled.img<IconProps>`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

export default Icon;
