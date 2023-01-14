import styled from 'styled-components';
import House_Info_BlackPillWrapper from './House_Info_BlackPillWrapper';
import House_OtherInfoWrapper_TextBox from './House_OtherInfoWrapper_TextBox';

const Wrapper = styled.div``;

function House_OtherInfoWrapper() {
  return (
    <Wrapper>
      <House_Info_BlackPillWrapper innerText="기타" />
      <House_OtherInfoWrapper_TextBox innerText="가나다라마바사아자차카타파하~~안녕하세요 저는 김건입니다~~~~" />
    </Wrapper>
  );
}

export default House_OtherInfoWrapper;
