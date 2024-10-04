import "./gesture-handler";
import React from "react";
import Navigator from "./routes/tabNav";

export default function App() {
  global.language = "English";

  return <Navigator />;
}
