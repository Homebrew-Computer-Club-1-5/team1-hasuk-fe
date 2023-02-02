import styled from 'styled-components';
export const Wrapper = styled.div`
  width: 80vw;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  #textPlace {
    width: 80vw;
    padding-top: 40%;
    text-align: center;
    #selectWrapper {
      align-items: center;
      display: flex;
      justify-content: left;
      padding-left: 20px;
      p {
        font-size: 12px;
        font-weight: 990;
        margin-right: 20px;
      }
    }
    #radioWrapper {
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
  }
`;
