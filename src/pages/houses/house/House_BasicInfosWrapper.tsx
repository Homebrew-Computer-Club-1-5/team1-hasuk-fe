import styled from 'styled-components';
import House_BasicInfos_InfosWrapper from './House_BasicInfos_InfosWrapper';
import House_Info_BlackPillWrapper from './House_Info_BlackPillWrapper';

const Wrapper = styled.div``;

function House_BasicInfosWrapper() {
  return (
    <Wrapper>
      <House_Info_BlackPillWrapper innerText="기본" />
      <House_BasicInfos_InfosWrapper />
    </Wrapper>
  );
}

export default House_BasicInfosWrapper;
