import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import './PillRadio.css';
export interface IContent {
  text: string;
  value: number;
  onClickPill?: () => void;
}

interface IObject {
  stuff: IContent[];
  getRadioValue?: any;
  defaultValue?: any;
}

interface Props {
  backColor?: string;
  fontColor?: string;
}

const Pill = styled.div<Props>`
  display: block;
  padding: 0px 10px;
  z-index: 6;
  font-size: 17px;
  font-weight: 600;
  border: 1px solid black;
  height: 20px;
  width: max-content;
  margin-right: 10px;
  background-color: ${(props) => props.backColor};
  color: ${(props) => props.fontColor};
  border-radius: 20px;
  box-shadow: 0px 5px lightgray;
`;

function PillRadio({ stuff, getRadioValue, defaultValue }: IObject) {
  const [x, setX] = useState<any>();
  useEffect(() => {
    setX(defaultValue);
  }, [defaultValue]);

  const handleClickRadioButton2 = (e: any) => {
    setX(e.target.value);
  };
  if (getRadioValue) {
    getRadioValue(x);
  }

  return (
    <div id="Wrapper">
      {stuff.map((content, index) => (
        <label id="Choice" key={index} onClick={content.onClickPill}>
          <input
            type="radio"
            className="input-hidden"
            value={content.value}
            checked={x ? x === content.value : false}
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
