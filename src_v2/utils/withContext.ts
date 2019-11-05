import { createElement, ComponentClass } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import { Consumer } from '../lib/context';

export const withContext = (Component: ComponentClass) => {
  const C = (props: any) => {
    const { wrappedComponentRef, ...remainingProps } = props;
    return createElement(Consumer, null, (context: any) =>
      createElement(Component, {
        ...remainingProps,
        context: props.context || context,
        ref: wrappedComponentRef
      })
    );
  };
  C.displayName = `withContext(${Component.displayName || Component.name})`;
  C.WrappedComponent = Component;
  return hoistStatics(C, Component);
};
