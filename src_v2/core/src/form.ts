import get from 'lodash.get';
import set from 'lodash.set';
import pick from 'lodash.pick';
import clone from 'lodash.clonedeep';

export default class Form {
  private data = {};
  private errors = {};
  private rules  = {};
  constructor(params: any) {
    const { initialValue, rules } = params;
    this.data = clone(initialValue)
    this.rules = rules
  }
  // GET Method Function
  public get formData() {
    return this.data;
  }
  public get formErrors() {
    return this.errors;
  }
  public get formRules() {
    return this.rules
  }
  // value
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
  public setFieldValue = (name: string, value: any) => {
    const { data } = this;
    name ? set(data, name, value) : Object.assign(data, value);
  };
  // error
  public getFieldsError = (ids: string[]) => {
    const { errors } = this;
    return ids ? pick(errors, ids) : errors;
  };
  public setFieldError = (id: string, error: any) => {
    if (error) {
      this.errors[id] = error;
    } else {
      delete this.errors[id];
    }
  };
}
