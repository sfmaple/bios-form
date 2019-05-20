import get from 'lodash.get';
import set from 'lodash.set';
import isEqual from 'lodash.isequal';
import { IParams } from '../typings';

export default function() {
  const { name, common, contextAPI } = this.props;
  const { getFieldsValue } = contextAPI;
  const { dependNames = [], dependConstants = [], dependFunctions = [] } = common;
  name && dependNames.push(name);
  const formData = getFieldsValue();
  const prevData = dependNames.reduce((prev: any, name: string) => {
    const value = get(formData, name);
    set(prev, name, value);
    return prev;
  }, {});
  this.onDependNames = (params: IParams) => {
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
  this.onDependConstants = (params: IParams) => {
    const keys = Object.keys(params);
    const isUpdate = dependConstants.some((key: string) => {
      return keys.indexOf(key) !== -1;
    });
    isUpdate && this.forceUpdate();
  };
  this.onDependFunctions = (params: IParams) => {
    const keys = Object.keys(params);
    const isUpdate = dependFunctions.some((key) => {
      return keys.indexOf(key) !== -1;
    });
    isUpdate && this.forceUpdate();
  };
}
