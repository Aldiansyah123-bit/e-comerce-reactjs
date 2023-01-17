// import { useEffect } from "react";
// import { useSelector } from "react-redux";

import { ConfigProvider } from "antd";
import Router from "./router/Router"

export default function App() {
  // Redux
  // const customise = useSelector((state) => state.customise);

  // // Lang
  // useEffect(() => {
  //   document.querySelector("html").setAttribute("lang", customise.language);
  // }, [customise]);

  return (
    <ConfigProvider>
      {/* <ConfigProvider direction={customise.direction}> */}
      <Router />
    </ConfigProvider>
  );
}
