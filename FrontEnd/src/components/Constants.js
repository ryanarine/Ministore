// URLs
export const homeUrl = "http://localhost:3000/";
export const baseUrl = "http://localhost:8080/";
// Hidden Message Styles
export const errColor = "darkorange";
export const successColor = "deepskyblue";
export const msgWeight = 500;
// User Privledges
export const MASTER = 0;
export const STAFF = 1;
export const CUSTOMER = 2;
export const PrivledgeMap = ["Master", "Staff", "Customer"];
// Functions
export function getCrenditals() {
  let username = sessionStorage.getItem("username");
  let hash = sessionStorage.getItem("hash");
  return [username, hash];
}
export function setCrenditals() {
  let username = sessionStorage.getItem("username");
  let hash = sessionStorage.getItem("hash");
  const params = new URLSearchParams();
  params.append("username", username);
  params.append("hash", hash);
  return params;
}
export function notAuthorized() {
  alert("You are not authorized to perform this action. ");
  window.location = homeUrl + "login";
}
