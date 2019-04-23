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
  private fieldsCRule = {};
  // The rules used when the form enters field data
  private fieldsERule = {};
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
  public getFieldsCRule = (names: string[]) => {
    const { fieldsCRule } = this;
    return names ? pick(fieldsCRule, names) : fieldsCRule;
  };
  public getFieldsERule = (names: string[]) => {
    const { fieldsERule } = this;
    return names ? pick(fieldsERule, names) : fieldsERule;
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
  public setFieldCRule = (name: string, checkRule: CheckRule) => {
    this.fieldsCRule[name] = checkRule;
  };
  public setFieldERule = (name: string, enterRule: EnterRule) => {
    this.fieldsERule[name] = enterRule;
  };
  public setFieldError = (name: string, error: Error) => {
    this.errors[name] = error;
  };
  public setFieldValue = (name: string, value: any) => {
    const { data } = this;
    set(data, name, value);
  };
}
