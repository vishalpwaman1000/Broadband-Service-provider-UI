const baseURL = "https://localhost:44339";

export const CustomerDataServices = {
  UpdateCustomerAddress,
  GetCustomerAddress,
  GetAllPackages,
  CreateTicket,
  GetTicketHistory,
  PurchaseProduct,
  GetPurchaseProduct
};

function UpdateCustomerAddress(reqbody) {
  // debugger;
  const requestOptions = {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      Authorization: `Bearer ${localStorage.getItem("CustomerToken")}`,
    },
    body: JSON.stringify(reqbody),
  };
  return fetch(baseURL + `/api/Customer/UpdateCustomerAddress`, requestOptions)
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}

function GetCustomerAddress() {
  const requestOptions = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      Authorization: `Bearer ${localStorage.getItem("CustomerToken")}`,
    },
  };
  return fetch(
    baseURL +
      `/api/Customer/GetCustomerAddress?UserID=${localStorage.getItem(
        "CustomerID"
      )}`,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}

function GetAllPackages(reqbody) {
  const requestOptions = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      Authorization: `Bearer ${localStorage.getItem("CustomerToken")}`,
    },
    body: JSON.stringify(reqbody),
  };
  return fetch(baseURL + `/api/Admin/GetAllProduct`, requestOptions)
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}

function CreateTicket(reqbody) {
  const requestOptions = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      Authorization: `Bearer ${localStorage.getItem("CustomerToken")}`,
    },
    body: JSON.stringify(reqbody),
  };
  return fetch(baseURL + `/api/Customer/CreateTicket`, requestOptions)
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}

function GetTicketHistory(reqbody) {
  const requestOptions = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      Authorization: `Bearer ${localStorage.getItem("CustomerToken")}`,
    },
    body: JSON.stringify(reqbody),
  };
  return fetch(baseURL + `/api/Customer/GetTicketHistory`, requestOptions)
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}

function PurchaseProduct(reqbody) {
  const requestOptions = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      Authorization: `Bearer ${localStorage.getItem("CustomerToken")}`,
    },
    body: JSON.stringify(reqbody),
  };
  return fetch(baseURL + `/api/Customer/PurchaseProduct`, requestOptions)
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}

function GetPurchaseProduct(reqbody) {
  const requestOptions = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      Authorization: `Bearer ${localStorage.getItem("CustomerToken")}`,
    },
    body: JSON.stringify(reqbody),
  };
  return fetch(baseURL + `/api/Customer/GetPurchaseProduct`, requestOptions)
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}