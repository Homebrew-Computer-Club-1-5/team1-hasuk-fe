export default function deleteIdxedDBValue(index: any) {
  let keyList: any[] = [];
  const request = indexedDB.open('linksDB', 2);
  let db;
  let DbSize: any;
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
    const requestCursor = objStore.openCursor();
    const countRequest = objStore.count();
    requestCursor.onsuccess = (e: any) => {
      const cursor = e.target.result;
      if (cursor) {
        keyList.push(cursor.key);
        cursor.continue();
      }

      countRequest.onsuccess = () => {
        DbSize = countRequest.result;
      };
      if (keyList.length === DbSize) {
        const deleteRequest = objStore.delete(keyList[index]);
        deleteRequest.onsuccess = () => {};
      }
    };
  };
  request.onupgradeneeded = (e: any) => {
    db = e.target.result;
    db.createObjectStore('links', {
      autoIncrement: true,
    });
  };
}
