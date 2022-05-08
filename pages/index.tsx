import { useCallback } from 'react';
import type { NextPage, NextPageContext } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { getMaps, getFavoriteMaps, getRecentMaps } from '@/api/map';
import { Main, Top, User, Container, Header, Maps, NewBtn, RecentMap, MapArea, MapChip, EmptySpace, MapSpace, ContentSpace } from '@/styles/Home';
import { useMeState } from '@/atoms';
import { Path } from '@/constants';
import MapCard from '@/components/MapCard';

import mypage from '@/assets/home/ic_mypage.png';
import userImg from '@/assets/home/img_my@3x.png';
import skyarrow from '@/assets/home/ic_arrow_sky.png';
import greyarrow from '@/assets/home/ic_arrow_next.png';
import empty from '@/assets/home/img_empty.png';
import newbtn from '@/assets/home/btn_newmap.png';

const Home: NextPage<{ myMaps: any[]; favoriteMaps: any[]; recentMaps: any[] }> = ({ myMaps, favoriteMaps, recentMaps }) => {
    const { me } = useMeState();
    console.log({ me });

    const router = useRouter();

    const onMoreMapClick = useCallback((type: 'my' | 'favorite' | 'recent') => {}, []);

    const onGoMyPageClick = useCallback(() => {
        router.push('/mypage');
    }, []);

    const onRecentMapClick = useCallback(map => {
        router.push(`${Path.myMap}/${map.mapId}`);
    }, []);

    const onMapClick = useCallback((id: number) => {
        router.push(`${Path.myMap}/${id}`);
    }, []);

    if (!me) {
        return <></>;
    }

    return (
        <Container>
            <Main>
                <Top>
                    <Header onClick={() => router.push(`${Path.myMap}/235`)}>
                        <div className='myspot-title'>my spot</div>
                        <Image width='32' height='32' style={{ cursor: 'pointer' }} src={mypage} onClick={onGoMyPageClick} />
                    </Header>

                    <User>
                        <img width={46} height={46} className='user-img' src={me.thumbnail} />
                        {me.nickname}님 안녕하세요!
                    </User>

                    <RecentMap>
                        <div className='section-title'>
                            <div className='title'>최근 본 지도</div>
                            <div className='more-map'>
                                <span>더 보기</span>
                                <Image width={18} height={18} src={skyarrow} onClick={() => onMoreMapClick('recent')} />
                            </div>
                        </div>
                        <MapArea>
                            {/* {!props.recentMaps && !isRecentLoading && <div className='no-recent-map'>최근 본 지도가 없습니다.</div>}
                            {isRecentLoading && <Loading />} */}
                            {recentMaps?.map((map, idx) => (
                                <MapChip key={idx} onClick={() => onRecentMapClick(map)}>
                                    {map.mapName}
                                </MapChip>
                            ))}
                        </MapArea>
                    </RecentMap>
                </Top>
                {/* {isFavoriteLoading && isMapLoading && <Loading />} */}
                {myMaps?.length === 0 && favoriteMaps?.length === 0 ? (
                    <EmptySpace>
                        <div className='content'>
                            <Image src={empty} />
                            <div>
                                나만의 지도를 만들어 <br></br>장소를 저장하고, 공유해 보세요.
                            </div>
                        </div>
                    </EmptySpace>
                ) : (
                    <MapSpace>
                        {myMaps && myMaps.length !== 0 && (
                            <Maps>
                                <div className='title-area'>
                                    <span className='title'>내가 만든 map</span>
                                    <div className='see-more' onClick={() => onMoreMapClick('my')}>
                                        <span>더 보기</span>
                                        <Image width={27} height={30} src={greyarrow} />
                                    </div>
                                </div>
                                <div className='map-area'>
                                    {myMaps?.map((map, idx) => (
                                        <MapCard key={idx} map={map} onClick={() => onMapClick(map.id)} />
                                    ))}
                                </div>
                            </Maps>
                        )}
                        {favoriteMaps && favoriteMaps?.length !== 0 && (
                            <Maps>
                                <div className='title-area'>
                                    <span className='title'>즐겨찾는 map</span>
                                    <div className='see-more' onClick={() => onMoreMapClick('favorite')}>
                                        <span>더 보기</span>
                                        <Image src={greyarrow} />
                                    </div>
                                </div>
                                <div className='map-area'>
                                    {favoriteMaps?.map((map, idx) => (
                                        <MapCard key={idx} map={map} onClick={() => onMapClick(map.mapId)} />
                                    ))}
                                </div>
                            </Maps>
                        )}
                    </MapSpace>
                )}
                <NewBtn onClick={() => router.push(Path.newMap)}>
                    <Image src={newbtn} />
                </NewBtn>
            </Main>
        </Container>
    );
};

export const getServerSideProps = async () => {
    const [myMaps, favoriteMaps, recentMaps] = await Promise.all([getMaps(), getFavoriteMaps(), getRecentMaps()]);
    console.log([myMaps, favoriteMaps, recentMaps]);
    return { props: { myMaps, favoriteMaps, recentMaps } };
    // return { props: { myMaps: [], favoriteMaps: [], recentMaps: [] } };
};

export default Home;
