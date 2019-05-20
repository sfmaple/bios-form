import * as React from 'react';
import get from 'lodash.get';
import toAction from '../../utils/toAction';
import toDepend from '../../utils/toDepend';
import { DEFAULT_CHECK_MESSAGE } from '../../constants';
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
    this.state = {}
    toDepend.call(this);
    toAction.call(this);
    const value = name ? get(getFieldsValue([name]), name) : getFieldsValue();
    if (value === undefined && defaultValue !== undefined) {
      dispatch('setFieldsValue', { [value || '']: defaultValue });
    }
  }
  componentWillMount() {
    // @ts-ignore
    const { onDependNames, onDependConstants, onDependFunctions } = this;
    const { name, rules, contextAPI } = this.props;
    const { check, enter } = rules;
    const { subscribe, dispatch } = contextAPI;
    check && dispatch('setFieldCheckRule', { [name]: check });
    enter && dispatch('setFieldCheckRule', { [name]: enter });
    subscribe('setFieldsValue', onDependNames);
    subscribe('setConstant', onDependConstants);
    subscribe('setFunction', onDependFunctions);
  }
  componentWillUnmount() {
    // @ts-ignore
    const { onDependNames, onDependConstants, onDependFunctions } = this;
    const { name, rules, contextAPI } = this.props;
    const { check, enter } = rules;
    const { unsubscribe, dispatch } = contextAPI;
    check && dispatch('removeFieldCheckRule', { [name]: check });
    enter && dispatch('removeFieldCheckRule', { [name]: enter });
    unsubscribe('setFieldsValue', onDependNames);
    unsubscribe('setConstant', onDependConstants);
    unsubscribe('setFunction', onDependFunctions);
  }
  onChange = (event: any) => {
    const { name, common, contextAPI } = this.props;
    const { valueName = null } = common || {};
    const { dispatch } = contextAPI;
    const value = valueName ? get(event, valueName) : event;
    dispatch('setFieldsValue', { [name]: value });
  };
  onProps = () => {
    const { common, contextAPI } = this.props;
    const { getConstant, getFunction } = contextAPI;
    const { extraProps = {} } = common;
    return Object.keys(extraProps).reduce((prev, key) => {
      const { type, value } = extraProps[key];
      switch (type) {
        case 'constant':
          prev[key] = getConstant(value);
          break;
        case 'function':
          prev[key] = getFunction(value);
          break;
        default:
          prev[key] = value;
          break;
      }
      return prev;
    }, {});
  };
  handleExtraProps = (extra: any) => {
    const extraProps: any = this.onProps();
    const { common, contextAPI } = this.props;
    const { isCustom = false } = common || {};
    isCustom && (extraProps.contextAPI = contextAPI);
    return Object.assign({}, extraProps, extra);
  };
  render() {
    const { Widget, onChange } = this;
    const { name, title, common, rules, props, contextAPI } = this.props;
    const { message = DEFAULT_CHECK_MESSAGE } = common;
    const required = get(rules, 'check.required', false);
    const { getFieldsError, getFieldsValue } = contextAPI;
    const error = getFieldsError([name])[name];
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
