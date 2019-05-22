import * as React from 'react';
import get from 'lodash.get';
import BaseForm from './base';
import { TypeProps } from '../../typings';
const { memo, useState, useEffect, useCallback } = React;

const TypeForm = memo(
  (props: TypeProps) => {
    const { formSchema } = props;
    const { type = 'Base' } = formSchema || {};
    const type2Form = useCallback(() => {
      switch (type) {
        case 'Base':
          return BaseForm;
      }
      return null;
    }, []);
    const [Form, setForm]: any = useState(type2Form);
    useEffect(() => {
      const nextForm = type2Form();
      Form !== nextForm && setForm(() => nextForm);
    }, [type]);
    return Form && <Form {...props} />;
  },
  (prevProps, nextProps) =>
    get(prevProps, 'formSchema.type') === get(nextProps, 'formSchema.type')
);
TypeForm.displayName = 'TypeForm';
export default TypeForm;
