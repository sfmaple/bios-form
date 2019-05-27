import get from 'lodash.get';
import { VerifyRule } from '../typings';
import { VERIFY_RULE_KEYS } from '../constants';

const execute = (value: any, rule: VerifyRule, getFunction: Function) => {
  let msgError: any = null;
  const { name } = rule;
  VERIFY_RULE_KEYS.some((key) => {
    const ruleValue = rule[key];
    if (ruleValue == null) return false;
    switch (key) {
      case 'required': {
        const isError = (!!ruleValue && value === undefined) || value === '';
        isError && (msgError = `[${name}]: the value cannot be 'undefined' or empty string `);
        return isError;
      }
      case 'enum': {
        const isError = value !== undefined && ruleValue.includes(value);
        isError && (msgError = `[${name}]: the value must be one of enum(${ruleValue.toString()}) `);
        return isError;
      }
      case 'regex': {
        const regexp = new RegExp(ruleValue);
        const isError = value !== undefined && !regexp.test(value);
        isError && (msgError = `[${name}]: the value must conform to the regexp(${ruleValue})`);
        return isError;
      }
      case 'range':
        const { min, max } = ruleValue;
        const isError = min !== undefined && value < min && (max !== undefined && value > max);
        isError &&
          (msgError = `[${name}]: the value cannot less than min(${min || ''}) and greater than max(${max || ''})`);
        return isError;
      case 'custom': {
        const callback = getFunction(ruleValue);
        msgError = callback && callback(value);
        return !!msgError;
      }
      default: {
        return false;
      }
    }
  });
  return msgError;
};
export default function(names: string[]): any {
  const { formData, getFieldsVerifyRule, setFieldError } = this.storeModel;
  const { getFunction } = this.contextModel;
  const renderIds: string[] = [];
  const verifyRules = getFieldsVerifyRule();
  const errors = Object.keys(verifyRules).reduce((prev, id: string) => {
    let message: any = null;
    const rules = verifyRules[id];
    const isUpdate = rules.some((rule: VerifyRule) => {
      const { name } = rule;
      const value = get(formData, name);
      const msgError = names.includes(name) && execute(value, rule, getFunction);
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
