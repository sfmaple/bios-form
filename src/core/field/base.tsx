import * as React from 'react';
import get from 'lodash.get';
import toAction from '../../utils/toAction';
import toDepend from '../../utils/toDepend';
import { DEFAULT_VERIFY_MESSAGE } from '../../constants';
import { IFieldProps, IFieldState } from '../../typings';
const { PureComponent } = React;

export default class BaseField extends PureComponent<IFieldProps, IFieldState> {
  static defaultProps = {
    common: {},
    rules: {},
    action: {}
  };
  private Widget: React.ComponentClass;
  constructor(props: IFieldProps) {
    super(props);
    const { widget, common, contextAPI } = this.props;
    const { defaultValue } = common;
    const { getWidget, getFieldsValue, dispatch } = contextAPI;
    this.Widget = getWidget(widget);
    this.state = { isError: false };
    toDepend.call(this);
    toAction.call(this);
    const value = name ? get(getFieldsValue([name]), name) : getFieldsValue();
    if (value === undefined && defaultValue !== undefined) {
      dispatch('setFieldsValue', { [value || '']: defaultValue });
    }
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, msgError: error.message };
  }
  componentWillMount() {
    // @ts-ignore
    const { onDependNames, onDependConstants, onDependFunctions } = this;
    const { id, rules, contextAPI } = this.props;
    const { enter, verify } = rules;
    const { subscribe, dispatch } = contextAPI;
    id && enter && dispatch('setFieldEnterRule', { [id]: enter });
    id && verify && dispatch('setFieldVerifyRule', { [id]: verify });
    subscribe('setFieldsValue', onDependNames);
    subscribe('setConstant', onDependConstants);
    subscribe('setFunction', onDependFunctions);
  }
  componentWillUnmount() {
    // @ts-ignore
    const { onDependNames, onDependConstants, onDependFunctions } = this;
    const { id, rules, contextAPI } = this.props;
    const { enter, verify } = rules;
    const { unsubscribe, dispatch } = contextAPI;
    id && enter && dispatch('setFieldEnterRule', { [id]: undefined });
    id && verify && dispatch('setFieldVerifyRule', { [id]: undefined });
    unsubscribe('setFieldsValue', onDependNames);
    unsubscribe('setConstant', onDependConstants);
    unsubscribe('setFunction', onDependFunctions);
  }
  handleExtraProps = (extra: any) => {
    // @ts-ignore
    const { plusProps } = this;
    const extraProps = plusProps && plusProps();
    const { common, contextAPI } = this.props;
    const { isCustom = false } = common || {};
    isCustom && (extra.contextAPI = contextAPI);
    return Object.assign({}, extraProps, extra);
  };
  onChange = (event: any) => {
    const { name, common, contextAPI } = this.props;
    const { valueName = null } = common || {};
    const { dispatch } = contextAPI;
    const value = valueName ? get(event, valueName) : event;
    dispatch('setFieldsValue', { [name || '']: value });
  };
  render() {
    if (this.state.hasError) return <span>{`Went wrong: ${this.state.msgError}`}</span>;
    const { Widget, onChange } = this;
    const { id, name, title, common, rules, props, contextAPI } = this.props;
    const { message = DEFAULT_VERIFY_MESSAGE } = common;
    const required = get(rules, 'verify.required', false);
    const { getFieldsError, getFieldsValue } = contextAPI;
    const error = getFieldsError([id])[id];
    const value = name ? get(getFieldsValue([name]), name) : getFieldsValue();
    const extraProps = this.handleExtraProps({ value, onChange });
    return (
      (Widget && (
        <div>
          {title != null && (
            <div>
              {required && <span style={{ color: 'red' }}>*</span>}
              {!!title && <span>{` ${title}：`}</span>}
            </div>
          )}
          <div>
            <Widget {...extraProps} {...props} />
          </div>
          {error != null && <div>{typeof error === 'string' ? error : message}</div>}
        </div>
      )) ||
      null
    );
  }
}
