import { FC } from 'react';
import Image from 'next/image';

import { Container, ButtonText } from './styles';

import icList from '@/assets/map/ic_list.png';

type PlaceListButtonProps = {
    up: boolean;
    onClick: () => void;
};

const PlaceListButton: FC<PlaceListButtonProps> = ({ up, onClick }) => (
    <Container up={up} onClick={onClick}>
        <Image src={icList} width={22} height={22} />
        <ButtonText>장소목록</ButtonText>
    </Container>
);

export default PlaceListButton;
