import React from 'react';

const Display = (props) => (
  <div style={props.style} className={props.className}>
    {props.contents}
  </div>
);

export default Display;
