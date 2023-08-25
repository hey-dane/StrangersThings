// Function to retrieve the token
export const getToken = () => {
  return sessionStorage.getItem("token") || null;
};

export const userLogin = (token) => {
  sessionStorage.setItem("token", token);
};

export const userLogout = () => {
  sessionStorage.removeItem("token");
};

export const isLoggedIn = () => {
  return getToken() !== null;
};

export const makeHeaders = () => {
  const headers = {
    "Content-Type": "application/json",
  };

  const tokenValue = getToken();

  if (tokenValue) {
    headers["Authorization"] = `Bearer ${tokenValue}`;
  }

  return headers;
};
