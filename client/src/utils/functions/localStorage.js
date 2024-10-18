

export const getLSItem = (key,isParse,useSession) => {
    let result = localStorage.getItem(key)

    if(useSession && sessionStorage.getItem(key))
      result = sessionStorage.getItem(key);
    if(isParse) {
        return result ? JSON.parse(result) : null
    } else {
        return result;
    }
}

export const setLSItem = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};
export const setSessionItem = (key, data) => {
  sessionStorage.setItem(key, JSON.stringify(data));
};

export const removeLSItem = (key) => localStorage.removeItem(key)
export const removeSessionItem = (key) => sessionStorage.removeItem(key);