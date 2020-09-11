import React from 'react';
import Renderer from './renderer';
import {
  RendererProvider,
  useRendererReferenceContext,
} from './context/RendererProvider';
import useInitRJR from './hooks/useInitRJR';

import defaultModifiers from './modifiers';
import MergeModifiers from './util/MergeModifiers';
import { RjrProps } from './types';

const RendererInner: React.FunctionComponent<RjrProps> = function RendererInner(
  props
) {
  const { componentPropsArg } = props;

  const reference = useRendererReferenceContext();

  const initRJR = useInitRJR();

  const [ready, setReady] = React.useState(false);

  React.useEffect(
    () => {
      initRJR(props);
      setReady(true);
    },
    /* eslint-disable-line react-hooks/exhaustive-deps */ [] // ABSOLUTELY ONLY ONCE
  );

  if (!ready) {
    return null;
  }

  const {
    current: {
      config: { elements },
    },
  } = reference;

  return <Renderer elements={elements} componentPropsArg={componentPropsArg} />;
};

const Wrapped = MergeModifiers(RendererInner, defaultModifiers as any);

const ReactJsonRenderer: React.FunctionComponent<RjrProps> = function ReactJsonRenderer(
  props
) {
  return (
    <RendererProvider>
      <Wrapped {...props} />
    </RendererProvider>
  );
};

export { default as useGetModifierConfig } from './hooks/useGetModifierConfig';
export { default as useSetStoredProps } from './hooks/useSetStoredProps';
export { default as Renderer } from './renderer';
export { useRendererReferenceContext };
export { getPathFromParts, MergeModifiers } from './util';

export default ReactJsonRenderer;
