export default function writeIdxedDB(links: any) {
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
