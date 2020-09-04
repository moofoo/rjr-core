import React from 'react';
import { getPathFromParts } from '../../util';
import Render from '../render';

export default function createElement(
  component: React.FunctionComponent<any>,
  element: any,
  props: any
) {
  return React.createElement(
    component,
    props,
    element.children
      ? typeof element.children === 'string'
        ? element.children
        : element.children.map((child: any, index: Number) => {
            return (
              <Render
                element={child}
                parentProps={props}
                key={getPathFromParts([child.properties?.elementId, index])}
              />
            );
          })
      : null
  );
}
