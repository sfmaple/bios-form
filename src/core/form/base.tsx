import * as React from 'react';
import clone from 'lodash.clonedeep';
import set from 'lodash.set';
import { FieldSchema, BaseProps } from '../../typings';
import Context from '../context';
import IField from '../field';
const { memo, useContext } = React;

const BaseForm = memo((props: BaseProps) => {
  const { formSchema, fieldsSchema = [] } = props;
  const contextAPI = useContext(Context);
  const { getFieldSchema } = contextAPI;
  return fieldsSchema.map((fieldSchema: FieldSchema, i: number) => {
    const { name } = fieldSchema;
    const pluginSchema = getFieldSchema(name);
    let nextFieldSchema = clone(fieldSchema);
    if (pluginSchema) {
      nextFieldSchema = Object.keys(pluginSchema).reduce(
        (nextFieldSchema, name) => {
          const value = pluginSchema[name];
          set(nextFieldSchema, name, value);
        },
        nextFieldSchema
      );
    }
    const { index } = nextFieldSchema;
    const isShow = !formSchema || index == null || formSchema.index === index;
    return isShow && <IField key={i} formSchema={i} {...nextFieldSchema} />;
  });
});
export default BaseForm;
