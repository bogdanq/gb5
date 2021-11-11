import React, { useState, useEffect, useLayoutEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const FilmsList = ({ films = [], title, setCount }) => {
  return (
    <div className="wrapper">
      <h1>{title}</h1>

      <div>
        {setCount && (
          <button onClick={() => setCount((count) => count + 1)}>
            setCount with cb
          </button>
        )}

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

const listener = () => {
  console.log("listener");
};

const FunctionComponent = () => {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState("");
  const [films, setFilms] = useState([
    { title: "film1", year: 2020 },
    { title: "film2", year: 2020 },
  ]);

  useEffect(() => {
    console.log("useEffect 2", count);

    return () => {
      console.log("remove useEffect 2");
    };
  }, [count]);

  useLayoutEffect(() => {
    // работа с DOM
    console.log("useLayoutEffect");

    return () => {
      console.log("remove useLayoutEffect");
    };
  }, []);

  useEffect(() => {
    // запросы
    // обновление состояния
    // таймеры
    // подписки
    // events
    document.addEventListener("click", listener);
    console.log("useEffect");

    return () => {
      document.removeEventListener("click", listener);
      console.log("remove useEffect");
    };
  }, []);

  const increment = () => {
    setCount(count + 1);
  };

  const addFilm = () => {
    setFilms([...films, { title: value, year: 2020 }]);
    setValue("");
  };

  const handleChangeValue = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <h1>Hello FunctionComponent</h1>
      <h1>count: {count}</h1>

      <button onClick={increment}>setCount</button>
      <button onClick={addFilm}>addFilm</button>

      <input
        placeholder="Введите название фильма"
        onChange={handleChangeValue}
        value={value}
      />

      <FilmsList
        title="films from functions"
        setCount={setCount}
        films={films}
      />
    </div>
  );
};

class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      age: 20,
      firstName: "firstName",
      lastName: "lastName",
      films: [
        { title: "film1", year: 2020 },
        { title: "film2", year: 2020 },
      ],
      count: 2,
      isVisible: true,
      o: {
        count: 0,
        test: "test",
      },
    };

    // bind

    console.log("constructor");
  }

  // state = {};

  increment = () => {
    // this.setState(updater, [callback])
    // updater => {} || () => ({})
    // this.state.age = 100
    // this.setState({
    //   count: this.state.count + 1,
    //   firstName: "firstName new",
    //   lastName: "lastName new",
    //   films: [...this.state.films, { title: "film3", year: 2020 }],
    // });
    // this.setState({
    //   count: this.state.count + 100, // 0 + 100
    // });
    // this.setState({
    //   count: this.state.count + 10, // 0 + 10
    // });
    // this.setState((state) => ({
    //   count: state.count + 100, // 0 + 100
    // }));
    // this.setState((state) => ({
    //   count: state.count + 10, // 100 + 10
    // }));
    this.setState((state) => ({
      // o: {
      //   ...state.o,
      //   count: state.o.count + 1,
      // },
      films: [...this.state.films, { title: "film3", year: 2020 }],
    }));
  };

  toggle = () => {
    this.setState({
      isVisible: !this.state.isVisible,
    });
  };

  static getDerivedStateFromProps(props, state) {
    console.log("getDerivedStateFromProps", state);

    const getCount = (count) => count ** 2;

    return {
      count: getCount(state.count),
    };
  }

  listener = () => {
    console.log("click");
  };

  componentDidMount() {
    // запросы
    // обновление состояния
    // работа с DOM
    // таймеры
    // подписки
    // events
    console.log("componentDidMount");
    document.addEventListener("click", this.listener);
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
    document.removeEventListener("click", this.listener);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate");

    // if (nextState.count < 300) {
    //   return true;
    // }

    // return false;

    return true;
  }

  componentDidUpdate() {
    // запросы
    // обновление состояния
    // работа с DOM
    // таймеры
    // подписки
    // events
    console.log("componentDidUpdate");

    if (this.state.isVisible) {
      this.toggle();
    }
  }

  render() {
    // const { test4 } = this.props;
    const { age, firstName, lastName, count, films, isVisible } = this.state;

    console.log("render");

    return (
      <div>
        <h1>Hello ClassComponent</h1>
        <h1>Age: {age}</h1>
        <h1>
          Name: {firstName} {lastName}
        </h1>
        <h1>Count: {count}</h1>

        <button onClick={this.increment}>increment</button>
        <button onClick={this.toggle}>{isVisible ? "close" : "open"}</button>

        {isVisible && <FilmsList title="films from class" films={films} />}
      </div>
    );
  }
}

const App = ({ subTitle, ...rest }) => {
  const [visible, setVisible] = useState(true);

  return (
    <div>
      <button onClick={() => setVisible(!visible)}>setVisible</button>
      {/* {visible && <ClassComponent {...rest} />} */}
      {visible && <FunctionComponent {...rest} />}
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
