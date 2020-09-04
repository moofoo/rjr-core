import merge from 'lodash/merge';
import flowRight from 'lodash/flowRight';

const mergeValues = (currentValue: any, newValue: any): Object => {
  if (currentValue === undefined) {
    return newValue;
  }

  const currentType = typeof currentValue;
  const newType = typeof newValue;

  if (currentType === 'object' && newType === 'object') {
    return merge({}, currentValue, newValue);
  } else if (currentType === 'function' && newType === 'function') {
    return flowRight(newValue, currentValue);
  } else if (currentType === 'function' && newType !== 'function') {
    return flowRight((props) => merge({}, props, newValue), currentValue);
  } else if (currentType !== 'function' && newType === 'function') {
    return flowRight(newValue, (props) => merge({}, props, newValue));
  }

  return newValue;
};

export default mergeValues;
