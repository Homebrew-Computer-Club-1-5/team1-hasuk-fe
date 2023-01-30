import styled from 'styled-components';
import { useState } from 'react';
interface IContent {
  text: string;
  value: number;
  defaultValue: boolean;
}

interface IObject {
  stuff: IContent[];
  getSelectValue: any;
}

function Selectbox({ stuff, getSelectValue }: IObject) {
  const [x, setX] = useState();
  const handleChangeSelect = (e: any) => {
    setX(e.target.value);
  };
  getSelectValue(x);
  return (
    <select onChange={handleChangeSelect}>
      {stuff.map((string) => {
        return (
          <option value={string.value} selected={string.defaultValue}>
            {string.text}
          </option>
        );
      })}
    </select>
  );
}

export default Selectbox;
