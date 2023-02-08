import { UseFormRegisterReturn } from 'react-hook-form';
import styled, { css } from 'styled-components';

const Wrapper = styled.div<StyledWrapperProps>`
  position: relative;
  width: ${({ width }) => (width ? `${width}` : '300px')};
  height: 50px;
  border-radius: 10px;
  padding: 10px 15px;
  background-color: #e4e4e4;
  word-break: break-all;
`;

const Input = styled.input<StyledInputProps>`
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: none;
  word-break: break-all;

  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '20px')};
  font-weight: 200px;
  &:focus {
    outline: none;
  }
`;

const Textarea = styled.textarea<StyledInputProps>`
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: none;
  word-break: break-all;

  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '20px')};
  font-weight: 200px;
  &:focus {
    outline: none;
  }
`;

const InputTemplate_ChildrenWrapper = styled.div``;

interface StyledWrapperProps {
  width?: String;
}
interface StyledInputProps {
  fontSize?: number;
}
interface IInputTemplate {
  children?: React.ReactNode;
  registerObject?: UseFormRegisterReturn;
  placeholderText: string;
  defaultValue?: string | number;
  width?: string;
  fontsize?: number;
  multipleLines?: boolean;
}

function InputTemplate({
  children,
  registerObject,
  placeholderText,
  defaultValue,
  width,
  fontsize,
  multipleLines,
}: IInputTemplate) {
  return (
    <Wrapper width={width}>
      {multipleLines ? (
        <Textarea
          fontSize={fontsize}
          value={defaultValue ? defaultValue : undefined}
          placeholder={placeholderText}
          {...registerObject}
        ></Textarea>
      ) : (
        <Input
          fontSize={fontsize}
          value={defaultValue !== '0' ? defaultValue : undefined}
          placeholder={placeholderText}
          {...registerObject}
        ></Input>
      )}

      {children}
    </Wrapper>
  );
}

export default InputTemplate;
