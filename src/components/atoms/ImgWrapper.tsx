import styled from 'styled-components';

interface IImgWrapper {
  source: any;
  alternative: string;
}

function ImgWrapper({ source, alternative }: IImgWrapper) {
  return <img src={source} alt={alternative} />;
}

export default ImgWrapper;
