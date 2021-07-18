export const getAccessToken = () => localStorage.getItem("token");
export const getUserId = () => localStorage.getItem("id");
export const setAccessToken = token => localStorage.setItem("token", token);
export const setUserId = id => localStorage.setItem("id", id);
export const removeStorage = () => localStorage.clear();