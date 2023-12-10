import { openDB } from 'idb';

const DB_NAME = 'jate';
const DB_VERSION = 1;
const STORE_NAME = 'jate_store';

const initdb = async () => {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        console.log('jate database created');
      } else {
        console.log('jate database already exists');
      }
    },
  });
  return db;
};

export const putDb = async (content) => {
  const db = await initdb();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  await store.put(content);
  await tx.done;
};

export const getDb = async (id) => {
  const db = await initdb();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  const request = store.get(id);
  const result = await request;
  return result;
};

export const getAllDb = async () => {
  const db = await initdb();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  const request = store.getAll();
  const result = await request;
  return result;
};

export const deleteDb = async (id) => {
  const db = await initdb();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  const request = store.delete(id);
  const result = await request;
  return result;
};
