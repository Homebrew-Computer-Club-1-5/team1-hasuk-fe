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
import writeIdxedDB from '../../lib/util/writeIdxedDB';
import useClearIdxedDBValue from '../../lib/util/clearIdxedDBValue';
import useGetIdxedDBValue from '../../lib/util/getIdxedDBValue';
import ImgDelete from '../../components/molecules/ImgDelete';

const NoticeTextWrapperStyle = {
  paddingTop: '0px',
  marginTop: '0px',
  textAlign: 'center',
};

function Photo() {
  const imageInput = useRef();
  const [stat, setStat] = useRecoilState(statusAtom);
  const [real, setReal] = useRecoilState(countfileAtom);
  const [innerreal, setInnerReal] = useState<number>(0);
  const [fileSize, setFileSize] = useState(0);
  const [preview, setPreview] = useRecoilState(previewAtom);
  const [innerpreview, setInnerPreview] = useState<String[]>([]);
  const [isGetIdxValueSuccess, setIsGetIdxValueSuccess] = useRecoilState(
    isGetIdxValueSuccessAtom,
  );
  const [innerpreviewAfterIdxDB, setInnerpreviewAfterIdxDB] = useRecoilState(
    innerpreviewAfterIdxDBAtom,
  );

  const clearIdxedDBValue = useClearIdxedDBValue();
  const getIdxedDBValue = useGetIdxedDBValue();

  const saveFileImage = (e: any) => {
    setFileSize(0);
    var rawList: any = [];
    var linkList: any = [];

    for (const i in e.target.files) {
      if (Number(i) >= 0) {
        console.log(rawList.length, '라우리스트 길이');
        rawList = [...rawList, e.target.files[i]];
      }
    }
    rawList.map((file: any) => {
      setFileSize((current) => current + Number(file.size));
    });

    for (const i in e.target.files) {
      if (Number(i) >= 0) {
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
    if (real !== 0 && preview.length === real) {
      clearIdxedDBValue();
      writeIdxedDB(preview);
    }
  }, [preview, real]);

  useEffect(() => {
    setReal(innerreal ? real + innerreal : innerpreviewAfterIdxDB.length);
  }, [innerreal, isGetIdxValueSuccess]);

  useEffect(() => {
    setPreview(
      innerreal !== 0 && innerpreview.length === innerreal
        ? [...preview, ...innerpreview]
        : (innerpreviewAfterIdxDB as any),
    );
  }, [innerpreview, isGetIdxValueSuccess]);

  //useEffect(() => {
  //  if (fileSize <= 3000000) {
  //    //if (Number(innerreal) === innerpreview.length) {
  //    //  clearIdxedDBValue();
  //    //  writeIdxedDB(innerpreview);
  //    //}
  //  } else {
  //    alert('파일 용량이 너무 큽니다');
  //    clearIdxedDBValue();
  //  }
  //}, [fileSize, isGetIdxValueSuccess]);

  useEffect(() => {
    getIdxedDBValue();
  }, []);

  return (
    <S.Container>
      <S.NumberH1>{stat.status}/5</S.NumberH1>
      <NoticeTextWrapper style={NoticeTextWrapperStyle as any}>
        사진을 찍어
        <br /> 업로드 해주세요.
      </NoticeTextWrapper>
      {preview.length === Number(real) && Number(real) !== 0 ? (
        <S.CarouselWrapper>
          <ImgCarousel img_url={preview} />
          <ImgDelete img_url={preview} />
        </S.CarouselWrapper>
      ) : (
        <S.EmptyImage></S.EmptyImage>
      )}
      <S.ImageInput
        type="file"
        id="image"
        accept="img/*"
        multiple={true}
        onChange={saveFileImage}
        ref={imageInput as any}
      />
      <S.ButtonsWrapper>
        <S.UploadLabel htmlFor="image">업로드</S.UploadLabel>
        <WhitePill
          text={'이미지 지우기'}
          onClick={() => {
            clearIdxedDBValue();
            setPreview([]);
            setReal(0);
          }}
        />
        <WhitePill
          text={'다음'}
          onClick={() => {
            if (preview.length) {
              setStat({ status: 6 });
            } else {
              alert('적어도 1장 이상의 이미지를 등록해주세요');
            }
          }}
        />
      </S.ButtonsWrapper>
    </S.Container>
  );
}

export default Photo;
