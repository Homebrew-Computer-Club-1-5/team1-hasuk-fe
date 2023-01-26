import { useState, useRef } from 'react';
import styled from 'styled-components';
import './PillRadio.css';

interface IContent {
  text: string;
  value: number;
}

interface IObject {
  stuff: IContent[];
}

interface Props {
  backColor?: string;
  fontColor?: string;
}

const Pill = styled.div<Props>`
  display: inline-block;
  padding: 0px 10px;
  z-index: 6;
  font-size: 17px;
  font-weight: 600;
  border: 1px solid black;
  height: 20px;
  background-color: ${(props) => props.backColor};
  color: ${(props) => props.fontColor};
  border-radius: 20px;
`;

function PillRadio({ stuff }: IObject) {
  const [x, setX] = useState();
  const handleClickRadioButton2 = (e: any) => {
    console.log(e.target.value);
    setX(e.target.value);
  };
  return (
    <div>
      {stuff.map((content) => (
        <label>
          <input
            type="radio"
            className="input-hidden"
            value={content.value}
            checked={x === content.value}
            onChange={handleClickRadioButton2}
          ></input>
          <Pill
            backColor={content.value === Number(x) ? 'black' : 'white'}
            fontColor={content.value === Number(x) ? 'white' : 'black'}
            className="pill"
          >
            {content.text}
          </Pill>
        </label>
      ))}
    </div>
  );
}

export default PillRadio;
