import { ReactComponent as RightButtonSVG } from '../../assets/ForthButton.svg';
interface IForthButton {
  style?: React.CSSProperties | undefined;
}
function ForthButton({ style }: IForthButton) {
  return <RightButtonSVG style={style} />;
}
export default ForthButton;
