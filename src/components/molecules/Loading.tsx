import { Background, LoadingText } from './Loading.styled';
import Spinner from '../../assets/Spinner.gif';

interface ILoading {
  loadingText?: string;
}
export default function Loading({ loadingText }: ILoading) {
  return (
    <Background>
      <LoadingText>
        {loadingText ? loadingText : '잠시만 기다려 주세요.'}
      </LoadingText>
      <img src={Spinner} alt="로딩중"></img>
    </Background>
  );
}
