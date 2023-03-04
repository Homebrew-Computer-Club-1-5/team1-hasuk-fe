import * as S from './Main.styled';
import Map from './Map';
import hasukLogo from '../../assets/iconhouse.png';
import P_Manrope_ExtraBold from '../../components/atoms/P_Manrope_ExtraBold';
import icon from '../../assets/haksamo.png';
import { useEffect } from 'react';
import useResetAllAtoms from '../../lib/util/resetAllAtoms';
import ImgWrapper from '../../components/atoms/ImgWrapper';
import Selectbox from '../../components/molecules/Selectbox';
import Exam from './Exam';

declare global {
  interface Window {
    kakao: any;
  }
}

// import icon from '../../assets/haksamo.png';
function Main() {
  const resetAllAtoms = useResetAllAtoms();
  useEffect(() => {
    resetAllAtoms();
  }, []);

  return (
    <S.Container>
      <S.Header>
        <ImgWrapper source={hasukLogo} alternative={'대학방'} />
        <P_Manrope_ExtraBold>대학방</P_Manrope_ExtraBold>
        <S.versionBox>v {process.env.REACT_APP_VERSION}</S.versionBox>
        <Selectbox
          source={icon}
          stuff={[{ text: '고려대', value: 1, defaultValue: false }]}
        />
      </S.Header>
      <S.MapWrapper>
        <Map />
      </S.MapWrapper>
    </S.Container>
  );
}
export default Main;
