import initialize from "./initialize"

const db = (async () => initialize())()

export const getAllDocs = async (store) => {
  return new Promise((resolve, reject) => {
    db
    .then((connection) => {
      const storeInstance = connection
      .transaction(store, 'readonly')
      .objectStore(store)

      const request = storeInstance.getAll();
      request.onsuccess = () => {
        resolve(request.result)
      }
      request.onerror = (error) => {
        reject(error)
      }
    })
    .catch((error) => {
      reject(error)
    })
  })
}

export const saveDoc = async (store, data) => {
  return new Promise((resolve, reject) => {
    db
    .then((connection) => {
      const storeInstance = connection
      .transaction(store, 'readwrite')
      .objectStore(store)

      const request = storeInstance.add(data);
      request.onsuccess = () => {
        resolve(request.result)
      }
      request.onerror = (error) => {
        reject(error)
      }
    })
    .catch((error) => {
      reject(error)
    })
  })
}

export const updateDoc = async (store, data) => {
  return new Promise((resolve, reject) => {
    db
    .then((connection) => {
      const storeInstance = connection
      .transaction(store, 'readwrite')
      .objectStore(store)

      const request = storeInstance.put(data);
      request.onsuccess = () => {
        resolve(request.result)
      }
      request.onerror = (error) => {
        reject(error)
      }
    })
    .catch((error) => {
      reject(error)
    })
  })
}

export const deleteDoc = async (store, key) => {
  return new Promise((resolve, reject) => {
    db
    .then((connection) => {
      const storeInstance = connection
      .transaction(store, 'readwrite')
      .objectStore(store)

      const request = storeInstance.delete(key);
      request.onsuccess = () => {
        if(store === 'project') deleteProjectData(key)
        
        resolve(request.result)
      }
      request.onerror = (error) => {
        reject(error)
      }
    })
    .catch((error) => {
      reject(error)
    })
  })
}

export const deleteProjectData = async (projectId) => {
  return new Promise((resolve, reject) => {
    db
    .then((connection) => {
      ['msa', 'sow', 'timesheet', 'invoice'].forEach((store) => {
        const storeInstance = connection
          .transaction(store, 'readwrite')
          .objectStore(store)
  
          storeInstance.openCursor().onsuccess = (event) => {
          const cursor = event.target.result;
          if (cursor) {
            if (cursor.value.projectId === projectId) {
              cursor.delete();
            }
            cursor.continue();
          }
        };
      })
      resolve(1)
    })
    .catch((error) => {
      reject(error)
    })
  })
}
