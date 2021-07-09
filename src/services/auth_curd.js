import axios from "axios";

export const BASEURL = "http://159.65.154.37/";

export const LOGIN_URL = BASEURL.concat("api/auth/login");
export const REGISTER_URL = BASEURL.concat("api/auth/signup");
export const SEND_OTP_URL = BASEURL.concat("api/auth/forgot-password/otp_new");
export const VERIFY_OTP_URL = BASEURL.concat("api/auth/OTP_verify_new");
export const RESET_PASSWORD_URL = BASEURL.concat("api/auth/reset-password/new");
export const GET_POST_URL = BASEURL.concat("api/allpost?page=");
export const CREATE_POST_URL = BASEURL.concat("api/admin/savepost");
export const GET_SPORTS_URL = BASEURL.concat("api/sports");
export const GET_LEAGUES_URL = BASEURL.concat("api/leagues/");
export const GET_MATCHES_URL = BASEURL.concat("api/matches/");
export const GET_ODDS_URL = BASEURL.concat("api/matche/odds/");
export const CREATE_BET_URL = BASEURL.concat("api/admin/bet/create");
export const GET_BETSLIPS_URL = BASEURL.concat("api/admin/bet-slips");

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

export function getSports(){
  return axios.get(GET_SPORTS_URL);
}

export function getLeages(sport_id){
  console.log(GET_LEAGUES_URL + sport_id)
  return axios.get(GET_LEAGUES_URL + sport_id);
}

export function getMatches(league_id){
  console.log(GET_MATCHES_URL + league_id)
  return axios.get(GET_MATCHES_URL + league_id);
}

export function getOdds(match_id){
  console.log(GET_ODDS_URL + match_id)
  return axios.get(GET_ODDS_URL + match_id);
}

export function createBet(data, access) {
  return axios.post(CREATE_BET_URL, data, { headers: { Authorization: 'Bearer '.concat(access)}});
}

export function getBetslips(access){
  return axios.get(GET_BETSLIPS_URL,{ headers: { Authorization: 'Bearer '.concat(access)}});
}