import styled from 'styled-components';
import House_BasicInfos_InfosWrapper_CostOtherInfo from './House_BasicInfos_InfosWrapper_CostOtherInfo';
import House_BasicInfos_InfosWrapper_Deposit from './House_BasicInfos_InfosWrapper_Deposit';
import House_BasicInfos_InfosWrapper_Gender from './House_BasicInfos_InfosWrapper_Gender';
import House_BasicInfos_InfosWrapper_HasEmpty from './House_BasicInfos_InfosWrapper_HasEmpty';
import House_BasicInfos_InfosWrapper_MonthCost from './House_BasicInfos_InfosWrapper_MonthCost';

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  column-gap: 50px;
`;
function House_BasicInfos_InfosWrapper() {
  return (
    <Wrapper>
      <House_BasicInfos_InfosWrapper_Deposit />
      <House_BasicInfos_InfosWrapper_MonthCost />
      <House_BasicInfos_InfosWrapper_CostOtherInfo />
      <House_BasicInfos_InfosWrapper_HasEmpty />
      <House_BasicInfos_InfosWrapper_Gender />
    </Wrapper>
  );
}

export default House_BasicInfos_InfosWrapper;