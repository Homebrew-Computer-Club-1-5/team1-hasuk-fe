import styled from 'styled-components';

export const Nav = styled.nav`
  border-top: #dedede 1px solid;
  display: flex;
  position: fixed;

  z-index: 300;
  width: 100%;
  height: 60px;
  background-color: #fff;
  bottom: 0;
  left: 0;
  border-top: 1px solid #ebebeb;
`;

export const Ul = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
`;

export const Li = styled.li`
  width: 20%;
  text-align: center;
  padding: 10px 0;
  p {
    margin: 0px;
    font-size: 13px;
    color: #828282;
  }
`;

export const MainP = styled.p``;

export const AllHousesP = styled.p``;

export const CreateHouseP = styled.p``;

export const ProfileP = styled.p``;
