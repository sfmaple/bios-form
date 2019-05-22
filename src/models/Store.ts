import get from 'lodash.get';
import set from 'lodash.set';
import pick from 'lodash.pick';
import clone from 'lodash.clonedeep';
import { IStore, VerifyRule, EnterRule } from '../typings';

export default class StoreModel {
  private data = {};
  private errors = {};
  // private formRules = {};
  // The rules used when the form verify field data
  private fieldsVerifyRule = {};
  // The rules used when the form enter field data
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
  public getFieldsVerifyRule = (ids: string[]) => {
    const { fieldsVerifyRule } = this;
    return ids ? pick(fieldsVerifyRule, ids) : fieldsVerifyRule;
  };
  public getFieldsEnterRule = (ids: string[]) => {
    const { fieldsEnterRule } = this;
    return ids ? pick(fieldsEnterRule, ids) : fieldsEnterRule;
  };
  public getFieldsError = (ids: string[]) => {
    const { errors } = this;
    return ids ? pick(errors, ids) : errors;
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
  public setFieldVerifyRule = (id: string, verifyRule: VerifyRule) => {
    const { fieldsVerifyRule } = this;
    if (verifyRule) {
      fieldsVerifyRule[id] = verifyRule;
    } else {
      delete fieldsVerifyRule[id];
    }
  };
  public setFieldEnterRule = (id: string, enterRule: EnterRule) => {
    const { fieldsEnterRule } = this;
    if (enterRule) {
      fieldsEnterRule[id] = enterRule;
    } else {
      delete fieldsEnterRule[id];
    }
  };
  public setFieldError = (id: string, error: any) => {
    this.errors[id] = error;
  };
  public setFieldValue = (name: string, value: any) => {
    const { data } = this;
    name ? set(data, name, value) : Object.assign(data, value);
  };
}
