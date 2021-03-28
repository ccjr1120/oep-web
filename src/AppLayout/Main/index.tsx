import { Progress } from "antd";
import { CSSProperties, useState } from "react";
import { Switch } from "react-router";
import { AppRoute } from "../../router/AppRoute";
import routes from "../../router/index";

const Main = () => {
  const [speed, setSpeed] = useState(0);
  const [display, setDisplay] = useState("none");
  const loadStyle: CSSProperties = {
    height: "1px",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1024,
    display,
  };

  return (
    <div className="page-container">
      <Progress
        showInfo={false}
        style={loadStyle}
        strokeColor={{
          "0%": "#108ee9",
          "100%": "#87d068",
        }}
        percent={speed}
      />
      <Switch>
        {routes.map((item, i) => {
          return (
            <AppRoute
              key={i}
              beforeEffact={() => {
                setDisplay("block");
                setSpeed(100);
              }}
              afterEffact={() => {
                setTimeout(() => {
                  setDisplay("none");
                }, 200);
              }}
              path={`${item.path}`}
              component={item.component}
              exact
            ></AppRoute>
          );
        })}
      </Switch>
    </div>
  );
};

export default Main;
