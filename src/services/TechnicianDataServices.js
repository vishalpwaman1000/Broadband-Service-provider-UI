const baseURL = "https://localhost:44339";

export const TechnicianDataServices = {
  UpdateTechnicianAddress,
  GetTechnicianAddress,
};

function UpdateTechnicianAddress(reqbody) {
  // debugger;
  const requestOptions = {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      Authorization: `Bearer ${localStorage.getItem("TechnicianToken")}`,
    },
    body: JSON.stringify(reqbody),
  };
  return fetch(baseURL + `/api/Technician/UpdateTechnicianAddress`, requestOptions)
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}

function GetTechnicianAddress() {
  const requestOptions = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      Authorization: `Bearer ${localStorage.getItem("TechnicianToken")}`,
    },
  };
  return fetch(
    baseURL +
      `/api/Technician/GetTechnicianAddress?UserID=${localStorage.getItem(
        "TechnicianID"
      )}`,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}
