const storage = window.localStorage;

export const set = (name, value) => {
  storage.setItem(name, JSON.stringify(value));
};

export const get = (name) => {
  const item = storage.getItem(name);
  return item ? JSON.parse(item) : [];
};

export const remove = (name) => {
  storage.removeItem(name);
};
