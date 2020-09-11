import {
  createReducerContext,
  Reducer,
  DispatchAction,
} from 'real-simple-context';
import mergeValues from '../util/mergeValues';

const initialState = {
  componentProps: {},
};

const reducer: Reducer<typeof initialState> = (state, action) => {
  switch (action.type) {
    case 'SET_STATE_VALUE': {
      return {
        ...state,
        [action.name]: action.value,
      };
    }
    case 'SET_STATE_OBJECT': {
      return {
        ...state,
        [action.name]: {
          ...(state[action.name] || {}),
          ...action.object,
        },
      };
    }
    case 'UPDATE_COMPONENT_PROPS': {
      const currentValue = state.componentProps[action.name];

      return {
        ...state,
        componentProps: {
          ...state.componentProps,
          [action.name]: mergeValues(currentValue, action.prop),
        },
      };
    }

    case 'SET_COMPONENT_PROPS': {
      return {
        ...state,
        componentProps: {
          ...state.componentProps,
          ...action.props,
        },
      };
    }

    default:
      return state;
  }
};

const setStateValue = (dispatch: DispatchAction) => (
  name: string,
  value: any
) => {
  dispatch({
    type: 'SET_STATE_VALUE',
    name,
    value,
  });
};

const setStateObject = (dispatch: DispatchAction) => (
  name: string,
  object: any
) => {
  dispatch({
    type: 'SET_STATE_OBJECT',
    name,
    object,
  });
};

const updateComponentProps = (dispatch: DispatchAction) => (
  name: string,
  prop: any
) => {
  dispatch({
    type: 'UPDATE_COMPONENT_PROPS',
    name,
    prop,
  });
};

const setComponentProps = (dispatch: DispatchAction) => (props: any) => {
  dispatch({
    type: 'SET_COMPONENT_PROPS',
    props,
  });
};

export const {
  useSelector: useRendererSelector,
  useReference: useRendererReferenceContext,
  useActions: useRendererDispatchContext,
  Provider: RendererProvider,
} = createReducerContext(
  reducer,
  {
    setStateValue,
    setStateObject,
    setComponentProps,
    updateComponentProps,
  },
  initialState,
  true
);
