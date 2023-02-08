import { useRecoilState } from 'recoil';
import {
  innerpreviewAfterIdxDBAtom,
  isGetIdxValueSuccessAtom,
} from '../../store/atoms';

export default function useGetIdxedDBValue() {
  const [isGetIdxValueSuccess, setIsGetIdxValueSuccess] = useRecoilState(
    isGetIdxValueSuccessAtom,
  );
  const [innerpreviewAfterIdxDB, setInnerpreviewAfterIdxDB] = useRecoilState(
    innerpreviewAfterIdxDBAtom,
  );
  function getIdxedDBValue() {
    const request = indexedDB.open('linksDB', 2);
    let db;
    request.onerror = (e) => alert('failed');

    request.onsuccess = (e) => {
      const db = request.result;
      const transaction = db.transaction(['links'], 'readwrite');
      transaction.oncomplete = (e) => {
        console.log('transaction success');
        setIsGetIdxValueSuccess((current) => !current);
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
  return getIdxedDBValue;
}
