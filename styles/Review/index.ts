import styled from '@emotion/styled';
import Div100vh from '@rodmg/react-div-100vh';

import { Color, ScrollbarStyle } from '@/constants';

export const Container = styled(Div100vh)`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

export const Main = styled.main`
    ${ScrollbarStyle}
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
`;

export const Info = styled.article`
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
    margin-top: 1.75rem;
`;

export const PlaceName = styled.h3`
    font-size: 1.25rem;
    font-weight: bold;
    line-height: 1.6;
`;

export const Address = styled.div`
    margin-top: 0.25rem;
    color: ${Color.grey[600]};
    font-size: 0.875rem;
`;

export const RoadAddressArea = styled.div`
    display: flex;
    align-items: center;
    margin-top: 0.25rem;
`;

export const AddressLabel = styled.div`
    padding: 0.25rem;
    border: 1px solid ${Color.grey[200]};
    margin-right: 0.25rem;
    border-radius: 0.25rem;
    color: ${Color.grey[400]};
    font-size: 0.625rem;
`;

export const RoadAddress = styled.div`
    color: ${Color.grey[600]};
    font-size: 0.75rem;
`;

export const TextAreaWrapper = styled.div`
    border: 1px solid ${Color.grey[300]};
    margin-top: 1.75rem;
    border-radius: 0.25rem;
`;

export const TextArea = styled.textarea`
    width: 100%;
    padding: 1rem 0.75rem 0;
    border-radius: 0.25rem;

    :disabled {
        opacity: 0.5;
    }
`;

export const CommentCounter = styled.div<{ error: boolean }>`
    margin-right: 0.25rem;
    margin-bottom: 0.25rem;
    color: ${({ error }) => (error ? Color.red : 'unset')};
    font-size: 0.625rem;
    letter-spacing: 0.5px;
    text-align: end;
`;

export const Line = styled.hr`
    width: 100%;
    height: 0.375rem;
    border: none;
    margin-top: 1.75rem;
    margin-bottom: 1.25rem;
    background-color: ${Color.grey[100]};
`;

export const ReviewArea = styled.article`
    display: flex;
    flex-direction: column;
`;

export const Top = styled.div`
    display: flex;
    align-items: center;
    padding: 0 1rem;
    margin-bottom: 0.875rem;
`;

export const ReviewTitle = styled.h3`
    font-weight: bold;
`;

export const ReviewCount = styled.div`
    margin-left: 0.375rem;
    color: ${Color.blue};
    font-size: 0.875rem;
`;

export const ReviewList = styled.ul``;

export const NoReview = styled.div`
    padding: 2.5rem;
    text-align: center;
`;
