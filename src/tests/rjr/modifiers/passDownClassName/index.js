import config from './config';

const passDownClassName = function passDownClassName(props, parentProps) {
  if (parentProps?.className) {
    props.className = parentProps.className;
  }

  return props;
};

export default {
  fn: passDownClassName,
  config,
};
