/*
 * A Simple Encryption for browser using "npm install simple-encryptor --save"
 * */
export const isUserLoggedIn = () => {
    const token = getFromLocalStorage('token');
    const user = getFromLocalStorage('user');
    const name = getFromLocalStorage('name');
    if ((token === null || !token) && (!user || user === null)) {
        return false;
    }
   else  if((!name || name === null)){
        return false;
    }
    return true;
};

export const addToLocalStorage = (key, value) => {
    if (typeof value !== 'string') value = JSON.stringify(value);
    try {
        return localStorage.setItem(key, value);
    } catch (err) {
        console.log(err);
    }
};

export const getFromLocalStorage = (key) => {
    try {
        return localStorage.getItem(key);
    } catch (e) {
        return null;
    }
};

export const removeFromLocalStorage = (key) => {
    localStorage.removeItem(key);
};

export const emptyLocalStorage = () => {
    return localStorage.clear();
};

// Session Storage Helpers
export const addToSessionStorage = (key, value) => {
    if (typeof value !== 'string') value = JSON.stringify(value);
    try {
        return sessionStorage.setItem(key, value);
    } catch (err) {
        console.log(err);
    }
};

export const getFromSessionStorage = (key) => {
    try {
        return sessionStorage.getItem(key);
    } catch (e) {
        return null;
    }
};

export const removeFromSessionStorage = (key) => {
    return sessionStorage.removeItem(key);
};

export const emptySessionStorage = () => {
    sessionStorage.clear();
};
