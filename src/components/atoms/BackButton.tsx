import { ReactComponent as BackButtonSVG } from '../../assets/BackButton.svg';
interface IBackButton {
  style?: React.CSSProperties | undefined;
}
function BackButton({ style }: IBackButton) {
  return <BackButtonSVG style={style} />;
}
export default BackButton;
