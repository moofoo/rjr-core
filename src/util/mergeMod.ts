import uniq from 'lodash/uniq';
import { Modifiers } from '../types';

const mergeMod = function mergeMod(...modifiers: Array<Modifiers>): Modifiers {
  if (modifiers.length <= 1) {
    return modifiers[0];
  }

  let combined = {};

  modifiers = uniq(modifiers).filter((v) => v);

  modifiers.forEach((modifierBundle) => {
    Object.keys(modifierBundle).forEach((modifierName) => {
      combined[modifierName] = combined[modifierName] || [];

      combined[modifierName] = combined[modifierName].concat(
        modifierBundle[modifierName]
      );
    });
  });

  return combined;
};

export default mergeMod;
