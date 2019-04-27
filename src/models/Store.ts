import get from 'lodash.get';
import set from 'lodash.set';
import pick from 'lodash.pick';
import clone from 'lodash.clonedeep';
import { IStore, CheckRule, EnterRule } from '../typings';

export default class StoreModel {
  private data = {};
  private errors = {};
  // private formRules = {};
  // The rules used when the form checks field data
  private fieldsCheckRule = {};
  // The rules used when the form enters field data
  private fieldsEnterRule = {};
  constructor(store: IStore) {
    const { initialData } = store;
    this.data = clone(initialData || {});
    // this.formRules = formRules || {};
  }
  // GET Method Function
  public get formData() {
    return this.data;
  }
  public get formErrors() {
    return this.errors;
  }
  // Bean: GET Function
  public getFieldsCheckRule = (names: string[]) => {
    const { fieldsCheckRule } = this;
    return names ? pick(fieldsCheckRule, names) : fieldsCheckRule;
  };
  public getFieldsEnterRule = (names: string[]) => {
    const { fieldsEnterRule } = this;
    return names ? pick(fieldsEnterRule, names) : fieldsEnterRule;
  };
  public getFieldsError = (names: string[]) => {
    const { errors } = this;
    return names ? pick(errors, names) : errors;
  };
  public getFieldsValue = (names: string[]) => {
    const { data } = this;
    return names
      ? names.reduce((pre, name) => {
          const value = get(data, name);
          value === undefined || set(pre, name, value);
          return pre;
        }, {})
      : data;
  };
  // Bean: SET Function
  public setFieldCheckRule = (name: string, checkRule: CheckRule) => {
    const { fieldsCheckRule } = this;
    if (fieldsCheckRule[name]) {
      fieldsCheckRule[name].push(checkRule);
    } else {
      fieldsCheckRule[name] = [checkRule];
    }
  };
  public cancelFieldCheckRule = (name: string, checkRule: CheckRule) => {
    const { fieldsCheckRule } = this;
    if (fieldsCheckRule[name]) {
      fieldsCheckRule[name] = fieldsCheckRule[name].filter((rule: any) => rule !== checkRule);
    }
  };
  public setFieldEnterRule = (name: string, enterRule: EnterRule) => {
    const { fieldsEnterRule } = this;
    if (fieldsEnterRule[name]) {
      fieldsEnterRule[name].push(enterRule);
    } else {
      fieldsEnterRule[name] = [enterRule];
    }
  };
  public cancelFieldEnterRule = (name: string, enterRule: EnterRule) => {
    const { fieldsEnterRule } = this;
    if (fieldsEnterRule[name]) {
      fieldsEnterRule[name] = fieldsEnterRule[name].filter((rule: any) => rule !== enterRule);
    }
  };
  public setFieldError = (name: string, error: Error) => {
    this.errors[name] = error;
  };
  public setFieldValue = (name: string, value: any) => {
    const { data } = this;
    name ? set(data, name, value) : Object.assign(data, value);
  };
}
