import { useState, useRef, useEffect, Children } from 'react';
import styled from 'styled-components';
import { ReactComponent as BackButton } from '../../assets/BackButton.svg';
import { ReactComponent as ForthButton } from '../../assets/ForthButton.svg';
import Zzim from './Zzim';
// import HouseSampleImg from '../../assets/HouseSampleImg.png';

const Wrapper = styled.div`
  background: lightgray;
  border-radius: 12px;
  width: 100%;
  height: 260px;
  position: relative;
  overflow: hidden;
`;

const ImgsWrapper = styled.div`
  display: flex;
  transition: all 0.4s ease-out;
  width: 100%;
  div {
    width: 100%;
    height: 260px;
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
  width: 200px;
  justify-content: space-evenly;
  /* gap: 5px; */
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

const ButtonWrapper = styled.div`
  background-color: #ffffffff;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  position: absolute;
  top: 105px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface IImgCarousel {
  img_url: string[];
  style?: React.CSSProperties;
  house_id?: number;
  is_checked?: number | null;
}

function ImgCarousel({ img_url, style, house_id, is_checked }: IImgCarousel) {
  const [current, setCurrent] = useState(0);
  const [marginStyle, setMarginStyle] = useState({
    marginLeft: `-${current}00%`,
  });
  const [imgSize, setImgSize] = useState(img_url.length);
  let begin = 0;
  let isBegin = false;
  let final = 0;

  // 2. 버튼 눌러서 moveSlide 실행시 => current 바뀌게
  function moveSlide(i: number) {
    let nextIndex = current + i;

    // imgSize - 1 (마지막 인덱스) 보다 커지면, 0으로 셋팅
    if (nextIndex > imgSize - 1) nextIndex = nextIndex - 1;
    // imgSize - 1 (첫번째 인덱스) 보다 작아지면, 마지막 인덱스 으로 셋팅
    else if (nextIndex < 0) nextIndex = nextIndex + 1;
    else nextIndex = nextIndex;

    setCurrent((current) => {
      return nextIndex;
    });
  }

  function handleTouchStart(e: any) {
    begin = e.changedTouches[0].clientX;
    isBegin = true;
    console.log(e.changedTouches[0].clientX, '스타트');
  }
  function handleTouchMove(e: any) {
    if (isBegin === true) {
      final = e.changedTouches[0].clientX - begin;
    }
  }
  function handleTouchEnd(e: any) {
    isBegin = false;
    console.log(e, '이벤트 전체');
    if (Number(final) > 0) {
      console.log('뒤로');
      moveSlide(-1);
    }
    if (Number(final) < 0) {
      console.log('앞으로');
      moveSlide(1);
    }
    final = 0;
  }

  // 3. current 바뀌면 => marginStyle 바뀌게
  useEffect(() => {
    setMarginStyle({ marginLeft: `-${current}00%` });
  }, [current]);

  // 4. img_url 바뀌면 imgSize state 도 업데이트
  useEffect(() => {
    setImgSize(img_url.length);
  }, [img_url]);

  return (
    <Wrapper style={style}>
      {is_checked === null || is_checked === 1 || is_checked === 0 ? (
        <Zzim
          house_id={house_id}
          is_checked={is_checked}
          style={{ right: -10, top: -10 }}
        />
      ) : null}
      <ButtonWrapper
        style={{ left: 10 }}
        onClick={(event) => {
          event.stopPropagation();
          moveSlide(-1);
        }}
      >
        <BackButton
          style={{
            width: '20px',
          }}
          fill="black"
        />
      </ButtonWrapper>
      <ButtonWrapper
        style={{ right: 10 }}
        onClick={(event) => {
          event.stopPropagation();
          moveSlide(1);
        }}
      >
        <ForthButton
          style={{
            width: '20px',
          }}
          fill="black"
        />
      </ButtonWrapper>

      <ImgsWrapper
        style={marginStyle}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
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
