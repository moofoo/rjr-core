import omit from 'lodash/omit';
import processConfig from '../util/processConfig';
import {
  useRendererReferenceContext,
  useRendererDispatchContext,
} from '../context/RendererProvider';
import { RjrProps, VariableObject, Config } from '../types';
import sortModifiers from '../util/sortModifiers';

export default function useInitRJR() {
  const { setComponentProps } = useRendererDispatchContext();
  const reference = useRendererReferenceContext();

  return (props: RjrProps) => {
    let {
      config,
      modifiers,
      modifierConfigs,
      componentMap,
      componentProps,
    } = props;

    const { config: processedConfig } = reference.current;

    if (processedConfig) {
      return;
    }

    reference.current.config = processConfig(config as Config);

    setComponentProps(componentProps);

    reference.current.initComponentProps = { ...componentProps };

    reference.current.componentMap = { ...componentMap };

    reference.current.rjrProps = omit(props, [
      'config',
      'modifiers',
      'modifierConfigs',
      'componentMap',
      'componentProps',
    ]);

    if (!reference.current.modifiers) {
      reference.current.modifiers = {};
      if (modifiers !== undefined) {
        Object.keys(modifiers as VariableObject).forEach((modifierType) => {
          const modifierArr =
            (modifiers && Object.values(modifiers[modifierType])) || [];

          reference.current.modifiers[modifierType] = modifierArr.map(
            (modifier: any) => {
              if (modifierConfigs && modifierConfigs[modifier.config.name]) {
                modifier.config = {
                  ...modifier.config,
                  ...modifierConfigs[modifier.config.name](modifier.config),
                };
              }
              return modifier;
            }
          );
        });
      }
    }

    reference.current.modifiers = sortModifiers(reference.current.modifiers);
  };
}
