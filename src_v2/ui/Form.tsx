import React, { PureComponent } from 'react';

export class Form extends PureComponent {
  render() {
    const { children } = this.props;
    return <form>{children}</form>;
  }
}
