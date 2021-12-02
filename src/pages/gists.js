import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGists, gistSelector, searchGistsByUserName } from "../store/gists";

const buttons = Array.from({ length: 10 }).map((_, index) => index + 1);

export function Gists() {
  const {
    gists,
    gistsLoading,
    gistsError,
    gistsSearch,
    gistsLoadingSearch,
    gistsErrorSearch,
  } = useSelector(gistSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGists());
    // @TODO lodash.debounce для поиска
    dispatch(searchGistsByUserName("bogdanq"));
  }, [dispatch]);

  if (gistsError) {
    return <h1>gistsError</h1>;
  }

  if (gistsErrorSearch) {
    return <h1>gistsErrorSearch</h1>;
  }

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

        <input placeholder="enter name..." />

        {gistsLoadingSearch ? (
          <h1>Loading</h1>
        ) : (
          gistsSearch.map((gist, index) => <p key={index}>{gist.url}</p>)
        )}
      </div>
    </div>
  );
}
