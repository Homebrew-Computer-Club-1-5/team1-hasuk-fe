import { useNavigate } from 'react-router-dom';

import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { ReactComponent as BackButton } from '../../assets/BackButton.svg';
import { houseDatasAtom } from '../../store/atoms';

import Title from '../atoms/Title';

const Wrapper = styled.div`
  width: 100%;
  padding: 20px 0;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
`;

interface ITitleWrapper {
  style?: React.CSSProperties;
  navigateRoute: string;
  isTitleOn: boolean;
  isBackButtonColorBlack: boolean;
  titleText?: string;
}

function TitleWrapper({
  style,
  navigateRoute,
  isTitleOn,
  isBackButtonColorBlack,
  titleText,
}: ITitleWrapper) {
  const houseDatas = useRecoilValue(houseDatasAtom);
  const navigate = useNavigate();
  return (
    <Wrapper style={style}>
      <BackButton
        onClick={() => {
          navigate(navigateRoute);
        }}
        fill={isBackButtonColorBlack ? 'black' : 'white'}
        style={{
          width: '36px', //
          position: 'absolute',
          left: 15,
        }}
      />
      {isTitleOn ? (
        <Title>{`고려대학교 - ${houseDatas[0].region_name}`}</Title>
      ) : (
        <></>
      )}
      {titleText ? <Title>{titleText}</Title> : null}
    </Wrapper>
  );
}

// Title 부분 똥코드라서 수정해야함

export default TitleWrapper;
