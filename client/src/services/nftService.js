import http from "./httpService";
import { apiUrl } from "../config.json";

export function fetchNft(tokenUri) {
  return http.get(`${apiUrl}${tokenUri}`);
}


