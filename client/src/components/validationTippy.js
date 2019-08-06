import React from "react";
import Tippy from "@tippy.js/react";

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
