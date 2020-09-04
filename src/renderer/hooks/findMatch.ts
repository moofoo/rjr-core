const findMatch = function findMatch(
  props: any,
  key: string,
  returnMatch?: boolean
): boolean | string {
  const ids = ['all', props.componentName, props.elementId, props.name].filter(
    (val) => val
  );

  if (
    (key.includes &&
      key.includes('|') &&
      key.split('|').find((part) => ids.includes(part))) ||
    ids.includes(key)
  ) {
    if (returnMatch) {
      return key;
    }

    return true;
  }

  return false;
};

export default findMatch;
