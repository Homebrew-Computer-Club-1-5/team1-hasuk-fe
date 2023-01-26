import styled from 'styled-components';
interface IContent {
  textList: string[];
}

function Selectbox({ textList }: IContent) {
  return (
    <select>
      {textList.map((string) => {
        return <option>{string}</option>;
      })}
    </select>
  );
}

export default Selectbox;
