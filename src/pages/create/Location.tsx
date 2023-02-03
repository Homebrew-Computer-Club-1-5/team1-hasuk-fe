import * as S from './Location.styled';
import InputTemplate from '../../components/molecules/InputTemplate';
import NoticeTextWrapper from '../../components/molecules/NoticeTextWrapper';
import WhitePill from '../../components/molecules/WhitePill';
import { useRecoilState } from 'recoil';
import {
  status,
  universityId,
  regionId,
  latitude,
  longitude,
  isEditingAtom,
} from './atoms';
import { useForm, useFormState } from 'react-hook-form';
import { useState } from 'react';
import Selectbox from '../../components/molecules/Selectbox';
import PillRadio from '../../components/molecules/PillRadio';
import AddressMaker from '../../components/molecules/AddressMaker';
import { useEffect } from 'react';
import { gql, useLazyQuery } from '@apollo/client';

const emptySpaceStyle = {
  width: '100%',
};
const NoticeTextWrapperStyle = {
  paddingTop: '0px',
  marginTop: '0px',
};

const FETCH_HOUSE_BY_LOCATION = gql`
  query ($longitude: Float!, $latitude: Float!) {
    fetchHouseByLocation(
      location: { latitude: $latitude, longitude: $longitude }
    ) {
      id
      longitude
      latitude
    }
  }
`;

function Location() {
  const [isEditing, setIsEditing] = useRecoilState(isEditingAtom);
  const [fetchHouseByLocation, { loading, error, data }] = useLazyQuery(
    FETCH_HOUSE_BY_LOCATION,
    {
      onCompleted(data) {
        if (data) alert('이미 존재하는 집입니다.');
      },
      onError(error) {
        setStat({ status: 2 });
      },
    },
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm();
  const [stat, setStat] = useRecoilState(status);
  const [univid, setUnivId] = useRecoilState(universityId);
  const [regionid, setRegionId] = useRecoilState(regionId);
  const [lat, setLat] = useRecoilState(latitude);
  const [long, setLong] = useRecoilState(longitude);
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
  useEffect(() => {
    setRegionId(radio ? radio : regionid);
    setUnivId(select ? select : univid);
    setLat(coords.latitude ? coords.latitude : lat);
    setLong(coords.longitude ? coords.longitude : long);
  }, [radio, select, coords]);

  return (
    <S.Wrapper>
      <div id="textPlace">
        <h1>{stat.status}/5</h1>
        <NoticeTextWrapper style={NoticeTextWrapperStyle} fontSize="25px">
          위치 정보를 입력해 주세요.
        </NoticeTextWrapper>
        <div id="selectWrapper">
          <p>대학</p>
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
        </div>
        {univid !== 0 ? (
          <div id="radioWrapper">
            <p>지역</p>

            <PillRadio
              def={regionid ? regionid : undefined}
              getRadioValue={getRadioValue}
              stuff={[
                {
                  text: '성신여대',
                  value: 1,
                },
                {
                  text: '안암역',
                  value: 2,
                },
                {
                  text: '제기동',
                  value: 3,
                },
                {
                  text: '고대정문',
                  value: 4,
                },
              ]}
            />
          </div>
        ) : null}

        <AddressMaker getCoordsValue={getCoordsValue} />
        <WhitePill
          text={'다음'}
          onClickNavigator={() => {
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
          }}
        />
      </div>
    </S.Wrapper>
  );
}
export default Location;
