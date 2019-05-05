import * as React from 'react';
import set from 'lodash.set';
import omit from 'lodash.omit';
import clone from 'lodash.clonedeep';
import Base from './base';
import { IFieldProps, IParams } from '../../typings';
const { memo, useState, useEffect, useCallback } = React;

const SchemaField = memo((props: IFieldProps) => {
  const { formSchema, id, contextAPI } = props;
  const { getFieldSchema, subscribe, unsubscribe } = contextAPI;
  const [count, setCount] = useState(0);
  const onDependSchema = useCallback((params: IParams) => {
    const keys = Object.keys(params);
    const isUpdate = keys.some((key) => key === id);
    isUpdate && setCount(count + 1);
  }, []);
  useEffect(() => {
    subscribe('setFieldSchema', onDependSchema);
    return () => {
      unsubscribe('setFieldSchema', onDependSchema);
    };
  }, []);
  const fieldSchema = omit(props, ['formSchema', 'contextAPI']);
  const schemaById = getFieldSchema(id);
  const nextSchema = clone(fieldSchema);
  const pluginSchema = Object.assign({}, schemaById);
  pluginSchema &&
    Object.keys(pluginSchema).forEach((name) => {
      const schema = pluginSchema[name];
      set(nextSchema, name, schema);
    });
  const { index } = formSchema;
  const { indexes } = nextSchema;
  const isShow = indexes && index && indexes.includes(index) ? true : null;
  return isShow && <Base __count={count} {...nextSchema} contextAPI={contextAPI} />;
});
SchemaField.displayName = 'SchemaField';
export default SchemaField;
