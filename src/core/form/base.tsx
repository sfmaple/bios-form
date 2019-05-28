import * as React from 'react';
import Field from '../field';
import { Consumer } from '../context';
import { BaseProps, IFieldSchema } from '../../typings';
const { memo } = React;

const BaseForm = memo((props: BaseProps) => {
  const { formSchema, fieldsSchema } = props;
  return (
    <Consumer>
      {(contextAPI) =>
        fieldsSchema.map(({ id, ...rest }: IFieldSchema, i: number) => (
          <Field key={id || i} {...rest} formSchema={formSchema} contextAPI={contextAPI} />
        ))
      }
    </Consumer>
  );
});
BaseForm.displayName = 'BaseForm';
export default BaseForm;
