import React from 'react';
import { Layout } from './Layout';
import { Base as BaseComponent } from '../core/Base';
import { withContext } from '../utils/withContext';
import { FieldSchema, ContextAPI } from '../../typings';

const handleWidget = (widget?: string, context?: ContextAPI) => {
  if (!widget || !context || !context.getWidget) return;
  const { getWidget } = context;
  return getWidget(widget);
};
const handleError = (id?: string, context?: ContextAPI) => {
  if (!id || !context || !context.getFieldsError) return;
  const { getFieldsError } = context;
  return getFieldsError([id])[id];
};
@(withContext as any)
export class Field extends BaseComponent<FieldSchema> {
  render() {
    const { id } = this;
    const { widget, context, layout, props = {} } = this.props;
    const Widget = handleWidget(widget, context);
    const error = handleError(id, context);
    return (
      <Layout {...layout} error={error}>
        {Widget && <Widget {...props} />}
      </Layout>
    );
  }
}
