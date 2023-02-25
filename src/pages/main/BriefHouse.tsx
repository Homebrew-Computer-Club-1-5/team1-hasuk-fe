import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  FETCH_HOUSE_BY_MARKER,
  FETCH_HOUSE_BY_MARKER_LOGINED,
} from '../../lib/gql';
import * as S from './BreifHouse.styled';
import { IhouseData_fetchHouseByMarker } from '../../store/atoms';
import WhitePill from '../../components/molecules/WhitePill';
import { useNavigate } from 'react-router-dom';

import Zzim from '../../components/molecules/Zzim';
import { cli } from 'webpack-dev-server';

interface IBriefHouse {
  house_id: number;
  counter?: number;
}
function BriefHouse({ counter, house_id }: IBriefHouse) {
  const [toggle, setToggle] = useState<boolean>(true);
  const [clickedHouse, setClickedHouse] =
    useState<IhouseData_fetchHouseByMarker>();
  const navigate = useNavigate();

  const loggedIn = localStorage.getItem('accessToken');
  const { loading, error, data } = useQuery(
    loggedIn ? FETCH_HOUSE_BY_MARKER_LOGINED : FETCH_HOUSE_BY_MARKER,
    {
      fetchPolicy: 'no-cache',
      variables: {
        house_id: parseFloat(house_id as any),
      },
      onCompleted: (data) => {
        setClickedHouse((current) =>
          data ? (loggedIn ? data.fetchHouseLogined : data.fetchHouse) : null,
        );
      },
      onError: (error) => {
        console.log(error, '아니야');
      },
    },
  );

  useEffect(() => {
    setToggle(true);
  }, [counter]);

  return (
    <S.Container>
      {house_id !== 0 && toggle === true ? (
        <S.Wrapper onClick={() => navigate(`/house/${house_id}`)}>
          <S.XButton
            onClick={(event) => {
              setToggle(false);
              event?.stopPropagation();
            }}
          />
          <Zzim
            house_id={house_id}
            style={{ left: 380, bottom: 80 }}
            is_checked={clickedHouse?.is_wished ? clickedHouse.is_wished : 0}
          />
          <S.ImgWrapper
            style={{
              backgroundImage: `url(${clickedHouse?.imgs[0].img_url})`,
            }}
          ></S.ImgWrapper>
          <S.InfoWrapper>
            <p>유형: {`${clickedHouse?.house_category.name}`}</p>
            <p>전화번호: {`${clickedHouse?.contact_number}`}</p>
            <br></br>
            <p>
              {`${
                clickedHouse?.house_cost?.month_cost
                  ? clickedHouse?.house_cost?.month_cost
                  : '전화문의'
              }`}
              /월
            </p>
          </S.InfoWrapper>
        </S.Wrapper>
      ) : null}
    </S.Container>
  );
}
export default BriefHouse;
