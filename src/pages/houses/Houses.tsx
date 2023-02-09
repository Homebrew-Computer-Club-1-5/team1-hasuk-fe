import TitleWrapper from '../../components/molecules/TitleWrapper';
import * as S from './Houses.styled';
import HouseWrapper from './HouseWrapper';
import { useQuery } from '@apollo/client';
import { useRecoilState } from 'recoil';
import { houseDatasAtom } from '../../store/atoms';
import { useNavigate, useParams } from 'react-router-dom';
import useResetAllAtoms from '../../lib/util/resetAllAtoms';
import { useEffect } from 'react';
import ExtraHousesButton from '../../components/molecules/ExtraHousesButton';
import Loading from '../../components/molecules/Loading';
import { FETCH_HOUSES_BY_REGION } from '../../lib/gql';
import FilterWrapper from './FilterWrapper';

function Houses() {
  const resetAllAtoms = useResetAllAtoms();
  useEffect(() => {
    resetAllAtoms();
  }, []);

  const navigate = useNavigate();
  const [houseDatas, setHouseDatas] = useRecoilState(houseDatasAtom);
  const { region_id } = useParams();

  const { loading, error, data } = useQuery(FETCH_HOUSES_BY_REGION, {
    fetchPolicy: 'no-cache',
    variables: {
      region_id: parseFloat(region_id as string),
    },
    onCompleted: (data) => {
      setHouseDatas((current) => data.fetchHousesByRegion);
    },
  });

  return (
    <S.Container>
      {loading ? <Loading /> : null}
      <S.Header>
        <TitleWrapper
          navigateRoute={'/main'}
          isTitleOn={true}
          isBackButtonColorBlack={true}
        />
        <S.NoticeP>
          ** 일부 정보는 고파스 게시물을 참조 했음을 밝힙니다. **
        </S.NoticeP>
        <ExtraHousesButton
          onClick={() => {
            navigate('/exhouses');
          }}
        />
        <FilterWrapper />
      </S.Header>
      <S.Main>
        {houseDatas[0]
          ? houseDatas.map((houseData, index) => (
              <HouseWrapper
                key={index}
                onClick={() => {
                  navigate(`/house/${houseData.id}`);
                }}
                houseWrapperIndex={index}
              />
            ))
          : null}
      </S.Main>
    </S.Container>
  );
}

export default Houses;
