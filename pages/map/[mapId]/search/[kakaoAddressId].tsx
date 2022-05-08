import { useRouter } from 'next/router';

import { Container, Footer, ButtonText } from '@/styles/SearchDetail';
import { getMapDetailHelper } from '@/query';
import { Path } from '@/constants';
import KakaoPlaceIframe from '@/components/KakaoPlaceIframe';
import Button from '@/components/Button';

const Kakao = () => {
    const router = useRouter();
    const { mapId, kakaoAddressId } = router.query;
    // const { mapId } = useParams<{ mapId: string }>();
    // const { kakaoAddressId } = useParams<{ kakaoAddressId: string }>();

    const { data: mapDetail } = getMapDetailHelper.useQuery(Number(mapId));

    if (!kakaoAddressId) {
        return <></>;
    }

    // if (!mapDetail?.isOwner) {
    //     return <Navigate to={`${Path.myMap}/${mapId}`} />;
    // }

    return (
        <Container>
            <KakaoPlaceIframe addressId={kakaoAddressId as string} />
            <Footer>
                <Button rounded onClick={() => router.push(Path.home)}>
                    <ButtonText>뒤로가기</ButtonText>
                </Button>
            </Footer>
        </Container>
    );
};

export default Kakao;
