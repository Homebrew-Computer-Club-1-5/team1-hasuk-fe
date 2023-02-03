import styled from 'styled-components';
export const Wrapper = styled.div`
  width: 80vw;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  .radioWrapper {
    width: 100%;
    display: flex;
    margin-bottom: 20px;
    p {
      width: 80px;
      font-weight: 990;
      font-size: 12px;
      padding-top: 10px;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .otherInfoWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    p {
      font-size: 12px;
      width: 100%;
      font-weight: 990;
      margin: 0px;
    }
    .extra {
      margin-top: 10px;
      font-size: 10px;
      margin-bottom: 10px;
    }
  }
`;
