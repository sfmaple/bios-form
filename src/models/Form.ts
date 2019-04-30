import get from 'lodash.get';
import set from 'lodash.set';
import pick from 'lodash.pick';
import { Error, Rule } from '../typings';

export default class FormModel {
  private store = {};
  private errors = {};
  // private formRules = [];
  // The rules used when the form checks field data
  private fieldsCRule = {};
  // The rules used when the form enters field data
  private fieldsIRule = {};

  constructor(store: any = {}) {
    this.store = store;
  }
  // GET Function
  public get formData() {
    return this.store;
  }
  public get formErrors() {
    return this.errors;
  }
  public getFieldCRule = (names: string[]) => {
    if (!names) return this.fieldsCRule;
    return pick(this.fieldsCRule, names);
  };
  public getFieldIRule = (names: string[]) => {
    if (!names) return this.fieldsIRule;
    return pick(this.fieldsIRule, names);
  };
  public getFieldsError = (names: string[]) => {
    if (!names) return this.errors;
    return pick(this.errors, names);
  };
  public getFieldsValue = (names: string[]) => {
    if (!names) return this.store;
    return names.reduce((pre, name) => {
      const value = get(this.store, name);
      value !== undefined && set(pre, name, value);
      return pre;
    }, {});
  };
  // SET Function
  public setFieldCRule = (name: string, rule: Rule) => {
    this.fieldsCRule[name] = rule || {};
  };
  public setFieldIRule = (name: string, rule: Rule) => {
    this.fieldsIRule[name] = rule || {};
  };
  public setFieldsError = (name: string, error: Error) => {
    this.errors[name] = error;
  };
  public setFieldsValue = (name: string, value: any) => {
    set(this.store, name, value);
  };
}
