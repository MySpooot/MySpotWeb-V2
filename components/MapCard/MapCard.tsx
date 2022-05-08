import { FC, useState, useCallback } from 'react';
import Image from 'next/image';
import { useMutation } from 'react-query';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Popup } from 'reactjs-popup';
import dayjs from 'dayjs';

import { Card, MapBtn, UpdateMap, CardText, VerticalDivider, SeeMore } from './styles';
import { Path } from '@/constants';
import { deleteMap, getPrivateCode, getMaps, getFavoriteMaps } from '@/api/map';
// import Icon from 'src/components/Icon';

import share from '@/assets/home/ic-share.svg';
import remove from '@/assets/home/ic-remove.svg';
import circles from '@/assets/map/ic_vertical_circle.png';

interface MapCardProps {
    map: { id: number; mapName: string; isPrivate: boolean; created?: number; mapId?: number };
    onClick: () => void;
}

const MapCard: FC<MapCardProps> = ({ map, onClick }) => {
    const [privateCode, setPrivateCode] = useState<string>();

    const { mutate } = useMutation(() => getPrivateCode({ mapId: map.id }), {
        onSuccess: response => {
            setPrivateCode(response.code);
        }
    });

    const onPopupClick = useCallback(() => {
        if (!map.isPrivate) return;

        mutate();
    }, [map, mutate]);

    const onCopyClick = useCallback(() => {
        if (map.isPrivate && !privateCode) return alert('프라이빗 코드 에러');
        else return alert('복사성공');
    }, [map, privateCode]);

    const onDeleteCardClick = useCallback(async (mapId: number, close: () => void) => {
        const deleteCheck = confirm('지도를 삭제하시겠습니까?');

        if (deleteCheck) {
            await deleteMap(mapId);
            alert('지도가 삭제되었습니다.');
            //getmap다시 호출
            close();
        }
    }, []);

    const dateFilter = useCallback(date => {
        return dayjs(date).format('YYYY.MM.DD');
    }, []);

    return (
        <Card>
            <CardText onClick={onClick}>
                <span className='map-title'>{map.mapName}</span>
                <span className='create-date'>{dateFilter(map.created)}</span>
            </CardText>
            <UpdateMap>
                <Popup
                    on='click'
                    position='bottom right'
                    trigger={<Image alt='더보기' className='vertical-circle' src={circles} />}
                    closeOnDocumentClick
                    onOpen={onPopupClick}
                >
                    {/* {close => (
                        <SeeMore>
                            <CopyToClipboard
                                text={`${window.location.origin}${Path.myMap}/${map.id}${map.isPrivate ? `?code=${privateCode}` : ''}`}
                                onCopy={onCopyClick}
                            >
                                <MapBtn>
                                    <Icon alt='공유' className='ic-share' src={share} />
                                    공유
                                </MapBtn>
                            </CopyToClipboard>
                            <VerticalDivider />
                            <MapBtn onClick={() => onDeleteCardClick(map.id, close)}>
                                <Icon alt='삭제' className='ic-remove' src={remove} />
                                삭제
                            </MapBtn>
                        </SeeMore>
                    )} */}
                </Popup>
            </UpdateMap>
        </Card>
    );
};

export default MapCard;
