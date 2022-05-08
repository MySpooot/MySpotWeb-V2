import { FC, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

import { Title, RightArea, Tooltip, TooltipDescription, TooltipButton } from './styles';
import { Path } from '@/constants';
import { getMapDetailHelper, getMarkersHelper } from '@/query';
import HeaderWithLeftArrow from '@/components/HeaderWithLeftArrow';

import icSearch from '@/assets/map/ic_search.svg';
// import SearchIcon from '@/assets/map/ic_search.svg';

const MapHeader: FC = () => {
    // const navigate = useNavigate();
    const router = useRouter();
    const { mapId } = router.query;
    // const { mapId } = useParams<{ mapId: string }>();

    const { data: mapDetail } = getMapDetailHelper.useQuery(Number(mapId));
    const { data: markers } = getMarkersHelper.useQuery(Number(mapId));
    const [openToolTip, setOpenToolTip] = useState(true);

    if (!mapDetail || !markers) {
        return <></>;
    }

    return (
        <HeaderWithLeftArrow style={{ justifyContent: 'space-between' }} onLeftArrowClick={() => router.push(Path.home)}>
            <Title>{mapDetail.name}</Title>

            {mapDetail.isOwner ? (
                <RightArea>
                    <Link href={`${Path.myMap}/${mapId}${Path.search}`}>
                        <Image width={34} height={34} alt='search' src={icSearch} />
                    </Link>

                    {markers.length === 0 && openToolTip && (
                        <Tooltip>
                            <h3>이용 Tip</h3>
                            <TooltipDescription>
                                저장되어 있는 장소가 없어요!
                                <br />
                                검색으로 나만의 장소를 추가해 보세요.
                            </TooltipDescription>

                            <TooltipButton onClick={() => setOpenToolTip(false)}>확인</TooltipButton>
                        </Tooltip>
                    )}
                </RightArea>
            ) : (
                <div />
            )}
        </HeaderWithLeftArrow>
    );
};

export default MapHeader;
