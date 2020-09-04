import React from 'react';
import flowRight from 'lodash/flowRight';
import { RjrProps, Modifiers, ModifierConfigs } from '../types';
import mergeMod from './mergeMod';

const MergeModifiers = (
  BaseComponent: React.FunctionComponent<any>,
  modifiers: Modifiers | Array<Modifiers>,
  defaultModifierConfigs?: ModifierConfigs
) =>
  React.memo(function MergeModifiers(props: RjrProps) {
    const modifiersRef = React.useRef(undefined) as any;

    if (modifiersRef.current === undefined) {
      modifiersRef.current = modifiersRef.current || {};
      let mergedModifiers = {};

      if (Array.isArray(modifiers)) {
        mergedModifiers = mergeMod(...[props.modifiers || {}, ...modifiers]);
      } else {
        mergedModifiers = mergeMod(props.modifiers, modifiers);
      }

      modifiersRef.current = mergeMod(modifiersRef.current, mergedModifiers);
    }

    const modifierConfigsRef = React.useRef(undefined) as any;

    if (modifierConfigsRef.current === undefined) {
      modifierConfigsRef.current = {
        ...(props.modifierConfigs || {}),
      };

      for (const key in defaultModifierConfigs) {
        if (!modifierConfigsRef.current[key]) {
          modifierConfigsRef.current[key] = defaultModifierConfigs[key];
        } else {
          modifierConfigsRef.current[key] = flowRight([
            modifierConfigsRef.current[key],
            defaultModifierConfigs[key],
          ]);
        }
      }
    }

    return (
      <BaseComponent
        {...props}
        modifiers={modifiersRef.current}
        modifierConfigs={modifierConfigsRef.current}
      />
    );
  });

export default MergeModifiers;
