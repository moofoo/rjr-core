import omit from 'lodash/omit';
import { useRendererReferenceContext } from '../context/RendererProvider';

const useSetStoredProps = function useSetStoredProps(props: any) {
  const reference = useRendererReferenceContext();

  if (props.name || (props.elementId && !props.randomElementId)) {
    reference.current.storedProps =
      reference.current.storedProps || new Map<string, Object>();

    reference.current.storedProps.set(props.name || props.elementId, {
      ...omit(props, ['elements']),
    });
  }
};

export default useSetStoredProps;
