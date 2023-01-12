import { useState } from 'react';
import styled from 'styled-components';
import BackButton from '../atoms/BackButton';
import ForthButton from '../atoms/ForthButton';

const Wrapper = styled.div`
  background: lightgray;
  border-radius: 12px;
  width: 350px;
  height: 250px;

  overflow: hidden;
`;

const ImgsWrapper = styled.div`
  display: flex;
  position: relative;
  div {
    width: 350px;
    height: 250px;
    background-position: 50% 50%;
    background-size: cover;
    background-repeat: no-repeat;
    flex: none;
  }
`;

function ImgCarousel() {
  const [current, setCurrent] = useState(0);
  const [marginLeft, setMarginLeft] = useState({
    marginLeft: `-${current}00%`,
  });

  const urls = [
    'https://img.koreapas.com/i/61ddf4a/resize',

    'https://img.koreapas.com/i/a86267b/resize',
    'https://img.koreapas.com/i/a86267b/resize',
  ];

  return (
    <Wrapper>
      <ImgsWrapper>
        <BackButton
          style={{
            width: '41px',
            position: 'absolute',
            top: '105px',
            color: 'white', // 컬러 설정이 안됨
          }}
        />
        <ForthButton
          style={{
            width: '41px',
            position: 'absolute',
            right: 0,
            top: '105px',
            color: 'white', // 컬러 설정이 안됨
          }}
        />
        {urls.map((url, index) => (
          <div
            key={index}
            style={{
              backgroundImage: `url(${url})`,
            }}
          ></div>
        ))}
      </ImgsWrapper>
    </Wrapper>
  );
}

export default ImgCarousel;
