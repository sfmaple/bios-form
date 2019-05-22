import * as React from 'react';
import Field from '../field';
import Context from '../context';
import { BaseProps, IFieldSchema } from '../../typings';
const { memo, useContext } = React;

const BaseForm = memo((props: BaseProps) => {
  const { formSchema, fieldsSchema } = props;
  const contextAPI = useContext(Context);
  return fieldsSchema.map(({ id, ...rest }: IFieldSchema, i: number) => (
    <Field
      key={id || i}
      {...rest}
      formSchema={formSchema}
      contextAPI={contextAPI}
    />
  ));
});
BaseForm.displayName = 'BaseForm';
export default BaseForm;
