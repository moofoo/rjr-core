import last from 'lodash/last';
import { getPathFromParts } from '../../util';

export default function addGroupPathToName(props: any, parentProps: any): any {
  if (!props.name && props.elementId) {
    props.idPath = props.elementId;
  }

  props.isInGroup =
    parentProps?.group ||
    parentProps?.isInGroup ||
    props.group ||
    props.isInGroup ||
    false;

  if (props.isInGroup) {
    const groupName =
      parentProps?.name ||
      parentProps?.groupName ||
      props.groupName ||
      undefined;

    const groupIndex = props.groupIndex >= 0 ? props.groupIndex : undefined;

    props.groupName = getPathFromParts([groupName, groupIndex]);

    if (props.groupName) {
      let lastPart = last(props.name?.split('.'));

      if (props.name?.replace(`.${lastPart}`, '') !== props.groupName) {
        props.name = getPathFromParts([props.groupName, props.name]);
      }

      lastPart = last(props.idPath?.split('.'));

      if (props.idPath?.replace(`.${lastPart}`, '') !== props.groupName) {
        props.idPath = getPathFromParts([props.groupName, props.idPath]);
      }
    }
  }

  return props;
}
