import * as S from './Photo.styled';
import { useState, useEffect, useRef } from 'react';
import ImgCarousel from '../../components/molecules/ImgCarousel';
import {
  isIndexDBSuccessAtom,
  previewAtom,
  countfileAtom,
  status,
  tempfile,
} from './atoms';
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
  const [real, setReal] = useRecoilState(countfileAtom);
  // 그냥 원본 파일이 들어감
  const [innerreal, setInnerReal] = useState<number>(0);
  // 안쪽에서 real 처리함

  const [preview, setPreview] = useRecoilState(previewAtom);
  const [innerpreview, setInnerPreview] = useState<String[]>(['']);
  const [isIndexDBSuccess, setIsIndexDBSuccess] =
    useRecoilState(isIndexDBSuccessAtom);
  const [isGetIdxValueSuccess, setIsGetIdxValueSuccess] =
    useState<boolean>(false);
  const [innerpreviewAfterIdxDB, setInnerpreviewAfterIdxDB] = useState<
    String[]
  >([]);
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
    boxShadow: '0px 5px lightgray',
  };

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
  function writeIdxedDB(links: any) {
    const request = indexedDB.open('linksDB', 2);
    let db;
    request.onerror = (e) => alert('failed');
    request.onsuccess = (e) => {
      const db = request.result;
      const transaction = db.transaction(['links'], 'readwrite');
      transaction.oncomplete = (e) => {
        setIsIndexDBSuccess((current) => !current);
        // console.log('transaction success');
      };
      transaction.onerror = (e) => {
        // console.log('transaction fail');
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
  function clearIdxedDBValue() {
    const request = window.indexedDB.open('linksDB', 2); // 1. db 열기
    request.onerror = (e: any) => console.log(e.target.errorCode);

    request.onsuccess = (e) => {
      const db = request.result;
      const transaction = db.transaction(['links'], 'readwrite');
      transaction.onerror = (e) => console.log('fail');
      transaction.oncomplete = (e) => console.log('success');

      const objStore = transaction.objectStore('links'); // 2. name 저장소 접근
      const objStoreRequest = objStore.clear(); // 3. 전체 삭제
      objStoreRequest.onsuccess = (e) => {
        // console.log('cleared');
      };
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
        // console.log('transaction success');
        setIsGetIdxValueSuccess((current) => !current);
      };
      transaction.onerror = (e) => {
        // console.log('transaction fail');
      };
      const objStore = transaction.objectStore('links');
      const cursorRequest = objStore.openCursor();
      cursorRequest.onsuccess = (e: any) => {
        let cursor = e.target.result;
        if (cursor) {
          const value = objStore.get(cursor.key);
          value.onsuccess = (e: any) => {
            setInnerpreviewAfterIdxDB((current) => [
              ...current,
              e.target.result,
            ]);
          };

          cursor.continue();
        }
      };
    };

    request.onupgradeneeded = (e: any) => {
      db = e.target.result;
      db.createObjectStore('links', { autoIncrement: true });
    };
  }

  useEffect(() => {
    if (Number(innerreal) === innerpreview.length) {
      writeIdxedDB(innerpreview);
    }
  }, [innerpreview]);

  useEffect(() => {
    setPreview(
      innerpreview.length === innerreal
        ? innerpreview
        : (innerpreviewAfterIdxDB as any),
    );
    setReal(innerreal ? innerreal : innerpreviewAfterIdxDB.length);
    // console.log(innerpreviewAfterIdxDB.length);
  }, [innerreal, innerpreview, isGetIdxValueSuccess]);

  useEffect(() => {
    // console.log(preview, '불러왔을때 preview값');
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
        accept="image/*"
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
