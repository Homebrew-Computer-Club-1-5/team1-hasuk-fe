import * as S from './Main.styled';
import Map from './Map';
import hasukLogo from '../../assets/iconhouse.png';
import P_Manrope_ExtraBold from '../../components/atoms/P_Manrope_ExtraBold';
import icon from '../../assets/haksamo.png';
import CreateHouseButton from '../../components/molecules/CreateHouseButton';
import MenuButton from '../../components/molecules/MenuButton';
// import icon from '../../assets/haksamo.png';
function Main() {
  const onchange = () => {
    console.log();
  };
  return (
    <S.Container>
      <S.Header>
        <img src={hasukLogo} alt="하숙" />
        <P_Manrope_ExtraBold>대학방</P_Manrope_ExtraBold>
        <S.versionBox>v {process.env.REACT_APP_VERSION}</S.versionBox>
        <div id="selectBox">
          <img src={icon} />
          <select onChange={onchange}>
            <option value="고려대">고려대</option>
          </select>
        </div>
      </S.Header>
      <S.Wrapper>
        <CreateHouseButton />
        <MenuButton />
        <Map />
      </S.Wrapper>
    </S.Container>
  );
}
export default Main;
