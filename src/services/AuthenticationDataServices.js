const baseURL = "https://localhost:44339";

export const AuthenticationDataServices = {
  SignIn,
  SignUp,
};

function SignIn(reqbody) {
  // debugger;
  const requestOptions = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
    },
    body: JSON.stringify(reqbody),
  };
  return fetch(baseURL + `/api/Authentication/SignIn`, requestOptions)
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}

function SignUp(reqbody) {
  const requestOptions = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
    },
    body: JSON.stringify(reqbody),
  };
  return fetch(baseURL + `/api/Authentication/SignUp`, requestOptions)
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}
