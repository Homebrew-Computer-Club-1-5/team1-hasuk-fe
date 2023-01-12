import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as BackButton } from '../../assets/BackButton.svg';
import { ReactComponent as ForthButton } from '../../assets/ForthButton.svg';

const Wrapper = styled.div`
  background: lightgray;
  border-radius: 12px;
  width: 350px;
  height: 250px;
  position: relative;
  overflow: hidden;
`;

const ImgsWrapper = styled.div`
  display: flex;
  transition: all 0.4s ease-out;
  div {
    width: 350px;
    height: 250px;
    background-position: 50% 50%;
    background-size: cover;
    background-repeat: no-repeat;
    flex: none;
  }
`;

const PositionDotsWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  width: 50px;
  justify-content: space-between;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const PositionDot_Current = styled.div`
  background-color: #686868;
  border-radius: 100%;
  height: 7px;
  width: 7px;
`;

const PositionDot_NotCurrent = styled.div`
  background-color: #ffffff;
  border-radius: 100%;
  height: 7px;
  width: 7px;
`;

function ImgCarousel() {
  const [current, setCurrent] = useState(0);
  const [style, setStyle] = useState({
    marginLeft: `-${current}00%`,
  });

  const urls = [
    'https://img.koreapas.com/i/61ddf4a/resize',
    'https://img.koreapas.com/i/a86267b/resize',
    'https://img.koreapas.com/i/f2f3854/resize',
  ];

  const imgSize = useRef(urls.length);

  function moveSlide(i: number) {
    let nextIndex = current + i;

    if (nextIndex < 0) nextIndex = imgSize.current - 1;
    else if (nextIndex >= imgSize.current) nextIndex = 0;

    setCurrent(nextIndex);
  }

  useEffect(() => {
    setStyle({ marginLeft: `-${current}00%` });
  }, [current]);

  return (
    <Wrapper>
      <BackButton
        style={{
          width: '41px',
          position: 'absolute',
          top: '105px',
          color: 'white', // 컬러 설정이 안됨
        }}
        onClick={() => {
          moveSlide(-1);
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
        onClick={() => {
          moveSlide(1);
        }}
      />
      <ImgsWrapper style={style}>
        {urls.map((url, index) => (
          <div
            key={index}
            style={{
              backgroundImage: `url(${url})`,
            }}
          ></div>
        ))}
      </ImgsWrapper>
      <PositionDotsWrapper>
        {urls.map((url, index) =>
          index === current ? (
            <PositionDot_Current />
          ) : (
            <PositionDot_NotCurrent />
          ),
        )}
      </PositionDotsWrapper>
    </Wrapper>
  );
}

export default ImgCarousel;
