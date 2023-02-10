import * as S from './Location.styled';
import NoticeTextWrapper from '../../components/molecules/NoticeTextWrapper';
import WhitePill from '../../components/molecules/WhitePill';
import { useRecoilState } from 'recoil';
import {
  statusAtom,
  universityIdAtom,
  regionIdAtom,
  latitudeAtom,
  longitudeAtom,
  isEditingAtom,
} from '../../store/atoms';
import { useState } from 'react';
import Selectbox from '../../components/molecules/Selectbox';
import PillRadio from '../../components/molecules/PillRadio';
import AddressMaker from '../../components/molecules/AddressMaker';
import { useEffect } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { FETCH_HOUSE_BY_LOCATION } from '../../lib/gql';

const NoticeTextWrapperStyle = {
  paddingTop: '0px',
  marginTop: '0px',
};

function Location() {
  const [isEditing, setIsEditing] = useRecoilState(isEditingAtom);
  const [fetchHouseByLocation, { loading, error, data }] = useLazyQuery(
    FETCH_HOUSE_BY_LOCATION,
    {
      fetchPolicy: 'no-cache',
      onCompleted(data) {
        if (data) alert('이미 존재하는 집입니다.');
      },
      onError(error) {
        setStat({ status: 2 });
      },
    },
  );

  const [stat, setStat] = useRecoilState(statusAtom);
  const [univid, setUnivId] = useRecoilState(universityIdAtom);
  const [regionid, setRegionId] = useRecoilState(regionIdAtom);
  const [lat, setLat] = useRecoilState(latitudeAtom);
  const [long, setLong] = useRecoilState(longitudeAtom);
  const [radio, setRadio] = useState();
  const [select, setSelect] = useState();
  const [coords, setCoords] = useState({ latitude: 0, longitude: 0 });
  const getRadioValue = (x: any) => {
    setRadio(x);
  };
  const getSelectValue = (x: any) => {
    setSelect(x);
  };
  const getCoordsValue = (x: any) => {
    setCoords(x);
  };

  function whitePillEventListener() {
    if (univid !== 0 && regionid !== 0 && lat !== 0 && long !== 0) {
    } else {
      alert('정보를 모두 입력해주세요');
      return;
    }
    if (!isEditing) {
      fetchHouseByLocation({
        variables: {
          latitude: parseFloat(lat as any),
          longitude: parseFloat(long as any),
        },
      });
    } else {
      setStat({ status: 2 });
    }
  }
  useEffect(() => {
    setRegionId(radio ? radio : regionid);
    setUnivId(select ? select : univid);
    setLat(coords.latitude ? coords.latitude : lat);
    setLong(coords.longitude ? coords.longitude : long);
  }, [radio, select, coords]);

  return (
    <S.Container>
      <S.NumberH1>{stat.status}/5</S.NumberH1>
      <NoticeTextWrapper style={NoticeTextWrapperStyle} fontSize="25px">
        위치 정보를 입력해 주세요.
      </NoticeTextWrapper>
      <S.SelectBoxWrapper>
        <S.TitleP>대학</S.TitleP>
        <Selectbox
          getSelectValue={getSelectValue}
          stuff={[
            { text: '선택하세요', value: 0, defaultValue: true },
            {
              text: '고려대',
              value: 1,
              defaultValue: Number(univid) === 1 ? true : false,
            },
          ]}
        />
      </S.SelectBoxWrapper>

      {univid !== 0 ? (
        <S.RadioWrapper>
          <S.TitleP>지역</S.TitleP>

          <PillRadio
            def={regionid ? regionid : undefined}
            getRadioValue={getRadioValue}
            stuff={[
              {
                text: '성신여대',
                value: 1,
              },
              {
                text: '보문동',
                value: 2,
              },
              {
                text: '안암역',
                value: 3,
              },
              {
                text: '제기동',
                value: 4,
              },
              {
                text: '고대정문',
                value: 5,
              },
              {
                text: '법대후문',
                value: 6,
              },
            ]}
          />
        </S.RadioWrapper>
      ) : null}

      <AddressMaker getCoordsValue={getCoordsValue} />
      <WhitePill
        text={'다음'}
        onClickNavigator={() => {
          whitePillEventListener();
        }}
      />
    </S.Container>

  );
}
export default Location;
