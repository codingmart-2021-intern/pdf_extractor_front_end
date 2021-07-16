export const getAccessToken = () => localStorage.getItem("token");
export const setAccessToken = token => localStorage.setItem("token", token);