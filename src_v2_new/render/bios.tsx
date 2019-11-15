import React, { Component } from 'react';
import Form from './form';
import FormItem from './item';

export default class BiosForm extends Component<BiosFromProps> {
  constructor(props: BiosFromProps) {
    super(props);
  }
  shouldComponentUpdate() {
    return false;
  }
  get getFormContext() {
    const { widgets, actions, constants, functions } = this.props;
    return { widgets, actions, constants, functions };
  }
  render() {
    const { header, footer, form, items, defaultValue } = this.props;
    return (
      <Form {...form} {...this.getFormContext} defaultValue={defaultValue}>
        {header}
        {items && items.map((item) => <FormItem {...item} />)}
        {footer}
      </Form>
    );
  }
}
