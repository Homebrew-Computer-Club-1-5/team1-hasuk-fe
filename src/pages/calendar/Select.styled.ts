import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 220px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #dbdbdb;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    right: 18px;
    width: 10px;
    height: 10px;
    margin-top: -5px;
    border-top: 2px solid #484848;
    border-right: 2px solid #484848;
    transform: rotate(45deg);
  }
`;

export const Select = styled.select`
  position: relative;
  width: 100%;
  height: 100%;
  font-size: 20px;
  font-weight: 700;
  border: none;
  outline: none;
  background-color: transparent;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding-left: 16px;
  cursor: pointer;
  color: #484848;
`;

export const OptionsWrapper = styled.div``;

export const OptionWrapper = styled.div``;

export const Option = styled.option`
  font-weight: 400;
  border: none;
  outline: none;
  background-color: #fff;
  cursor: pointer;
  color: #484848;
`;
