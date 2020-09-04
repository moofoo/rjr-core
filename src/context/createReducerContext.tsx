import React, { useReducer, Dispatch } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { createContainer } from 'react-tracked';
import { VariableObject, DispatchFunction } from '../types';

interface Actions {
  [index: string]: DispatchFunction<any>;
}

interface Reducer {
  (state: any, action: VariableObject): Object;
}

export const batchContextUpdate = function batchContextUpdate(fn: any) {
  unstable_batchedUpdates(fn);
};

const useBoundActions = (actions: Actions, dispatch: Dispatch<Object>) => {
  return React.useMemo(() => {
    return Object.keys(actions).reduce((accumulator, key) => {
      return {
        ...accumulator,
        [key]: actions[key](dispatch),
      };
    }, {});
  }, [actions, dispatch]);
};

const createReducerContext = function createReducerContext(
  reducer: Reducer,
  actions: Actions,
  initialState: any,
  init: (arg: Object) => Object = (arg) => {
    return arg;
  }
): {
  useSelector: any;
  useStateContext: any;
  useReferenceContext: any;
  useDispatchContext: any;
  Provider: any;
} {
  const ReferenceContext = React.createContext<Partial<any>>({});

  const {
    Provider: TrackedProvider,
    useTracked,
    useTrackedState,
    useUpdate,
    useSelector,
  } = createContainer(
    ({
      reducer,
      initialState,
      init,
    }: {
      reducer: Reducer;
      initialState: any;
      init: (arg: Object) => Object;
    }) => useReducer(reducer, initialState, init)
  );

  /* const useSelector = (selector: (props: unknown) => any) =>
    selector(useTrackedState());*/

  const useDispatchContext = () => {
    const dispatch = useUpdate();

    return useBoundActions(actions, dispatch);
  };

  const useStateContext = () => {
    const [state, dispatch] = useTracked();

    const boundActions = useBoundActions(actions, dispatch);

    return React.useMemo(() => ({ state, ...boundActions }), [
      state,
      boundActions,
    ]);
  };

  const useReferenceContext = () => {
    return React.useContext(ReferenceContext);
  };

  const Provider = React.memo(
    ({
      children,
      initState = {},
    }: {
      children: React.ReactNode;
      initState: any;
    }) => {
      const reference = React.useRef({});

      return (
        <ReferenceContext.Provider value={reference}>
          <TrackedProvider
            reducer={reducer}
            initialState={{ ...initialState, ...initState }}
            init={init}
          >
            {children}
          </TrackedProvider>
        </ReferenceContext.Provider>
      );
    }
  );

  return {
    useSelector,
    useStateContext,
    useReferenceContext,
    useDispatchContext,
    Provider,
  };
};

export default createReducerContext;
