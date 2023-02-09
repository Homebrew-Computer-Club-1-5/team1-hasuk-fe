import styled from 'styled-components';

export const Container = styled.div`
  margin: 10px 0px;
  z-index: -1;
`;

export const InfosWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: baseline;
`;

export const ExtraInfosWrapper = styled.div`
  display: absolute;
  left: 0;
`;

export const PriceInfoWrapper = styled.div`
  display: flex;
  position: absolute;
  right: 10px;
  top: 30%; // 수정 필요. 야매로 중간에 배치시킴
  align-items: baseline;
`;
