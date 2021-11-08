import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const age = 12;

const films = [
  { title: "film1", year: 2020 },
  { title: "film2", year: 2020 },
];

// const ReactElement = (
//   <div>
//     <h1>Hello React</h1>
//     <h1>Age: {age}</h1>
//     <h1>Films</h1>
//     <div>
//       {films.map((film) => (
//         <div>
//           <div>title: {film.title}</div>
//           <div>year: {film.year}</div>
//           <hr />
//         </div>
//       ))}
//     </div>
//   </div>
// );

const FilmsList = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>

      <div>
        {films.map((film) => (
          <div>
            <div>title: {film.title}</div>
            <div>year: {film.year}</div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

const FunctionComponent = ({ test4 }) => {
  return (
    <div onClick={test4}>
      <h1>Hello FunctionComponent</h1>
      <h1>Age: {age}</h1>

      <FilmsList title="films from functions" />
    </div>
  );
};

class ClassComponent extends React.Component {
  render() {
    const { test4 } = this.props;

    return (
      <div onClick={test4}>
        <h1>Hello ClassComponent</h1>
        <h1>Age: {age}</h1>

        <FilmsList title="films from class" />
      </div>
    );
  }
}

const App = ({ subTitle, ...rest }) => {
  return (
    <div>
      <h1>subTitle: {subTitle}</h1>

      <FunctionComponent {...rest} />
      <ClassComponent {...rest} />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App
      subTitle="Test sub title"
      test1={100}
      test2={{ id: "test2" }}
      tes3={[1, 2, 3]}
      test4={() => console.log("test4")}
    />
  </React.StrictMode>,
  document.getElementById("root")
);
