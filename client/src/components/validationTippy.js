import React, { useRef, useEffect } from "react";
import Tippy from "@tippy.js/react";
import styles from "./tippy.module.scss";

export default ({ visible: Visible, ...props }) => {
  return (
    <Tippy
      arrow={true}
      arrowType="round"
      animation="scale"
      placement="bottom"
      inertia={true}
      visible={Visible}
      hideOnClick={false}
      interactive={true}
      {...props}
    />
  );
};
