import React from 'react';
import config from './config';

const ShowControlNames = (props: any) => {
  const { children, name } = props;

  if (name) {
    return (
      <div>
        {children}
        <div>{name}</div>
      </div>
    );
  } else {
    return React.cloneElement(children, props);
  }
};

export default {
  fn: ShowControlNames,
  config,
};
