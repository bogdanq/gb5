import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { MessageList } from "./components";
import "./palette.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0000ff",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <MessageList />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
