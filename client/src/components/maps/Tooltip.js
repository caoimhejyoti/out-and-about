import React from "react";

const Tooltip = ({ feature }) => {
//   const { id } = feature.id;

  return (
    <div>
      <strong> {feature.properties.name}</strong>
    </div>
  );
};

export default Tooltip;
