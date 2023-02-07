import { clear } from 'console';
import { useRecoilState } from 'recoil';
import {
  innerpreviewAfterIdxDBAtom,
  isGetIdxValueSuccessAtom,
} from '../../store/atoms';

export default function useClearIdxedDBValue() {
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
        console.log('cleared');
      };
    };
  }
  return clearIdxedDBValue;
}
