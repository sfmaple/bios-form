import * as React from 'react';
import BaseForm from './base';
import { TypeProps } from '../../typings';
const { memo, useState, useEffect } = React;

const TypeForm = memo((props: TypeProps) => {
  const { formSchema } = props;
  const { type = 'Base' } = formSchema || {};
  const [Form, setForm]: any = useState(null);
  useEffect(() => {
    switch (type) {
      case 'Base':
        setForm(() => BaseForm);
        break;
    }
  }, [type]);
  return Form && <Form {...props} />;
});
export default TypeForm;
