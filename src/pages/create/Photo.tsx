import * as S from './Photo.styled';
import { useState, useEffect, useRef } from 'react';
import ImgCarousel from '../../components/molecules/ImgCarousel';
import {
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
  const [fileSize, setFileSize] = useState(0);
  const [preview, setPreview] = useRecoilState(previewAtom);
  const [googleLinkCount, setGoogleLinkCount] =
    useRecoilState(googleLinkCountAtom);
  const [innerpreviewAfterIdxDB, setInnerpreviewAfterIdxDB] = useRecoilState(
    innerpreviewAfterIdxDBAtom,
  );
  const [googleLink, setGoogleLink] = useRecoilState(googleLinkAtom);
  const [googleFileSize, setGoogleFileSize] = useState(0);
  const [previewFileSize, setPreviewFileSize] = useState(0);
  const [imgUrlState, setImgUrlState] = useState<string[]>([]);
  const clearIdxedDBValue = useClearIdxedDBValue();
  const getIdxedDBValue = useGetIdxedDBValue();

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

  async function getFileSizeFromGoogle(urls: string[]) {
    setGoogleFileSize(0);

    for (let index in urls) {
      const url = urls[index];
      const fileObj = await fetch(url)
        .then((r) => r.blob())
        .then((blobFile) => new File([blobFile], url, { type: blobFile.type }))
        .then((converted) => converted);
      setGoogleFileSize((current) => current + fileObj.size);
    }
  }

  const saveFileImage = async (event: any) => {
    const fileObjList = [...event.target.files];
    const base64UrlList = await convertFilesToBase64Array(fileObjList);
    const sumList = [...preview, ...base64UrlList];
    let size = 0;
    sumList.map((url) => {
      size += url.length / 1.33;
    });
    console.log(size);

    if (size > 30000000) {
      alert('30MB 이하의 파일만 업로드할 수 있습니다.');
    } else {
      setPreview((current) => {
        return [...current, ...base64UrlList];
      });
      writeIdxedDB(base64UrlList);
    }
  };

  useEffect(() => {
    const result = getIdxedDBValue();
    return () => {
      setPreview((current) => []);
      setInnerpreviewAfterIdxDB((current) => []);
    };
  }, []);

  useEffect(() => {
    if (innerpreviewAfterIdxDB[0]) {
      setPreview((current) => innerpreviewAfterIdxDB);
    }
  }, [innerpreviewAfterIdxDB]);

  useEffect(() => {
    //if (preview[0]) {
    //  clearIdxedDBValue();
    //  writeIdxedDB(preview);
    //} else {
    //  clearIdxedDBValue();
    //}
    setPreviewFileSize(0);
    preview.map((link) => {
      setPreviewFileSize((current) => current + link.length / 1.33);
    });
  }, [preview]);

  useEffect(() => {
    getFileSizeFromGoogle(googleLink);
    setImgUrlState((current) => {
      return [...googleLink, ...preview];
    });
  }, [googleLink, preview]);

  useEffect(() => {
    setFileSize(googleFileSize + previewFileSize);
  }, [googleFileSize, previewFileSize]);

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
            setGoogleFileSize(0);
            clearIdxedDBValue();
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
      <div>{Math.round(fileSize / 1000) / 1000}MB/30MB</div>
    </S.Container>
  );
}

export default Photo;
