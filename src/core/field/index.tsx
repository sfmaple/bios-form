import * as React from 'react';
import get from 'lodash.get';
import Context from '../context';
import { FieldProps } from '../../typings';
const { useState, useEffect, useContext, useCallback } = React;

export default function IField(fieldProps: FieldProps) {
  const contextAPI = useContext(Context);
  const { getWidget, getFieldsValue, getFieldsError, dispatch } = contextAPI;
  const { name, widget, CRule, IRule, ...rest } = fieldProps;
  const [Widget, setWidget]: any = useState(null);
  useEffect(() => {
    const Widget = getWidget(widget);
    setWidget(() => Widget);
  }, [widget]);
  const onChange = useCallback((value) => {
    dispatch('setFieldsValue', { [name]: value });
  }, []);
  useEffect(() => {
    CRule && dispatch('setFieldCRule', { [name]: CRule });
    IRule && dispatch('setFieldIRule', { [name]: IRule });
    return () => {
      CRule && dispatch('setFieldCRule', { [name]: undefined });
      IRule && dispatch('setFieldIRule', { [name]: undefined });
    };
  }, []);

  const { required = false } = CRule || {};
  const { status, title, common, props } = rest;
  const { isCustom = false } = common || {};
  const error = getFieldsError([name])[name];
  const value = name ? get(getFieldsValue([name]), name) : getFieldsValue();
  const nextProps = { status, error, value, onChange, ...props };
  return (
    Widget && (
      <div>
        {title != null && (
          <div>
            {required && <span style={{ color: 'red' }}>* </span>}
            {!!title && `${title}：`}
          </div>
        )}
        <div>
          <Widget context={isCustom ? contextAPI : {}} {...nextProps} />
        </div>
      </div>
    )
  );
}
