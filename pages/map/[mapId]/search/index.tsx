import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useMutation } from 'react-query';

import { Container, Main } from '@/styles/Search';
import { Path } from '@/constants';
import HeaderWithLeftArrow from '@/components/HeaderWithLeftArrow';
import FilledLoading from '@/components/FilledLoading';
import Input from '@/components/Input';
import { createMarker, CreateMarkerBody, CreateMarkerParam, CreateMarkerResponse } from '@/api';
import { getMapDetailHelper, getMarkersHelper } from '@/query';
import useSearchPlace from '@/hooks/useSearchPlace';
import SearchItem from '@/components/SearchItem';

import icSearch from 'src/assets/map/ic_search.svg';

const Search = () => {
    const router = useRouter();
    const { mapId, k } = router.query;

    console.log(router.query);
    const [keyword, setKeyword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { data: mapDetail } = getMapDetailHelper.useQuery(Number(mapId));

    const { places, searchPlaces } = useSearchPlace();

    useEffect(() => {
        if (window.Kakao?.Auth) return;

        const script = document.createElement('script');
        script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
        script.type = 'text/javascript';
        script.defer = true;
        script.onload = () => {
            if (window.Kakao && !window.Kakao.isInitialized()) {
                window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_KEY);
            }
        };

        document.body.appendChild(script);
    }, []);

    useEffect(() => {
        if (!k) return;

        searchPlaces(k as string);
    }, [k]); // eslint-disable-line react-hooks/exhaustive-deps

    const onSearchClick = useCallback(() => {
        // searchPlaces(keyword);
        router.push(`${Path.myMap}/${mapId}${Path.search}?k=${keyword}`);
    }, [keyword, mapId]);

    const { mutate: fetchCreateMarker } = useMutation<CreateMarkerResponse, unknown, CreateMarkerParam & CreateMarkerBody>(
        ({ mapId, ...body }) => createMarker({ mapId }, body),
        {
            onMutate: () => setIsLoading(true),
            onSuccess: response => {
                alert('추가되었습니다.');

                getMarkersHelper.setQueryData(Number(mapId), markers => {
                    if (!markers) return;

                    return [
                        ...markers,
                        {
                            ...response,
                            name: response.locationName,
                            kakaoAddressId: response.addressId,
                            longitude: Number(response.longitude),
                            latitude: Number(response.latitude),
                            isLike: false,
                            isMyLocation: false,
                            likeCount: 0,
                            replyCount: 0
                        }
                    ];
                });

                router.push(`${Path.myMap}/${mapId}`);
            },
            onSettled: () => setIsLoading(false)
        }
    );

    return (
        <Container>
            <HeaderWithLeftArrow style={{ flexShrink: 0 }} onLeftArrowClick={() => router.push(`${Path.myMap}/${mapId}`)} />
            <Input
                placeholder='검색하실 장소를 입력해 주세요'
                style={{ margin: '0 1.25rem', width: 'calc(100% - 2.5rem)', flexShrink: 0 }}
                value={keyword}
                autoFocus
                onChange={event => setKeyword(event.target.value)}
                onEnterPress={onSearchClick}
            >
                <Image src={icSearch} onClick={onSearchClick} />
            </Input>
            <Main>
                {places?.map((place, index) => (
                    <SearchItem key={index} activeAddButton={!!mapDetail?.isOwner} place={place} onCreateMarker={fetchCreateMarker} />
                ))}
            </Main>
            {isLoading && <FilledLoading />}
        </Container>
    );
};

export default Search;
