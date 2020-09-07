import React from 'react';
import jsonLogic from 'json-logic-js';

import { useRendererReferenceContext } from '../../context/RendererProvider';
import findMatch from './findMatch';
import { Modifier, ComponentProps } from '../../types';

const wrapperReduce = function wrapperReduce(
  wrappersOrHocs: Array<Modifier>,
  props: any,
  rjrProps: any,
  componentProps: ComponentProps
) {
  return wrappersOrHocs.reduce((accumulator: any[], wrapper: any) => {
    const {
      fn,
      config: { where, whereParam = 'props', whereValues },
    } = wrapper;

    if (!where) {
      return [...accumulator, fn];
    } else {
      if (whereParam === 'props') {
        if (typeof where === 'function') {
          if (where(props) === true) {
            return [...accumulator, fn];
          }
        } else if (
          typeof where === 'object' && whereValues
            ? jsonLogic.apply(where, Object.values(props))
            : jsonLogic.apply(where, props)
        ) {
          return [...accumulator, fn];
        }
      } else if (whereParam === 'rjrProps') {
        if (typeof where === 'function') {
          if (where(rjrProps) === true) {
            return [...accumulator, fn];
          }
        } else if (
          typeof where === 'object' &&
          jsonLogic.apply(where, rjrProps)
        ) {
          return [...accumulator, fn];
        }
      } else if (whereParam === 'componentProps') {
        if (Object.keys(componentProps).length) {
          for (const key in componentProps) {
            const match = findMatch(props, key, true);
            if (match !== false) {
              const entries = componentProps[key];
              if (typeof where === 'function') {
                if (where(props, entries) === true) {
                  return [...accumulator, fn];
                }
              } else if (
                typeof where === 'object' &&
                jsonLogic.apply(where, entries)
              ) {
                return [...accumulator, fn];
              }
            }
          }
        }
      }
    }

    return accumulator;
  }, []);
};

export default function useGetWrappers(
  props: any,
  componentProps: ComponentProps
): [Array<any>, Array<any>] {
  const reference = useRendererReferenceContext();
  const {
    modifiers: { wrappers, hocs },
    rjrProps,
  } = reference.current;

  let componentWrappers = [];
  let componentHocs = [];

  componentWrappers = React.useMemo(
    () =>
      wrappers?.length
        ? wrapperReduce(wrappers, props, rjrProps, componentProps)
        : [],
    [componentProps, props, rjrProps, wrappers]
  );

  componentHocs = React.useMemo(
    () =>
      hocs?.length ? wrapperReduce(hocs, props, rjrProps, componentProps) : [],
    [componentProps, props, rjrProps, hocs]
  );

  return [componentWrappers, componentHocs];
}
