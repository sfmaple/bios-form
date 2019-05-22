import * as React from 'react';
import get from 'lodash.get';
import set from 'lodash.set';
import isEqual from 'lodash.isequal';
import { DEFAULT_CHECK_MESSAGE } from '../../constants';
import { IFieldProps, IFieldState, IParams } from '../../typings';
const { PureComponent } = React;

export default class BaseField extends PureComponent<IFieldProps, IFieldState> {
  static defaultProps = {
    common: {},
    rules: {}
  };
  private dependNames: string[] = [];
  private dependConstants: string[] = [];
  private dependFunctions: string[] = [];
  private prevData: any;
  private Widget: React.ComponentClass;
  constructor(props: IFieldProps) {
    super(props);
    const { name, widget, common, contextAPI } = this.props;
    const { dependNames = [], dependConstants = [], dependFunctions = [] } = common;
    const { getWidget, getFieldsValue } = contextAPI;
    this.Widget = getWidget(widget);
    const formData = getFieldsValue();
    this.dependNames = name ? dependNames.concat(name) : dependNames;
    this.dependConstants = dependConstants;
    this.dependFunctions = dependFunctions;
    this.prevData = this.dependNames.reduce((prev: any, name: string) => {
      const value = get(formData, name);
      set(prev, name, value);
      return prev;
    }, {});
  }
  static getDerivedStateFromProps(props: IFieldProps, state: IFieldState) {
    const { value } = state
    const { name, contextAPI } = props;
    const { getFieldsValue } = contextAPI;
    const nextValue = name ? get(getFieldsValue([name]), name) : getFieldsValue();
    if (!isEqual(value, nextValue)) {
      return { value: nextValue };
    }
    return null;
  }
  componentWillMount() {
    const { name, rules, contextAPI } = this.props;
    const { check, enter } = rules;
    const { subscribe, dispatch } = contextAPI;
    check && dispatch('setFieldCheckRule', { [name]: check });
    enter && dispatch('setFieldCheckRule', { [name]: enter });
    subscribe('setFieldsValue', this.onDependNames);
    subscribe('setConstant', this.onDependConstants);
    subscribe('setFunction', this.onDependFunctions);
  }
  componentDidMount() {
    const { value } = this.state
    const { name, defaultValue, contextAPI } = this.props
    const { dispatch } = contextAPI;
    value === undefined && dispatch('setFieldsValue', { [name]: defaultValue })
  }
  componentWillUnmount() {
    const { name, rules, contextAPI } = this.props;
    const { check, enter } = rules;
    const { unsubscribe, dispatch } = contextAPI;
    check && dispatch('removeFieldCheckRule', { [name]: check });
    enter && dispatch('removeFieldCheckRule', { [name]: enter });
    unsubscribe('setFieldsValue', this.onDependNames);
    unsubscribe('setConstant', this.onDependConstants);
    unsubscribe('setFunction', this.onDependFunctions);
  }
  onDependNames = (params: IParams) => {
    const { dependNames, prevData } = this;
    let isUpdate = false;
    dependNames.forEach((name: string) => {
      const prevValue = get(prevData, name);
      const nextValue = get(params, name);
      const judge = !isEqual(nextValue, prevValue);
      if (judge) {
        set(prevData, name, nextValue);
        !isUpdate && (isUpdate = judge);
      }
    });
    isUpdate && this.forceUpdate();
  };
  onDependConstants = (params: IParams) => {
    const { dependConstants } = this;
    const keys = Object.keys(params);
    const isUpdate = dependConstants.some((key) => {
      return keys.indexOf(key) !== -1;
    });
    isUpdate && this.forceUpdate();
  };
  onDependFunctions = (params: IParams) => {
    const { dependFunctions } = this;
    const keys = Object.keys(params);
    const isUpdate = dependFunctions.some((key) => {
      return keys.indexOf(key) !== -1;
    });
    isUpdate && this.forceUpdate();
  };
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
