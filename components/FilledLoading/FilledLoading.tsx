import React, { FC } from 'react';

import { Container } from './styles';
import Loading from '@/components/Loading';

const FilledLoading: FC = () => (
    <Container>
        <Loading />
    </Container>
);

export default FilledLoading;
