import { Dispatch } from 'react';

import {
  SetStateObject,
  SetStateValue,
  UpdateComponentProps,
  SetComponentProps,
} from './context/RendererProvider';

export interface Element {
  component: string;
  properties?: any;
  children?: Array<Element> | String;
  wrapper?: string;
}

export interface Partials {
  [index: string]: any;
}

export interface Config {
  elements: Array<Element>;
  partials?: Partials;
}

export interface ComponentMap {
  [index: string]: React.FunctionComponent<any>;
}

export interface VariableObject {
  [index: string]: any;
}

export interface ModifierConfig {
  name?: string;
  order?: number;
  primary?: boolean;
  ownLoop?: boolean;
  whereParam?: string;
  whereValues?: boolean;
  where?: any;
  data?: any;
}

export interface ModifierConfigs {
  [index: string]: (config: ModifierConfig) => ModifierConfig;
}

export interface Modifier {
  fn: Function;
  config: ModifierConfig;
}

export interface Modifiers {
  [index: string]: Array<Modifier>;
}

interface RendererContextMethods {
  setStateObject: SetStateObject;
  setStateValue: SetStateValue;
  updateComponentProps: UpdateComponentProps;
  setComponentProps: SetComponentProps;
}

type ComponentPropsFunction = (
  props: any,
  contextMethods: RendererContextMethods,
  componentPropsArg: any
) => Object;

export interface ComponentProps {
  [index: string]: ComponentPropsFunction | Object;
}

export interface RjrProps extends VariableObject {
  config?: Config;
  componentMap?: ComponentMap;
  componentProps?: ComponentProps;
  componentPropsArg?: any;
  modifiers?: Modifiers;
  modifierConfigs?: ModifierConfigs;
}

export interface ComponentWithPassThru extends React.FunctionComponent<any> {
  passRenderPropsThru: Boolean;
}

interface ReferenceCurrent extends VariableObject {
  componentMap: ComponentMap;
  config: Config;
  modifiers: {
    [index: string]: any;
    hocs?: Array<Modifier>;
    wrappers?: Array<Modifier>;
    rendererProps?: Array<Modifier>;
  };
  rjrProps: any;
  storedProps?: Map<string, Object>;
}

export interface ReferenceContext {
  current: ReferenceCurrent;
}

export interface DispatchFunction<inner> {
  (dispatch: Dispatch<Object>): inner;
}
