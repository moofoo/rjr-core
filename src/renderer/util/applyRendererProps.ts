import flowRight from 'lodash/flowRight';
import { Modifier } from '../../types';

const applyRendererProps = function applyRendererProps(
  rendererProps: any,
  props: any,
  parentProps: any,
  rjrProps: any
): any {
  const rendererPropsFn = rendererProps.reduce(
    (accumulator: Array<Function>, modifier: Modifier) => {
      return [...accumulator, modifier.fn];
    },
    []
  );

  props = flowRight(...rendererPropsFn)(props, parentProps, rjrProps);

  return props;
};

export default applyRendererProps;
