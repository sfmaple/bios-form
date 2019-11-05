import React, { Fragment, PureComponent } from 'react';
import { LayoutSchema } from '../../typings';

export class Layout extends PureComponent<LayoutSchema> {
  render() {
    const { children } = this.props;
    return <Fragment>{children}</Fragment>;
  }
}
