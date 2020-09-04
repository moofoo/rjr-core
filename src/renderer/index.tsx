import React from 'react';
import Render from './render';
import { getPathFromParts } from '../util';
import { Element } from '../types';

interface Props {
  elements: Array<Element>;
  parentProps?: any;
  componentProps?: any;
  componentPropsArg?: any;
}

const Renderer: React.FunctionComponent<Props> = React.memo((props) => {
  const { elements = [], parentProps = null, componentPropsArg = null } = props;

  return (
    <>
      {elements.map((el: Element, index: number) => (
        <Render
          element={el}
          parentProps={parentProps}
          componentPropsArg={componentPropsArg}
          key={
            el.properties.key ||
            getPathFromParts([
              el.properties.elementId,
              parentProps?.groupIndex,
              parentProps?.recursiveIndex,
              index,
            ])
          }
        />
      ))}
    </>
  );
});

export default Renderer;
