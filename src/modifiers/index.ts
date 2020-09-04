import { propBlacklist } from './hocs';
import { ComponentProps } from './wrappers';
import { Modifier } from '../types';

interface ModifierExport {
  [index: string]: Array<Modifier>;
}

export default {
  hocs: [propBlacklist],
  wrappers: [ComponentProps],
} as ModifierExport;
