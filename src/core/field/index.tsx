import * as React from 'react';
import set from 'lodash.set';
import clone from 'lodash.clonedeep';
import Base from './base';
import { IFieldProps, IParams } from '../../typings';
const { PureComponent } = React;

export default class SchemaField extends PureComponent<IFieldProps> {
  componentDidMount() {
    const { contextAPI } = this.props;
    const { subscribe } = contextAPI;
    subscribe('setFieldSchema', this.onDependSchema);
  }
  componentWillUnmount() {
    const { contextAPI } = this.props;
    const { unsubscribe } = contextAPI;
    unsubscribe('setFieldSchema', this.onDependSchema);
  }
  onDependSchema = (params: IParams) => {
    const { id } = this.props;
    const keys = Object.keys(params);
    const isUpdate = !!id && keys.some((key) => key === id);
    isUpdate && this.forceUpdate();
  };
  render() {
    const { id, formSchema, contextAPI, ...rest } = this.props;
    const nextSchema = clone(rest);
    const { getFieldSchema } = contextAPI;
    const pluginSchema = getFieldSchema(id);
    pluginSchema &&
      Object.keys(pluginSchema).forEach((name) => {
        const schema = pluginSchema[name];
        set(nextSchema, name, schema);
      });
    const { index } = formSchema;
    const { indexes } = nextSchema;
    const isShow = indexes && index && indexes.includes(index) ? true : null;
    return isShow && <Base id={id} {...nextSchema} contextAPI={contextAPI} />;
  }
}
