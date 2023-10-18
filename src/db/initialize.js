const version = 2

export default async function initialize() {
  return new Promise((resolve, reject) => {
    const instance = window.indexedDB.open('xdb', version);
      instance.onsuccess = (ev) => {
        console.log('DB: connected: 1 version:', version);
        resolve(instance.result);
      };
      instance.onupgradeneeded = (event) => {
        const connection = instance.result;
        const oldVersion = event.oldVersion;
        // const newVersion = event.newVersion;
        console.log('DB: Upgrading, oldVersion:', event.oldVersion)

        if(!oldVersion || oldVersion < 1 ) {
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
        if(oldVersion === 1) {
          // fixing id datatype issue for existing users
          setTimeout(() => {
            ['msa', 'sow', 'timesheet', 'invoice'].forEach((store) => {
              const storeInstance = connection
                .transaction(store, 'readwrite')
                .objectStore(store)
        
                storeInstance.openCursor().onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                  if (typeof cursor.value.projectId === 'string') {
                    const data = cursor.value
                    data.projectId = parseInt(data.projectId)
                    cursor.update(data);
                  }
                  cursor.continue();
                }
              };
            })
          }, 1000)
        }
      };
      instance.onerror = (e) => {
        console.log('DB: connected: 0');
        reject(e);
      };
    });
}