import styled from 'styled-components';
import { useState } from 'react';

export const SelBox = styled.div`
  position: absolute;
  right: 10px;
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  .image {
    width: 20px;
    height: 20px;
  }
  .select {
    margin-top: 0px;
    border: none;
    background-color: transparent;
  }
`;
interface IContent {
  text: string;
  value: number;
  defaultValue: boolean;
}

interface IObject {
  stuff: IContent[];
  getSelectValue?: any;
  source?: any;
}

function Selectbox({ stuff, getSelectValue, source }: IObject) {
  const [x, setX] = useState();
  const handleChangeSelect = (e: any) => {
    setX(e.target.value);
  };
  if (getSelectValue) {
    getSelectValue(x);
  }

  return (
    <SelBox>
      {source ? <img className="image" src={source} /> : null}
      <select className="select" onChange={handleChangeSelect}>
        {stuff.map((string) => {
          return (
            <option
              key={string.text}
              value={string.value}
              selected={string.defaultValue}
            >
              {string.text}
            </option>
          );
        })}
      </select>
    </SelBox>
  );
}

export default Selectbox;
