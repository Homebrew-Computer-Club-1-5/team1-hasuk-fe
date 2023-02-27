import * as S from './Select.styled';

interface ISelect {
  datas: { value: number; label: string }[];
  dataState: any;
}

function Select({ datas, dataState }: ISelect) {
  //states
  const [data, setData] = dataState;

  // hooks

  // useEffects

  // event handlers
  const handleChange = (event: any) => {
    const newData = datas.find(
      (data) => data.value === parseInt(event.target.value),
    );
    setData(newData);
  };

  // etc

  return (
    <S.Container>
      <S.Select name="month" value={data.value} onChange={handleChange}>
        {datas.map((data, index) => (
          <S.Option key={index} value={data.value}>
            {data.label}
          </S.Option>
        ))}
      </S.Select>
    </S.Container>
  );
}

export default Select;
