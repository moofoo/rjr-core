import React from 'react';
import { omit } from 'lodash';
import useGetModifierConfig from '../../../hooks/useGetModifierConfig';
import config from './config';
import { ComponentWithPassThru } from '../../../types';

const PropBlacklist = (BaseComponent: ComponentWithPassThru) =>
  React.memo(function PropBlacklist(props: any) {
    const modConfig = useGetModifierConfig('hocs', 'PropBlacklist');

    let newProps = props;

    if (!BaseComponent.passRenderPropsThru) {
      newProps = omit(newProps, modConfig.data.blacklist);
    }

    return <BaseComponent {...newProps} />;
  });

export default {
  fn: PropBlacklist,
  config,
};
