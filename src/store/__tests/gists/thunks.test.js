import {
  getGists,
  getGistsStart,
  getGistsSuccess,
  getGistsError,
} from "../../gists";

describe("get gists thunk", () => {
  it("get gists success", async () => {
    const PAGE = 2;

    const dispatch = jest.fn();
    const getGistsApi = jest.fn().mockResolvedValue({ data: "ok" });

    const thunk = getGists(PAGE);

    await thunk(dispatch, null, { getGistsApi });

    expect(getGistsApi).toBeCalledWith(PAGE);
    expect(getGistsApi).toBeCalledTimes(1);

    expect(dispatch).toBeCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, getGistsStart());
    expect(dispatch).toHaveBeenNthCalledWith(2, getGistsSuccess("ok"));
  });

  it("get gists error", async () => {
    const PAGE = 12;
    const ERROR = { error: "ok" };

    const dispatch = jest.fn();
    const getGistsApi = jest.fn().mockRejectedValue(ERROR);

    const thunk = getGists(PAGE);

    await thunk(dispatch, null, { getGistsApi });

    expect(getGistsApi).toBeCalledWith(PAGE);
    expect(getGistsApi).toBeCalledTimes(1);

    expect(dispatch).toBeCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, getGistsStart());
    expect(dispatch).toHaveBeenNthCalledWith(2, getGistsError(ERROR));
  });
});
