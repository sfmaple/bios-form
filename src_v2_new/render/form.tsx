import pick from 'lodash.pick';
import React, { PureComponent } from 'react';
import { Provider } from './context';
import Context from '../models/context';

export default class Form extends PureComponent<FormProps> {
  context: Context;
  constructor(props: FormProps) {
    super(props);
    this.context = new Context(pick(props, Context.optKeys));
  }
  get getContext() {
    const { context } = this;
    return { context };
  }
  render() {
    const { props, children } = this.props;
    return (
      <form {...props}>
        <Provider value={this.getContext}>{children}</Provider>
      </form>
    );
  }
}
