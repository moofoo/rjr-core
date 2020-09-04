import createReducerContext from './createReducerContext';
import mergeValues from '../util/mergeValues';
import {
  VariableObject,
  ComponentProps,
  ReferenceContext,
  DispatchFunction,
} from '../types';

const reducer = (state: any, action: VariableObject) => {
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

export type SetStateValue = (name: string, object: any) => void;

const setStateValue: DispatchFunction<SetStateValue> = (dispatch) => (
  name: string,
  value: any
) => {
  dispatch({
    type: 'SET_STATE_VALUE',
    name,
    value,
  });
};

export type SetStateObject = (name: string, object: any) => void;

const setStateObject: DispatchFunction<SetStateObject> = (dispatch) => (
  name: string,
  object: any
) => {
  dispatch({
    type: 'SET_STATE_OBJECT',
    name,
    object,
  });
};

export type UpdateComponentProps = (name: string, prop: any) => void;

const updateComponentProps: DispatchFunction<UpdateComponentProps> = (
  dispatch
) => (name: string, prop: any) => {
  dispatch({
    type: 'UPDATE_COMPONENT_PROPS',
    name,
    prop,
  });
};

export type SetComponentProps = (props: any) => void;

const setComponentProps: DispatchFunction<SetComponentProps> = (dispatch) => (
  props: any
) => {
  dispatch({
    type: 'SET_COMPONENT_PROPS',
    props,
  });
};

interface DispatchContext {
  setComponentProps: SetComponentProps;
  updateComponentProps: UpdateComponentProps;
  setStateObject: SetStateObject;
  setStateValue: SetStateValue;
}

interface StateContext extends DispatchContext {
  componentProps: ComponentProps;
}

interface RendererContext {
  useSelector: Function;
  useStateContext: () => StateContext;
  useReferenceContext: () => ReferenceContext;
  useDispatchContext: () => DispatchContext;
  Provider: React.FunctionComponent<any>;
}

export const {
  useSelector: useRendererSelector,
  useStateContext: useRendererStateContext,
  useReferenceContext: useRendererReferenceContext,
  useDispatchContext: useRendererDispatchContext,
  Provider: RendererProvider,
}: RendererContext = createReducerContext(
  reducer,
  {
    setStateValue,
    setStateObject,
    setComponentProps,
    updateComponentProps,
  },
  {
    componentProps: {},
  }
);
