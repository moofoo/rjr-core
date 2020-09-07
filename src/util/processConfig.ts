import get from 'lodash/get';
import set from 'lodash/set';
import merge from 'lodash/merge';
import cloneDeep from 'lodash/cloneDeep';
import shortid from 'shortid';
import { Element, Partials, Config } from '../types';

function checkPartial(partialName: string, partials: Partials = {}) {
  let isPartial = false;

  if (partialName.includes('|')) {
    for (const pName of partialName.split('|')) {
      if (partials[pName]) {
        isPartial = true;
        break;
      }
    }
  } else {
    if (partials[partialName]) {
      isPartial = true;
    }
  }

  return isPartial;
}

function checkPartialType(partialName: string, partials: Partials = {}) {
  if (partialName.includes('|')) {
    for (const pName of partialName.split('|')) {
      if (Array.isArray(partials[pName])) {
        return 'array';
      } else if (typeof partials[pName] === 'object') {
        return 'object';
      }
    }
  } else {
    if (Array.isArray(partials[partialName])) {
      return 'array';
    }
  }

  return 'object';
}

export function getPartial(
  partialName: string,
  partials: Partials,
  originalObj = {}
) {
  if (checkPartial(partialName, partials)) {
    const pType = checkPartialType(partialName, partials);

    if (partialName.includes('|')) {
      let toMerge = pType === 'array' ? [] : {};
      partialName.split('|').forEach((partialName) => {
        if (pType === 'array') {
          toMerge = (toMerge as Array<string>).concat(
            cloneDeep(partials[partialName])
          );
        } else {
          toMerge = merge(cloneDeep(partials[partialName]), toMerge);
        }
      });

      return toMerge;
    }

    return cloneDeep(partials[partialName]);
  }

  return originalObj;
}

export function mergePartials(
  element: Element,
  partialName: string,
  partials: Partials,
  partialKey: string
) {
  if (checkPartial(partialName, partials)) {
    const partial = getPartial(partialName, partials, get(element, partialKey));

    element = set(element, partialKey, partial);
  }

  return element;
}

function applyPartials(element: Element, partials: Partials) {
  if (typeof element.children === 'string') {
    element = mergePartials(element, element.children, partials, 'children');
  } else if (typeof element.properties?.elements === 'string') {
    element = mergePartials(
      element,
      element.properties?.elements,
      partials,
      'properties.elements'
    );
  }

  return element;
}

function processElement(element: Element, config: Config) {
  element = applyPartials(element, config.partials);

  if (Array.isArray(element.children)) {
    const children = [];

    for (const el of element.children) {
      const processed = processElement(el, config);
      children.push(processed);
    }

    element.children = children;
  }
  if (Array.isArray(element.properties?.elements)) {
    const elements = [];

    for (const el of element.properties.elements) {
      const processed = processElement(el, config);
      elements.push(processed);
    }

    element.properties.elements = elements;
  }

  element.properties = element.properties || {};

  if (element.properties.elementId) {
    element.properties.randomElementId = false;
  }

  if (!element.properties.elementId) {
    element.properties.elementId = shortid.generate();
    element.properties.randomElementId = true;
  }

  return element;
}

const processConfig = function processConfig(config: Config): Config {
  const elements = [];

  for (const element of config.elements) {
    elements.push(processElement(element, config));
  }

  config.elements = elements;

  return config;
};

export default processConfig;
