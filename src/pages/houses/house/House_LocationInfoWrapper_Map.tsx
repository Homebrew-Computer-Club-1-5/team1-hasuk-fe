import styled from 'styled-components';
import { Ihouse_location } from '../../../store/atoms';

const Wrapper = styled.div`
  background-color: lightgray;
  width: 85%;
  height: 170px;
  margin: 0 auto;
`;

interface IHouse_LocationInfoWrapper_Map {
  house_location: Ihouse_location;
}

function House_LocationInfoWrapper_Map({
  house_location,
}: IHouse_LocationInfoWrapper_Map) {
  return <Wrapper></Wrapper>;
}

export default House_LocationInfoWrapper_Map;
