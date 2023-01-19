import styled from 'styled-components';
import P_Manrope_Light from '../../../components/atoms/P_Manrope_Light';

const Wrapper = styled.div`
  background: lightgray;
  width: 85%;
  height: 200px;
  margin: 0 auto;
  padding: 10px;
`;

interface IHouse_OtherInfoWrapper_TextBox {
  innerText: string;
}

function House_OtherInfoWrapper_TextBox({
  innerText,
}: IHouse_OtherInfoWrapper_TextBox) {
  return (
    <Wrapper>
      <P_Manrope_Light style={{ fontSize: '14px' }}>
        {innerText}
      </P_Manrope_Light>
    </Wrapper>
  );
}

export default House_OtherInfoWrapper_TextBox;
