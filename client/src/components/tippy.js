import React, { useRef, useEffect } from "react";
import Tippy from "@tippy.js/react";
import styles from "./tippy.module.scss";

export default ({ visible: Visible, ...props }) => {
  const tip = useRef(null);

  useEffect(() => {
    if (Visible) {
      tip.current.show();
    } else {
      tip.current.hide();
    }
  }, [Visible]);

  return (
    <Tippy
      arrow={true}
      arrowType="round"
      delay={[300, 100]}
      animation="scale"
      inertia={true}
      trigger={Visible ? "manual" : "mouseenter focus"}
      hideOnClick={false}
      onCreate={instance => {
        tip.current = instance;
      }}
      {...props}
    />
  );
};
