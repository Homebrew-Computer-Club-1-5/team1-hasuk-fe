import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import AddressMaker from '../../components/molecules/AddressMaker';
import NoticeTextWrapper from '../../components/molecules/NoticeTextWrapper';
import TitleWrapper2 from '../../components/molecules/TitleWrapper2';
import WhitePill from '../../components/molecules/WhitePill';
import { FETCH_HOUSE_BY_LOCATION } from '../../lib/gql';
import { Ilocation } from '../../lib/util/kakaoMap';
import useResetAllAtoms from '../../lib/util/resetAllAtoms';
import { isUppingAtom } from '../../store/atoms';
import * as S from './Up.styled';

function Up() {
  // states
  const [location, setLocation] = useState<Ilocation>({
    latitude: 0,
    longitude: 0,
  });
  const setIsUpping = useSetRecoilState(isUppingAtom);

  // hooks
  const resetAllAtoms = useResetAllAtoms();
  const navigate = useNavigate();
  const [fetchHouseByLocation, { loading, error, data }] = useLazyQuery(
    FETCH_HOUSE_BY_LOCATION,
    {
      fetchPolicy: 'no-cache',
      onCompleted(data) {
        console.log(data.fetchHouseByLocation);
        if (data) {
          setIsUpping((current) => true);
          navigate(`/house/${data.fetchHouseByLocation}`, {
            state: { upButton: true, editButton: true },
          });
        }
      },
      onError(error) {
        console.log(error.message);
        const result = window.confirm(
          '입력한 주소와 일치하는 집이 없습니다. 게시물을 등록하러 가시겠습니까?',
        );
        if (result) navigate('/create');
      },
    },
  );

  // useEffects
  useEffect(() => {
    resetAllAtoms();
  }, []);

  // event handlers
  const onClickBackButton = () => {
    navigate('/');
  };
  const getCoordsValue = (x: Ilocation) => {
    setLocation(x);
  };

  return (
    <S.Container>
      <S.Header>
        <TitleWrapper2 onClickBackButton={onClickBackButton} />
      </S.Header>
      <S.Main>
        <S.Section>
          <NoticeTextWrapper fontSize="27px">
            게시물을 "UP" 또는 수정 합니다.
          </NoticeTextWrapper>
          <p>
            * UP이란? : 게시글 목록에서
            <br /> 집을 제일 위로 끌어 올리는 기능을 말합니다.
          </p>
          <p>
            * 집을 수정할떄는, 다른 사람이 올린 <br />
            게시물이니 신중하게 생각해 주세요!
          </p>
        </S.Section>
        <AddressMaker
          getCoordsValue={getCoordsValue}
          style={{ marginTop: '70px' }}
          isTitleOff={true}
        ></AddressMaker>
        <WhitePill
          style={{ marginTop: '50px' }}
          text="집 찾기"
          onClick={() => {
            if (location.latitude === 0 && location.longitude === 0) {
              alert('주소를 입력해 주세요.');
            }
            fetchHouseByLocation({
              variables: {
                latitude: parseFloat(location.latitude as any),
                longitude: parseFloat(location.longitude as any),
              },
            });
          }}
        />
      </S.Main>
    </S.Container>
  );
}

export default Up;
