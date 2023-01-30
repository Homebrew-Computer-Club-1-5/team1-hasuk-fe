import * as S from './Photo.styled';
import { useState, useEffect } from 'react';
import ImgCarousel from '../../components/molecules/ImgCarousel';
import { realfile, status, tempfile } from './atoms';
import NoticeTextWrapper from '../../components/molecules/NoticeTextWrapper';
import { useRecoilState } from 'recoil';
import WhitePill from '../../components/molecules/WhitePill';

function Photo() {
  const [stat, setStat] = useRecoilState(status);
  const [tempimg, setTempimg] = useState<any[]>();
  const [real, setReal] = useRecoilState(realfile);

  const [filelink, setFileLink] = useRecoilState(tempfile);
  const [preview, setPreview] = useState<string[]>();

  const inputStyle = {
    display: 'none',
  };
  const labelStyle = {
    padding: '0px 10px',
    zIndex: 6,
    minWidth: '85px',
    fontSize: '17px',
    fontWeight: 600,
    border: '1px solid black',
    height: '35px',
    backgroundColor: 'white',
    borderRadius: '20px',
  };
  const saveFileImage = (e: any) => {
    console.log(e.target.files, '원본');
    var rawList = [];
    for (const i in e.target.files) {
      if (Number(i) >= 0) {
        rawList[Number(i)] = e.target.files[i];
      }
    }

    setTempimg(rawList);
    setReal(e.target.files);
  };
  const fileURLChanger = (e: any) => {
    var list = [];
    for (const i in e) {
      list[Number(i)] = URL.createObjectURL(e[i]);
    }
    return list;
  };

  useEffect(() => {
    if (tempimg) {
      setPreview(fileURLChanger(tempimg));
      setFileLink(tempimg);
    } else {
      setPreview(fileURLChanger(filelink));
    }
  }, [tempimg]);

  return (
    <S.Wrapper>
      <h1>{stat.status}/5</h1>
      <NoticeTextWrapper>사진을 찍어 업로드 해주세요</NoticeTextWrapper>
      {preview ? <ImgCarousel img_url={preview} /> : null}
      <input
        style={inputStyle}
        type="file"
        id="image"
        accept="img/*"
        multiple={true}
        onChange={saveFileImage}
      />
      <label style={labelStyle} htmlFor="image">
        업로드
      </label>
      <WhitePill
        text={'다음'}
        onClickNavigator={() => {
          setStat({ status: 6 });
        }}
      />
    </S.Wrapper>
  );
}

export default Photo;
