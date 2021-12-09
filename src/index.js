import React, { useEffect, useState } from "react";
import { PersistGate } from "redux-persist/integration/react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header, PublicRoute, PrivateRoute } from "./components";
import { ChatPage, ProfilePage, Gists, LoginPage, SignUpPage } from "./pages";
import { CustomThemeProvider } from "./theme-context";
import { store, persistor } from "./store";
import { firebaseApp } from "./api/firebase";
// import { store } from "./store/my-redux";

import "./palette.css";
import "./global.css";

// const useGists = () => {
//   const [gists, setGists] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getGists = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch("https://api.github.com/gists/public");

//         if (response.status === 200) {
//           const data = await response.json();

//           setGists(data);
//         }
//       } catch (e) {
//         setError(e);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getGists();
//   }, []);

//   return {
//     gists,
//     loading,
//     error,
//   };
// };

const App = () => {
  const [count, setCount] = useState(0);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // @TODO создать санк
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        setSession(user);
      } else {
        setSession(null);
      }
    });
  }, []);

  const isAuth = session?.email;

  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <CustomThemeProvider>
            <BrowserRouter>
              {/* <button onClick={() => setCount(count + 1)}>setCount</button> */}
              <Header count={count} session={session} />

              <Routes>
                <Route path="/" element={<h1>Home Page</h1>} />
                <Route
                  path="/chat/*"
                  element={
                    <PrivateRoute isAuth={isAuth} to="/login">
                      <ChatPage session={session} />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute isAuth={isAuth}>
                      <ProfilePage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/gists"
                  element={
                    <PrivateRoute isAuth={isAuth}>
                      <Gists />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <PublicRoute isAuth={isAuth}>
                      <LoginPage />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/sign-up"
                  element={
                    <PublicRoute isAuth={isAuth}>
                      <SignUpPage />
                    </PublicRoute>
                  }
                />
              </Routes>
            </BrowserRouter>
          </CustomThemeProvider>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
