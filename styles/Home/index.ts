import styled from '@emotion/styled';

import { Color } from '@/constants';

export const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    flex-direction: column;
    justify-content: space-between;
`;

export const Main = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 100vh;
    flex-direction: column;
    background-color: ${Color.white};
    overflow-y: auto;

    .desc {
        padding-bottom: 3rem;
        margin-top: 0.75rem;
        color: rgb(127, 127, 127);
        font-size: 1rem;
    }
`;

export const Top = styled.div`
    max-height: 19.5rem;
    background-color: ${Color.blue};
    border-radius: 0 0 0 2.125rem;
`;

export const Header = styled.header`
    display: flex;
    height: 3.125rem;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 1.625rem;

    .myspot-title {
        color: ${Color.white};
        font-size: 1.5rem;
        font-weight: bold;
        line-height: 1.33;
    }

    /* .mypage-img {
        width: 2rem;
        height: 2rem;
        border-radius: 1.25rem;
        cursor: pointer;
    } */
`;

export const WelcomeSection = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding-top: 3rem;
    font-size: 2rem;
`;

export const User = styled.div`
    display: flex;
    height: 8rem;
    align-items: center;
    padding: 2.5rem 1.2rem;
    color: ${Color.white};
    font-size: 1.25rem;
    font-weight: 400;
    line-height: 1.625rem;

    .user-img {
        width: 2.875rem;
        height: 2.875rem;
        margin-right: 1.1rem;
        border-radius: 2.25rem;
    }
`;
export const RecentMap = styled.div`
    .section-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
        color: ${Color.white};
        line-height: 0.89;

        .title {
            font-size: 1.125rem;
            font-weight: 700;
            line-height: 1.25rem;
            text-align: left;
        }

        .more-map {
            display: flex;
            align-items: center;
            color: #aee2ff;
            cursor: pointer;
            font-size: 0.875rem;
            font-weight: 400;
            line-height: 1.625rem;
            text-align: right;
        }
    }
`;

export const MapArea = styled.div`
    display: flex;
    overflow: auto;
    flex-wrap: nowrap;
    margin: 0 1.25rem 1rem 1.25rem;
    white-space: nowrap;

    &::-webkit-scrollbar {
        display: none;
    }

    .no-recent-map {
        margin-bottom: 1.25rem;
        color: #88cbff;
    }
`;

export const MapChip = styled.div`
    display: flex;
    width: fit-content;
    align-items: center;
    padding: 0.75rem 0.875rem;
    margin-right: 0.375rem;
    margin-bottom: 0.375rem;
    background-color: #fff;
    border-radius: 1.125rem;
    color: #7f7f7f;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1rem;
    text-align: center;
`;

export const ContentSpace = styled.div`
    height: 100%;
`;

export const EmptySpace = styled.div`
    display: flex;

    .content {
        display: flex;
        width: 100%;
        height: fit-content;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 4.375rem;

        img {
            height: 10.3rem;
            margin-bottom: 2.125rem;
        }

        div {
            color: ${Color.grey[300]};
            font-size: 1.125rem;
            line-height: 1.375rem;
            text-align: center;
        }
    }
`;

export const MapSpace = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Maps = styled.div`
    margin-top: 2.25rem;
    margin-right: 1rem;
    margin-left: 1rem;

    .title-area {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1.25rem;

        .title {
            color: #000;
            font-size: 1.125rem;
            font-weight: bold;
            line-height: 0.89;
        }

        .see-more {
            display: flex;
            align-items: center;
            color: ${Color.grey[500]};
            cursor: pointer;
            font-size: 0.875rem;
            line-height: 1.14;

            img {
                width: 1.125rem;
                height: 1.25rem;
            }
        }
    }

    .map-area {
        display: flex;
        flex-direction: column;
    }
`;

export const NewBtn = styled.div`
    img {
        position: fixed;
        z-index: 10;
        right: 0.7rem;
        bottom: 1rem;
        width: 5.25rem;
        height: 5.25rem;
    }
`;
