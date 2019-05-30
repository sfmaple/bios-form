import * as React from 'react';
import get from 'lodash.get';
import BaseForm from './base';
import { TypeProps } from '../../typings';
const { memo } = React;

const FormMap = { Base: BaseForm }
const TypeForm = memo(
  (props: TypeProps) => {
    const { formSchema } = props;
    const { type = 'Base' } = formSchema || {};
    const Form: any = FormMap[type] || null;
    return Form && <Form {...props} />;
  },
  (prevProps, nextProps) =>
    get(prevProps, 'formSchema.type') === get(nextProps, 'formSchema.type')
);
TypeForm.displayName = 'TypeForm';
export default TypeForm;
