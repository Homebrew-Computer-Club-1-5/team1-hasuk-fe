import * as S from './Main.styled';
import Map from './Map';
import hasukLogo from '../../assets/iconhouse.png';
import icon from '../../assets/haksamo.png';
function Main() {
  const onchange = () => {
    console.log();
  };
  return (
    <S.Container>
      <S.Header>
        <img src={hasukLogo} alt="하숙" />
        <h1>대학방</h1>
        <S.versionBox>v{process.env.REACT_APP_VERSION}</S.versionBox>
        <select onChange={onchange}>
          <img src={icon} />
          <option value="고려대">고려대</option>
        </select>
      </S.Header>
      <S.Wrapper>
        <Map />
      </S.Wrapper>
    </S.Container>
  );
}
export default Main;
