import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import flowRight from 'lodash/flowRight';
import { useRendererReferenceContext } from '../context/RendererProvider';
import {
  addGroupPathToName,
  getStatusFromParentProps,
  applyRendererProps,
  createElement,
} from './util';
import { useGetWrappers } from './hooks';
import useSetStoredProps from '../hooks/useSetStoredProps';
import { Element } from '../types';

interface RenderProps {
  element: Element;
  parentProps?: any;
  componentProps?: any;
  componentPropsArg?: any;
}

const Render = React.memo<RenderProps>((renderProps) => {
  const {
    element,
    parentProps,
    componentProps,
    componentPropsArg,
  } = renderProps;

  const reference = useRendererReferenceContext();

  let {
    current: {
      config,
      componentMap,
      rjrProps,
      initComponentProps,
      modifiers: { rendererProps },
    },
  } = reference;

  let props = {
    ...cloneDeep(element?.properties),
    componentName: element.component,
  };

  props.componentPropsArg = componentPropsArg;

  props = addGroupPathToName(props, parentProps);
  props = getStatusFromParentProps(props, parentProps);

  if (rendererProps?.length) {
    props = applyRendererProps(rendererProps, props, parentProps, rjrProps);
  }

  useSetStoredProps(props);

  const maxDepth = props.maxDepth ? props.maxDepth + 1 : 2;

  if (props.recursive && props.recursiveIndex < maxDepth) {
    props.elements = cloneDeep(config.elements);
  } else {
    props.elements = [];
  }

  if (props.active === false) {
    return null;
  }

  if (props.isRecursing) {
    if (props.excludeFromRecursion === true) {
      return null;
    }

    if (
      typeof props.excludeFromRecursion === 'number' &&
      props.recursiveIndex >= props.excludeFromRecursion + 1
    ) {
      return null;
    }
  }

  const component = componentMap[element.component]
    ? componentMap[element.component]
    : element.component;

  const wrapper = componentMap[element.wrapper]
    ? componentMap[element.wrapper]
    : element.wrapper || undefined;

  let [wrappers, hocs] = useGetWrappers(
    props,
    componentProps || initComponentProps
  );

  let hoc: Function;

  if (hocs.length) {
    hoc = flowRight(...hocs);
  } else {
    hoc = null;
  }

  let componentElement = createElement(
    hoc ? hoc(component) : component,
    element,
    props
  );

  if (wrapper) {
    componentElement = React.createElement(
      wrapper,
      props,
      componentElement
    ) as any;
  }

  if (wrappers.length) {
    wrappers.forEach((wrap: React.FunctionComponent<any>) => {
      componentElement = React.createElement(
        wrap,
        props,
        componentElement
      ) as any;
    });
  }

  return componentElement;
});

export default Render;
