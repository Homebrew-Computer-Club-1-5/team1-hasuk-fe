import { ReactComponent as BackButtonSVG } from '../../assets/BackButton.svg';
function BackButton() {
  return (
    <>
      <BackButtonSVG
        style={{
          width: '36px', //
          position: 'absolute',
          left: 15,
        }}
      />
    </>
  );
}
export default BackButton;
