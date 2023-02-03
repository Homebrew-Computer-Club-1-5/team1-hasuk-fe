import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as BackButton } from '../../assets/BackButton.svg';
import { ReactComponent as ForthButton } from '../../assets/ForthButton.svg';
// import HouseSampleImg from '../../assets/HouseSampleImg.png';

const Wrapper = styled.div`
  background: lightgray;
  border-radius: 12px;
  width: 100%;
  height: 30vh;
  position: relative;
  overflow: hidden;
`;

const ImgsWrapper = styled.div`
  display: flex;
  transition: all 0.4s ease-out;
  width: 100%;
  div {
    width: 100%;
    height: 30vh;
    /* height: 100%; */
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

interface IImgCarousel {
  img_url: string[];
  style?: React.CSSProperties;
}

function ImgCarousel({ img_url, style }: IImgCarousel) {
  const [current, setCurrent] = useState(0);
  const [marginStyle, setMarginStyle] = useState({
    marginLeft: `-${current}00%`,
  });

  const imgSize = useRef(img_url.length);
  function moveSlide(i: number) {
    let nextIndex = current + i;

    if (nextIndex < 0) nextIndex = imgSize.current - 1;
    else if (nextIndex >= imgSize.current) nextIndex = 0;

    setCurrent((current) => {
      return nextIndex;
    });
  }

  useEffect(() => {
    setMarginStyle({ marginLeft: `-${current}00%` });
  }, [current]);

  return (
    <Wrapper style={style}>
      <BackButton
        style={{
          width: '41px',
          position: 'absolute',
          top: '105px',
          color: 'white', // 컬러 설정이 안됨
          zIndex: 100,
        }}
        onClick={(event) => {
          event.stopPropagation();
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
        onClick={(event) => {
          moveSlide(1);

          event.stopPropagation();
        }}
      />
      <ImgsWrapper style={marginStyle}>
        {img_url[0] ? (
          img_url.map((url, index) => (
            <div
              key={index}
              style={{
                backgroundImage: `url(${url ? url : '/HouseSampleImg.png'})`,
              }}
            ></div>
          ))
        ) : (
          <div
            style={{
              backgroundImage: `url(/HouseSampleImg.png)`,
            }}
          ></div>
        )}
      </ImgsWrapper>
      <PositionDotsWrapper>
        {img_url.map((url, index) =>
          index === current ? (
            <PositionDot_Current key={index} />
          ) : (
            <PositionDot_NotCurrent key={index} />
          ),
        )}
      </PositionDotsWrapper>
    </Wrapper>
  );
}

export default ImgCarousel;
