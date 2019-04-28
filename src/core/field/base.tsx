import * as React from 'react';
import get from 'lodash.get';
import set from 'lodash.set';
import isEqual from 'lodash.isequal';
import { DEFAULT_CHECK_MESSAGE } from '../../constants';
import { IFieldProps, IParams } from '../../typings';
const { PureComponent } = React;

export default class BaseField extends PureComponent<IFieldProps> {
  static defaultProps = {
    common: {},
    rules: {}
  };
  private dependNames: string[] = [];
  private prevData: any;
  private Widget: React.ComponentClass;
  constructor(props: IFieldProps) {
    super(props);
    const { name, widget, common, contextAPI } = this.props;
    const { dependNames = [] } = common;
    const { getWidget, getFieldsValue } = contextAPI;
    this.Widget = getWidget(widget);
    const formData = getFieldsValue();
    this.dependNames = name ? dependNames.concat(name) : dependNames;
    this.prevData = this.dependNames.reduce((prev: any, name: string) => {
      const value = get(formData, name);
      set(prev, name, value);
      return prev;
    }, {});
  }
  componentDidMount() {
    const { name, rules, contextAPI } = this.props;
    const { check, enter } = rules;
    const { subscribe, dispatch } = contextAPI;
    check && dispatch('setFieldCheckRule', { [name]: check });
    enter && dispatch('setFieldCheckRule', { [name]: enter });
    subscribe('setFieldsValue', this.onDependNames);
  }
  componentWillUnmount() {
    const { name, rules, contextAPI } = this.props;
    const { check, enter } = rules;
    const { unsubscribe, dispatch } = contextAPI;
    check && dispatch('removeFieldCheckRule', { [name]: check });
    enter && dispatch('removeFieldCheckRule', { [name]: enter });
    unsubscribe('setFieldsValue', this.onDependNames);
  }
  onChange = (event: any) => {
    const { name, common, contextAPI } = this.props;
    const { valueName = null } = common || {};
    const { dispatch } = contextAPI;
    const value = valueName ? get(event, valueName) : event;
    dispatch('setFieldsValue', { [name]: value });
  };
  onDependNames = (params: IParams) => {
    const { dependNames, prevData } = this;
    let isForceUpdate = false;
    dependNames.forEach((name: string) => {
      const prevValue = get(prevData, name);
      const nextValue = get(params, name);
      const isUpdate = !isEqual(nextValue, prevValue);
      if (isUpdate) {
        set(prevData, name, nextValue);
        !isForceUpdate && (isForceUpdate = isUpdate);
      }
    });
    isForceUpdate && this.forceUpdate();
  };
  onDependConstant = () => {};
  onDependFunction = () => {};
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
