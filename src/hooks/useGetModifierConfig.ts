import { useRendererReferenceContext } from '../context/RendererProvider';
import { ModifierConfig } from '../types';

export default function useGetModifierConfig(
  type: string,
  name: string
): ModifierConfig {
  const reference = useRendererReferenceContext();

  for (let modifier of reference.current.modifiers[type]) {
    if (modifier.config.name === name) {
      return modifier.config;
    }
  }

  return {} as ModifierConfig;
}
