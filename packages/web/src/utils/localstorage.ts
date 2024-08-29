// WARNING: MUST BE CALLED IN A BROWSER ENVIRONMENT

const LOCALSTORAGE_SET_EVENT = "localstorage-set";

export const getLocalstorageItem = (key: string) => localStorage.getItem(key);

export const setLocalstorageItem = (key: string, value: string) => {
  localStorage.setItem(key, value);
  window.dispatchEvent(new Event(LOCALSTORAGE_SET_EVENT));
};

export const removeLocalstorageItem = (key: string) => {
  localStorage.removeItem(key);
  window.dispatchEvent(new Event(LOCALSTORAGE_SET_EVENT));
};

export const subscribeLocalstorageSet = (callback: () => void) => {
  window.addEventListener(LOCALSTORAGE_SET_EVENT, callback);
};

export const unsubscribeLocalstorageSet = (callback: () => void) => {
  window.removeEventListener(LOCALSTORAGE_SET_EVENT, callback);
};
