import { useState, useRef, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import useClearIdxedDBValue from '../../lib/util/clearIdxedDBValue';
import deleteIdxedDBValue from '../../lib/util/deleteIdxedDBValue';
import writeIdxedDB from '../../lib/util/writeIdxedDB';
import { countfileAtom, previewAtom } from '../../store/atoms';

const Wrapper = styled.div`
  width: 80px;
  height: 30vh;
  position: flex;
  flex-direction: column;
  overflow: scroll;
`;

const DeleteButton = styled.button`
  background: red;
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: center;
  color: white;
  border-radius: 10px;
  width: 20px;
  height: 20px;
  padding-top: 0px;
  right: 0px;
`;

const ImgWrapper = styled.div`
  background: lightgray;
  border-radius: 8px;
  width: 70px;
  height: 70px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-position: center;
  background-size: cover;
  margin-bottom: 5px;
`;

interface IImgDelete {
  img_url: string[];
}

function ImgDelete({ img_url }: IImgDelete) {
  const [preview, setPreview] = useRecoilState(previewAtom);
  const [real, setReal] = useRecoilState(countfileAtom);
  return (
    <Wrapper>
      {img_url[0]
        ? img_url.map((url, index) => (
            <ImgWrapper key={index} style={{ backgroundImage: `url(${url})` }}>
              <DeleteButton
                onClick={(event) => {
                  setReal((current) => current - 1);
                  setPreview((current) => [
                    ...current.slice(0, index),
                    ...current.slice(index + 1),
                  ]);
                  deleteIdxedDBValue(index);
                }}
              >
                x
              </DeleteButton>
            </ImgWrapper>
          ))
        : null}
    </Wrapper>
  );
}

export default ImgDelete;
