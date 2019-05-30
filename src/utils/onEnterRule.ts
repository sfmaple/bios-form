import { EnterRule, IParams } from '../typings';
import { ENTER_RULE_KEYS } from '../constants';

const execute = (value: any, rule: EnterRule, getFunction: Function) => {
  let isError = false;
  // const { name } = rule;
  ENTER_RULE_KEYS.some((key) => {
    const ruleValue = rule[key];
    if (ruleValue == null) return false;
    switch (key) {
      case 'valid': {
        return ruleValue.every((char: string) => value == null || value.includes(char));
      }
      case 'invalid': {
        return ruleValue.every((char: string) => value == null || !value.includes(char));
      }
      case 'length': {
        return !!(value && value.length > ruleValue);
      }
      case 'enum': {
        return !ruleValue.includes(value);
      }
      case 'regex': {
        const regexp = new RegExp(ruleValue);
        return !regexp.test(value);
      }
      case 'range': {
        const { min, max } = ruleValue;
        const isError = min !== undefined && value < min && (max !== undefined && value > max);
        return isError;
      }
      case 'custom': {
        const callback = getFunction(ruleValue);
        isError = callback && callback(value);
        return !!isError;
      }
      default: {
        return false;
      }
    }
  });
  return !!isError;
};

export default function(params: IParams) {
  const { getFieldsEnterRule } = this.storeModel;
  const { getFunction } = this.contextModel;
  const names = Object.keys(params);
  const enterRules = getFieldsEnterRule();
  const omitNames: string[] = Object.keys(enterRules).reduce((prev: string[], id: string) => {
    const rule = enterRules[id];
    const { name } = rule;
    const value = params[name];
    const isError = names.includes(name) && execute(value, rule, getFunction);
    isError && prev.push(name);
    return prev;
  }, []);
  return names.filter((name) => !omitNames.includes(name));
}
