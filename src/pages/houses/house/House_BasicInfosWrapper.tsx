import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import House_BasicInfos_InfosWrapper from './House_BasicInfos_InfosWrapper';
import House_Info_BlackPillWrapper from './House_Info_BlackPillWrapper';

const Wrapper = styled.div``;

interface IHouse_BasicInfos_InfosWrapper {
  setIsCostOtherInfoModalOn: Dispatch<SetStateAction<boolean>>;
}

function House_BasicInfosWrapper({
  setIsCostOtherInfoModalOn,
}: IHouse_BasicInfos_InfosWrapper) {
  return (
    <Wrapper>
      <House_Info_BlackPillWrapper innerText="기본" />
      <House_BasicInfos_InfosWrapper
        setIsCostOtherInfoModalOn={setIsCostOtherInfoModalOn}
      />
    </Wrapper>
  );
}

export default House_BasicInfosWrapper;
