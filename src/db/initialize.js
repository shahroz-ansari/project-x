const version = 1

export default async function initialize() {
  return new Promise((resolve, reject) => {
    const instance = window.indexedDB.open('xdb', version);
      instance.onsuccess = (ev) => {
        console.log('DB: connected: 1 version:', version);
        resolve(instance.result);
      };
      instance.onupgradeneeded = (event) => {
        const connection = instance.result;

        console.log('DB: Upgrading, oldVersion:', connection.oldVersion)

        if(!connection.oldVersion || connection.oldVersion < 1 ) {
          const options = {
            "keyPath": "id",
            "autoIncrement": true
          }
          connection.createObjectStore('project', options);
          connection.createObjectStore('msa', options);
          connection.createObjectStore('sow', options);
          connection.createObjectStore('timesheet', options);
          connection.createObjectStore('invoice', options);
        }
      };
      instance.onerror = (e) => {
        console.log('DB: connected: 0');
        reject(e);
      };
    });
}