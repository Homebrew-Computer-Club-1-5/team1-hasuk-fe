import { UseFormRegisterReturn } from 'react-hook-form';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  width: 300px;
  height: 50px;
  border-radius: 10px;
  padding: 10px 15px;
  background-color: #e4e4e4;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: none;

  font-size: 20px;
  font-weight: 200px;
  &:focus {
    outline: none;
  }
`;

const InputTemplate_ChildrenWrapper = styled.div``;

interface IInputTemplate {
  children?: React.ReactNode;
  registerObject: UseFormRegisterReturn;
  placeholderText: string;
  defaultValue?: string | number;
}

function InputTemplate({
  children,
  registerObject,
  placeholderText,
  defaultValue,
}: IInputTemplate) {
  return (
    <Wrapper>
      <Input
        value={defaultValue ? defaultValue : undefined}
        placeholder={placeholderText}
        {...registerObject}
      ></Input>
      {children}
    </Wrapper>
  );
}

export default InputTemplate;
