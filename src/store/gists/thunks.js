import {
  getGistsStart,
  getGistsSuccess,
  getGistsError,
  searchGistsStart,
  searchGistsSuccess,
  searchGistsError,
} from "./actions";

export const getGists =
  (page = 1) =>
  async (dispatch, _, api) => {
    try {
      dispatch(getGistsStart());

      const { data } = await api.getGistsApi(page);

      dispatch(getGistsSuccess(data));
    } catch (e) {
      dispatch(getGistsError(e));
    }
  };

export const searchGistsByUserName =
  (name = "") =>
  async (dispatch, _, api) => {
    try {
      dispatch(searchGistsStart());

      const { data } = await api.searchGistsByNameApi(name);

      dispatch(searchGistsSuccess(data));
    } catch (e) {
      dispatch(searchGistsError(e));
    }
  };
