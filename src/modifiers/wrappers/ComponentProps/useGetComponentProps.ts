import { useRendererDispatchContext } from '../../../context/RendererProvider';
import { ComponentProps } from '../../../types';

export default function useGetComponentProps(
  props: any,
  componentProps: any,
  componentPropsArg: any
): ComponentProps {
  const methods = useRendererDispatchContext();

  let tmpProps = {};

  const cProps =
    typeof componentProps === 'function'
      ? componentProps({ ...props }, methods, componentPropsArg) || null
      : componentProps || null;

  if (cProps && Object.keys(cProps || {}).length) {
    tmpProps = {
      ...tmpProps,
      ...cProps,
    };
  }

  return Object.keys(tmpProps).length > 0 ? tmpProps : null;
}
