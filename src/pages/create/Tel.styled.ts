import styled from 'styled-components';
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
  margin: 0px auto;
  align-items: center;

  #textPlace {
    width: 80vw;

    text-align: center;
    form {
      margin-top: 100px;
      div {
        margin-top: 30px;
      }
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
