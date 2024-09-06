import "./gesture-handler";
import React from "react";
import Contents from "./screens/toc";
import Navigator from "./routes/drawer";

export default function App() {
  global.language = "English";

  return <Navigator />;
}
