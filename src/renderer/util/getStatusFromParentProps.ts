export default function getStatusValuesFromParentProps(
  props: any,
  parentProps: any
): any {
  if (props.recursive) {
    props.isRecursiveContainer = true;
  }

  props.isRepeating =
    parentProps?.repeatable ||
    parentProps?.isRepeating ||
    props.repeatable ||
    props.isRepeating ||
    false;

  props.isRecursing =
    parentProps?.recursive ||
    parentProps?.isRecursing ||
    props.recursive ||
    props.isRecursing ||
    false;

  if (props.recursive) {
    props.recursiveIndex =
      (props.recursiveIndex || parentProps.recursiveIndex || 0) + 1;
    props.recursingElementId = props.elementId;
  } else if (props.isRecursing) {
    props.recursiveIndex = parentProps?.recursiveIndex || 0;
    props.recursingElementId =
      parentProps?.recursingElementId || parentProps?.elementId;
  }

  return props;
}
