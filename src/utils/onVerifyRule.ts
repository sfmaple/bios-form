import get from 'lodash.get';
import { VerifyRule } from '../typings';
import { VERIFY_RULE_KEYS } from '../constants';

const execute = (formData: any, rule: VerifyRule, getFunction: Function) => {
  let msgError: any = null;
  const { name } = rule;
  const value = get(formData, name);
  VERIFY_RULE_KEYS.some((key) => {
    const ruleValue = rule[key];
    if (ruleValue == null) return false;
    switch (key) {
      case 'required': {
        const judge = (!!ruleValue && value === undefined) || value === '';
        judge && (msgError = `[${name}]: the value cannot be 'undefined' or empty string `);
        return judge;
      }
      case 'enum': {
        const judge = value !== undefined && ruleValue.includes(value);
        judge && (msgError = `[${name}]: the value must be one of enum(${ruleValue.toString()}) `);
        return judge;
      }
      case 'regex': {
        const regexp = new RegExp(ruleValue);
        const judge = value !== undefined && !regexp.test(value);
        judge && (msgError = `[${name}]: the value must conform to the regexp(${ruleValue})`);
        return judge;
      }
      case 'range':
        const { min, max } = ruleValue;
        const judge = min !== undefined && value < min && (max !== undefined && value > max);
        judge &&
          (msgError = `[${name}]: the value cannot less than min(${min || ''}) and greater than max(${max || ''})`);
        return judge;
      case 'custom': {
        const callback = getFunction(ruleValue);
        const msgError = callback && callback(formData);
        return !!msgError;
      }
    }
    return false;
  });
  return msgError;
};
export default function(names: string[]): any {
  const { formData, getFieldsVerifyRule, setFieldError } = this.storeModel;
  const { getFunction } = this.contentModel;
  const renderIds: string[] = [];
  const verifyRules = getFieldsVerifyRule();
  const errors = Object.keys(verifyRules).reduce((prev, id: string) => {
    let message: any = null;
    const rules = verifyRules[id];
    const isUpdate = rules.some((rule: VerifyRule) => {
      const { name } = rule;
      const msgError = names.includes(name) && execute(formData, rule, getFunction);
      if (msgError) {
        !message && (message = msgError);
        !prev[name] && (prev[name] = []);
        prev[name].push(msgError);
      }
      return !!msgError;
    });
    setFieldError(id, message);
    isUpdate && renderIds.push(id);
    return prev;
  }, {});

  return { errors, renderIds };
}
