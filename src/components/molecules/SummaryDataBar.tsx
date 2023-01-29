import styled from 'styled-components';
import Pencil from '../../assets/Pencil.svg';

const AllWrapper = styled.div`
  background-color: white;
  width: 100%;
  padding: 20px 20px;
  display: flex;
  .title {
    font-weight: 990;
    font-size: 17px;
    text-align: center;
    width: 100px;
  }
  .data {
    font-weight: 300;
    font-size: 16px;
    width: 200px;
    text-align: center;
  }
  .icon {
    width: 20px;
    margin-right: 10px;
  }
`;

interface Bar {
  title: string;
  data: string | number | undefined | any[];
  onClickEvent: any;
}
function SummaryDataBar({ title, data, onClickEvent }: Bar) {
  return (
    <AllWrapper>
      <div className={'title'}>{title}</div>
      <div className={'data'}>{data}</div>
      <img className={'icon'} src={Pencil} onClick={onClickEvent} />
    </AllWrapper>
  );
}
export default SummaryDataBar;
