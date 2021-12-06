import { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { useDispatch, useSelector } from "react-redux";
import { getGists, gistSelector, searchGistsByUserName } from "../store/gists";

const buttons = Array.from({ length: 10 }).map((_, index) => index + 1);

const searchGistsByUserNameDebounsed = debounce((query, dispatch) => {
  dispatch(searchGistsByUserName(query ?? "bogdanq"));
}, 500);

export function Gists() {
  const [value, setValue] = useState("");

  const {
    gists,
    gistsLoading,
    gistsError,
    gistsSearch,
    gistsLoadingSearch,
    gistsErrorSearch,
  } = useSelector(gistSelector);
  const dispatch = useDispatch();

  // const searchGistsByUserNameDebounsed = useMemo(() => {
  //   return debounce((query) => {
  //     dispatch(searchGistsByUserName(query ?? "bogdanq"));
  //   }, 500);
  // }, [dispatch]);

  useEffect(() => {
    dispatch(getGists());
  }, [dispatch]);

  useEffect(() => {
    searchGistsByUserNameDebounsed(value, dispatch);
  }, [value, dispatch]);

  // if (gistsError) {
  //   return <h1>gistsError</h1>;
  // }

  // if (gistsErrorSearch) {
  //   return <h1>gistsErrorSearch</h1>;
  // }

  return (
    <div style={{ display: "flex" }}>
      <div>
        <h1>Gists</h1>
        {buttons.map((button, index) => (
          <button onClick={() => dispatch(getGists(button))} key={index}>
            {button}
          </button>
        ))}
        {gistsLoading ? (
          <h1>Loading</h1>
        ) : (
          gists.map((gist, index) => <p key={index}>{gist.url}</p>)
        )}
      </div>

      <div>
        <h1>Search Gists</h1>

        <input
          placeholder="enter name..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        {gistsLoadingSearch ? (
          <h1>Loading</h1>
        ) : (
          gistsSearch.map((gist, index) => <p key={index}>{gist.url}</p>)
        )}
      </div>
    </div>
  );
}
