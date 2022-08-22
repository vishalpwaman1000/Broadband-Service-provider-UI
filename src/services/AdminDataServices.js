const baseURL = "https://localhost:44339";
const axios = require("axios").default;

export const AdminDataServices = {
  UpdateAdminAddress,
  GetAdminAddress,
  AddProduct,
  UpdateProduct,
  GetAllProduct,
  DeleteProduct,
};

function UpdateAdminAddress(reqbody) {
  // debugger;
  const requestOptions = {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
    },
    body: JSON.stringify(reqbody),
  };
  return fetch(baseURL + `/api/Admin/UpdateAdminAddress`, requestOptions)
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}

function GetAdminAddress() {
  const requestOptions = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
    },
  };
  return fetch(
    baseURL +
      `/api/Admin/GetAdminAddress?UserID=${localStorage.getItem("AdminID")}`,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}

async function AddProduct(reqbody) {
  // debugger;
  const headers = {
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
    },
  };

  await axios
    .post(baseURL + "/api/Admin/AddProduct", reqbody, true && headers)
    .then((result) => {
      console.log("Result : ", result);
      return result;
    });
}

async function UpdateProduct(reqbody) {
  // debugger;
  const headers = {
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
    },
  };

  await axios
    .patch(baseURL + "/api/Admin/UpdateProduct", reqbody, true && headers)
    .then((result) => {
      console.log("Result : ", result);
      return result;
    });
}

function GetAllProduct(reqbody) {
  // debugger;
  const requestOptions = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
    },
    body: JSON.stringify(reqbody),
  };
  return fetch(baseURL + `/api/Admin/GetAllProduct`, requestOptions)
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}

function DeleteProduct(reqbody) {
  // debugger;
  const requestOptions = {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
    },
    body: JSON.stringify(reqbody),
  };
  return fetch(baseURL + `/api/Admin/DeleteProduct`, requestOptions)
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}
