import axios from "axios";

export const BASEURL = "http://159.65.154.37/";

export const LOGIN_URL = BASEURL.concat("api/auth/login");
export const REGISTER_URL = BASEURL.concat("api/auth/signup");
export const SEND_OTP_URL = BASEURL.concat("api/auth/forgot-password/otp_new");
export const VERIFY_OTP_URL = BASEURL.concat("api/auth/OTP_verify_new");
export const RESET_PASSWORD_URL = BASEURL.concat("api/auth/reset-password/new");
export const GET_POST_URL = BASEURL.concat("api/allpost?page=");
export const CREATE_POST_URL = BASEURL.concat("api/admin/savepost");

export function login(data) {
  return axios.post(LOGIN_URL, data);
}

export function signup(data) {
  return axios.post(REGISTER_URL, data);
}

export function sendOtp(data) {
  return axios.post(SEND_OTP_URL, data);
}

export function verifyOtp(data) {
  return axios.post(VERIFY_OTP_URL, data);
}

export function resetPassword(data) {
  return axios.post(RESET_PASSWORD_URL, data);
}

export function createPost(data, access) {
  return axios.post(CREATE_POST_URL, data, { headers: { Authorization: 'Bearer '.concat(access)}});
}

export function getLocation() {
  return axios.get('https://extreme-ip-lookup.com/json/');
}

export function getPost(page, access){
  return axios.get(GET_POST_URL+page,{ headers: { Authorization: 'Bearer '.concat(access) } } );
}