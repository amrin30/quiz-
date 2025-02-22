
export const openDB = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("QuizDB", 1);
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("quizHistory")) {
          db.createObjectStore("quizHistory", { keyPath: "id", autoIncrement: true });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  };
  
  export const saveQuizHistory = async (score) => {
    return new Promise(async (resolve, reject) => {
      const db = await openDB();
      const tx = db.transaction("quizHistory", "readwrite");
      const store = tx.objectStore("quizHistory");
      const request = store.add({ score, date: new Date().toISOString() });
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  };
  
  export const getQuizHistory = async () => {
    const db = await openDB();
    const tx = db.transaction("quizHistory", "readonly");
    const store = tx.objectStore("quizHistory");
    return new Promise((resolve) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result.reverse());
    });
  };
  

  export const clearQuizHistory = async () => {
    try {
      const db = await openDB(); 
      const tx = db.transaction("quizHistory", "readwrite"); 
      const store = tx.objectStore("quizHistory"); 
      await store.clear(); 
      await tx.done; 
      console.log("Quiz history cleared successfully");
    } catch (error) {
      console.error("Failed to clear quiz history:", error);
    }
  };
  