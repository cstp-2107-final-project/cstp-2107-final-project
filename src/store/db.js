const KEY = "petClinicDB";

export const loadDB = () => {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : null;
};

export const saveDB = (db) => {
  localStorage.setItem(KEY, JSON.stringify(db));
};

export const initDB = (seed) => {
  if (!loadDB()) {
    localStorage.setItem(KEY, JSON.stringify(seed));
  }
};
