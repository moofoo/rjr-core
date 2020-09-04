export default function getPathFromParts(
  parts: Array<number | string | undefined>
): string {
  let first = true;
  let str: number | string = '';
  parts.forEach((part) => {
    if (part !== undefined) {
      if (typeof part === 'number') {
        str += `[${part}]`;
      } else {
        if (first) {
          str = part;
        } else {
          str += `.${part}`;
        }
      }
      first = false;
    }
  });

  return str;
}
