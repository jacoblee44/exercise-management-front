import axios from "axios";
const FileDownload = require("js-file-download");

const baseUrl = "http://localhost:8000";

export function addAuthHeader(header) {
  header = header || {};
  const auth = JSON.parse(localStorage.getItem("auth"));
  const token = auth && auth.access && auth.access.token;
  header.Authorization = token ? `Bearer ${token}` : undefined;
  return header;
}

export function get(url, params = {}) {
  console.log("get:" + url);
  return axios.get(baseUrl + url, { params: params, headers: addAuthHeader() });
}

export function post(url, data, headers = {}) {
  console.log("post:" + url);
  return axios.post(baseUrl + url, data, { headers: addAuthHeader(headers) });
}

export function download(url) {
  let header = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/octet-stream"
  };
  axios
    .get(baseUrl + "/api/download/" + url, {
      responseType: "blob",
      headers: addAuthHeader(header)
    })
    .then(response => {
      var filename = url.replace(/^.*[\\/]/, "");
      FileDownload(response.data, filename);
    });
}

export default { get, post };
