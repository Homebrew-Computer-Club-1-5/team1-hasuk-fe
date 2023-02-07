import * as S from './Photo.styled';
import { useState, useEffect, useRef } from 'react';
import ImgCarousel from '../../components/molecules/ImgCarousel';
import {
  isGetIdxValueSuccessAtom,
  previewAtom,
  countfileAtom,
  statusAtom,
  innerpreviewAfterIdxDBAtom,
} from '../../store/atoms';
import NoticeTextWrapper from '../../components/molecules/NoticeTextWrapper';
import { useRecoilState } from 'recoil';
import WhitePill from '../../components/molecules/WhitePill';
import useWriteIdxedDB from '../../lib/util/writeIdxedDB';
import useClearIdxedDBValue from '../../lib/util/clearIdxedDBValue';
import useGetIdxedDBValue from '../../lib/util/getIdxedDBValue';

const divStyle = {
  background: 'lightgray',
  borderRadius: '12px',
  width: '100%',
  height: '30vh',
  position: 'relative',
  overflow: 'hidden',
};
const NoticeTextWrapperStyle = {
  paddingTop: '0px',
  marginTop: '0px',
  textAlign: 'center',
};
const inputStyle = {
  display: 'none',
};
const labelStyle = {
  paddingLeft: '10px',
  paddingRight: '10px',
  paddingTop: '5px',
  paddingBottom: '5px',
  zIndex: 6,
  minWidth: '85px',
  fontSize: '17px',
  fontWeight: 600,
  border: '1px solid black',

  backgroundColor: 'white',
  borderRadius: '20px',
  textAlign: 'center',
};

function Photo() {
  const imageInput = useRef();
  const [stat, setStat] = useRecoilState(statusAtom);
  const [real, setReal] = useRecoilState(countfileAtom);
  const [innerreal, setInnerReal] = useState<number>(0);
  const [preview, setPreview] = useRecoilState(previewAtom);
  const [innerpreview, setInnerPreview] = useState<String[]>(['']);

  const [isGetIdxValueSuccess, setIsGetIdxValueSuccess] = useRecoilState(
    isGetIdxValueSuccessAtom,
  );
  const [innerpreviewAfterIdxDB, setInnerpreviewAfterIdxDB] = useRecoilState(
    innerpreviewAfterIdxDBAtom,
  );

  const clearIdxedDBValue = useClearIdxedDBValue();
  const getIdxedDBValue = useGetIdxedDBValue();

  const saveFileImage = (e: any) => {
    clearIdxedDBValue();
    var rawList = [];
    var linkList: any = [];

    for (const i in e.target.files) {
      if (Number(i) >= 0) {
        rawList[Number(i)] = e.target.files[i];
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          linkList = [...linkList, reader.result];

          setInnerPreview(linkList as any);
        });
        reader.readAsDataURL(e.target.files[i]);
      }
    }

    setInnerReal(rawList.length);
  };

  useEffect(() => {
    if (Number(innerreal) === innerpreview.length) {
      useWriteIdxedDB(innerpreview);
    }
  }, [innerpreview]);

  useEffect(() => {
    setPreview(
      innerpreview.length === innerreal
        ? innerpreview
        : (innerpreviewAfterIdxDB as any),
    );
    setReal(innerreal ? innerreal : innerpreviewAfterIdxDB.length);
    console.log(innerpreviewAfterIdxDB.length);
  }, [innerreal, innerpreview, isGetIdxValueSuccess]);

  useEffect(() => {
    console.log(preview, '불러왔을때 preview값');
  }, [preview]);

  useEffect(() => {
    getIdxedDBValue();
  }, []);

  return (
    <S.Wrapper>
      <h1>{stat.status}/5</h1>
      <NoticeTextWrapper style={NoticeTextWrapperStyle as any}>
        사진을 찍어
        <br /> 업로드 해주세요.
      </NoticeTextWrapper>
      {preview.length === Number(real) && Number(real) !== 0 ? (
        <ImgCarousel img_url={preview} />
      ) : (
        <div style={divStyle as any}></div>
      )}
      <input
        style={inputStyle}
        type="file"
        id="image"
        accept="img/*"
        multiple={true}
        onChange={saveFileImage}
        ref={imageInput as any}
      />
      <div className="buttons">
        <label style={labelStyle as any} htmlFor="image">
          업로드
        </label>
        <WhitePill
          text={'이미지 지우기'}
          onClickNavigator={() => {
            clearIdxedDBValue();
            setPreview([]);
            setReal(0);
          }}
        />
        <WhitePill
          text={'다음'}
          onClickNavigator={() => {
            if (preview.length) {
              setStat({ status: 6 });
            } else {
              alert('적어도 1장 이상의 이미지를 등록해주세요');
            }
          }}
        />
      </div>
    </S.Wrapper>
  );
}

export default Photo;
