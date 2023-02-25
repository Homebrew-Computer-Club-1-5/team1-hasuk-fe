import styled from 'styled-components';
import { ReactComponent as ExtraInfos } from '../../../assets/ExtraInfos.svg';
import P_Manrope_Regular from '../../../components/atoms/P_Manrope_Regular';
import { useRecoilValue } from 'recoil';
import { houseDataAtom } from '../../../store/atoms';
import { Dispatch, SetStateAction } from 'react';

interface IWrapper {
  is_crolled: number;
}

const Wrapper = styled.div<IWrapper>`
  text-align: center;
  width: 65px;
  height: 90px;
  position: relative;
  bottom: ${(props) => (props.is_crolled === 0 ? '0px' : '20px')};
`;

interface IHouse_BasicInfos_InfosWrapper_CostOtherInfo {
  setIsCostOtherInfoModalOn: Dispatch<SetStateAction<boolean>>;
}

function House_BasicInfos_InfosWrapper_CostOtherInfo({
  setIsCostOtherInfoModalOn,
}: IHouse_BasicInfos_InfosWrapper_CostOtherInfo) {
  const houseData = useRecoilValue(houseDataAtom);
  return (
    <Wrapper is_crolled={Boolean(houseData.house_cost?.other_info) ? 0 : 1}>
      <ExtraInfos
        style={{ position: 'absolute', right: 7, top: 10 }}
        onClick={() => {
          setIsCostOtherInfoModalOn((current) => !current);
        }}
      />
      <P_Manrope_Regular
        style={{
          textAlign: 'center',
          position: 'absolute',
          bottom: 10,
          fontSize: '15px',
        }}
      >
        기타 금액
      </P_Manrope_Regular>
    </Wrapper>
  );
}

export default House_BasicInfos_InfosWrapper_CostOtherInfo;
