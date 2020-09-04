import React from 'react';
import useGetComponentProps from './useGetComponentProps';
import config from './config';
import { useRendererSelector } from '../../../context/RendererProvider';

const ComponentProps: React.FunctionComponent<any> = function ComponentProps({
  children,
  ...props
}: any) {
  const componentProps = useRendererSelector((state: any) =>
    state.componentProps[props.elementId || props.name]
      ? state.componentProps[props.elementId || props.name]
      : state.componentProps[props.componentName] || state.componentProps['all']
  );

  let newProps = props;

  const addProps = useGetComponentProps(
    props,
    componentProps,
    props.componentPropsArg
  );

  if (addProps !== null) {
    newProps = {
      ...props,
      ...addProps,
    };
  }

  return React.cloneElement(children, newProps);
};

export default {
  fn: ComponentProps,
  config,
};
