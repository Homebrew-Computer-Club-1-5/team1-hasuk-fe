import * as S from './Photo.styled';
import { useState, useEffect, useRef } from 'react';
import ImgCarousel from '../../components/molecules/ImgCarousel';
import { previewAtom, realfile, status, tempfile } from './atoms';
import NoticeTextWrapper from '../../components/molecules/NoticeTextWrapper';
import { useRecoilState } from 'recoil';
import WhitePill from '../../components/molecules/WhitePill';

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
function Photo() {
  const imageInput = useRef();
  const [stat, setStat] = useRecoilState(status);
  // 다음버튼과만 관련있음
  const [real, setReal] = useRecoilState(realfile);
  // 그냥 원본 파일이 들어감
  const [innerreal, setInnerReal] = useState([]);
  // 안쪽에서 real 처리함

  const [preview, setPreview] = useRecoilState(previewAtom);
  const [innerpreview, setInnerPreview] = useState([]);
  // tempimg를 url로 바꾼 정보들을 저장하는 곳

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

  const saveFileImage = (e: any) => {
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

    setInnerReal(rawList as any);
  };
  function writeIdxedDB(links: any) {
    const request = indexedDB.open('linksDB', 2);
    let db;
    request.onerror = (e) => alert('failed');
    request.onsuccess = (e) => {
      const db = request.result;
      const transaction = db.transaction(['links'], 'readwrite');
      transaction.oncomplete = (e) => {
        console.log('transaction success');
      };
      transaction.onerror = (e) => {
        console.log('transaction fail');
      };
      const objStore = transaction.objectStore('links');
      for (const link of links) {
        const request = objStore.add(link);
        request.onsuccess = (e: any) => console.log(e.target.result);
      }
    };

    request.onupgradeneeded = (e: any) => {
      db = e.target.result;
      db.createObjectStore('links', { autoIncrement: true });
    };
  }
  function getIdxedDBValue() {
    const request = indexedDB.open('linksDB', 2);
    let db;
    request.onerror = (e) => alert('failed');
    request.onsuccess = (e) => {
      const db = request.result;
      const transaction = db.transaction(['links'], 'readwrite');
      transaction.oncomplete = (e) => {
        console.log('transaction success');
      };
      transaction.onerror = (e) => {
        console.log('transaction fail');
      };
      const objStore = transaction.objectStore('links');
      const cursorRequest = objStore.openCursor();
      cursorRequest.onsuccess = (e: any) => {
        let cursor = e.target.result;
        if (cursor) {
          const value = objStore.get(cursor.key);
          value.onsuccess = (e: any) => {
            return e.target.value;
          };
        }
        cursor.continue();
      };
    };

    request.onupgradeneeded = (e: any) => {
      db = e.target.result;
      db.createObjectStore('links', { autoIncrement: true });
    };
  }

  useEffect(() => {
    setReal(innerreal ? innerreal : real);
    setPreview(innerpreview ? innerpreview : preview);
    if (innerreal.length === innerpreview.length) {
      writeIdxedDB(innerpreview);
      console.log(getIdxedDBValue());
    }
  }, [innerreal, innerpreview]);

  return (
    <S.Wrapper>
      <h1>{stat.status}/5</h1>
      <NoticeTextWrapper style={NoticeTextWrapperStyle as any}>
        사진을 찍어
        <br /> 업로드 해주세요.
      </NoticeTextWrapper>
      {preview.length === real.length ? (
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
            setPreview([]);
            setReal(['', '']);
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
