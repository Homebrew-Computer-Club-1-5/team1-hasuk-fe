import * as S from './Photo.styled';
import { useState, useEffect, useRef } from 'react';
import ImgCarousel from '../../components/molecules/ImgCarousel';
import {
  isGetIdxValueSuccessAtom,
  previewAtom,
  countfileAtom,
  statusAtom,
  innerpreviewAfterIdxDBAtom,
  googleLinkAtom,
  googleLinkCountAtom,
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
  const [googleLinkCount, setGoogleLinkCount] =
    useRecoilState(googleLinkCountAtom);
  const [isGetIdxValueSuccess, setIsGetIdxValueSuccess] = useRecoilState(
    isGetIdxValueSuccessAtom,
  );
  const [innerpreviewAfterIdxDB, setInnerpreviewAfterIdxDB] = useRecoilState(
    innerpreviewAfterIdxDBAtom,
  );
  const [googleLink, setGoogleLink] = useRecoilState(googleLinkAtom);

  const clearIdxedDBValue = useClearIdxedDBValue();
  const getIdxedDBValue = useGetIdxedDBValue();

  const [imgUrlState, setImgUrlState] = useState<string[]>([]);

  function convertFilesToBase64Array(files: any[]): Promise<string[]> {
    return new Promise((resolve) => {
      let base64Urls: string[] = [];
      for (const index in files) {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          base64Urls.push(reader.result as any);
          if (base64Urls.length === files.length) {
            resolve(base64Urls);
          }
        });
        reader.readAsDataURL(files[index]);
      }
    });
  }

  //// Index DB 읽어오기
  // 1. 컴포넌트 처음 렌더링시, indexDB 읽어오기 실행
  useEffect(() => {
    const result = getIdxedDBValue();
    return () => {
      setPreview((current) => []);
      setInnerpreviewAfterIdxDB((current) => []);
    };
  }, []);

  // 2. indexDB 읽어오기 완료될시, setPreview
  useEffect(() => {
    if (innerpreviewAfterIdxDB[0]) {
      setPreview((current) => innerpreviewAfterIdxDB);
    }
  }, [innerpreviewAfterIdxDB]);

  //// 파일 업로드시
  // 1. 파일 업로드가 일어났을때  File 객체를 URL로 전환 => setPreview
  const saveFileImage = async (event: any) => {
    const fileObjList = [...event.target.files];
    const base64UrlList = await convertFilesToBase64Array(fileObjList);

    setPreview((current) => {
      return [...current, ...base64UrlList];
    });
  };

  // 2. preview를 indexDB에 저장
  // TODO - clear 하고 다시 업로드가 아닌, 추가 업로드 하는것만 만지게
  useEffect(() => {
    if (preview[0]) {
      clearIdxedDBValue();
      writeIdxedDB(preview);
    } else {
      clearIdxedDBValue();
    }
  }, [preview]);

  // 3. imgUrlState 정의
  useEffect(() => {
    setImgUrlState((current) => {
      return [...googleLink, ...preview];
    });
  }, [googleLink, preview]);

  return (
    <S.Container>
      <S.NumberH1>{stat.status}/5</S.NumberH1>
      <NoticeTextWrapper style={NoticeTextWrapperStyle as any}>
        사진을 찍어
        <br /> 업로드 해주세요.
      </NoticeTextWrapper>
      {imgUrlState[0] ? (
        <S.CarouselWrapper>
          <ImgCarousel img_url={imgUrlState} />
          <ImgDelete img_url={imgUrlState} />
        </S.CarouselWrapper>
      ) : (
        <S.EmptyImage></S.EmptyImage>
      )}
      <S.ImageInput
        type="file"
        id="image"
        accept="image/*"
        multiple={true}
        onChange={saveFileImage}
        ref={imageInput as any}
      />
      <S.ButtonsWrapper>
        <S.UploadLabel htmlFor="image">업로드</S.UploadLabel>
        <WhitePill
          text={'이미지 지우기'}
          onClick={() => {
            setGoogleLink([]);
            setPreview([]);
            setReal(0);
          }}
        />
        <WhitePill
          text={'다음'}
          onClick={() => {
            if (preview.length + googleLinkCount) {
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
