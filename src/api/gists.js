import { request } from "./request";

export const getGistsApi = (page = 1) =>
  request.get(`/gists/public?page=${page}`);

export const searchGistsByNameApi = (name = "") =>
  request.get(`/users/${name}/gists`);
