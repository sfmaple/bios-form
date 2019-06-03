import get from 'lodash.get';
import set from 'lodash.set';
import { Option } from '../typings';

const buildRequest = (config: any) => [
  (data: any) => {
    const values: string[] = Object.values(config);
    Object.keys(config).forEach((key: string) => {
      const value = config[key];
      set(data, key, get(data, value));
    });
    values.forEach((value) => {
      set(data, value, undefined);
    });
  }
];
const buildResponse = (config: any) => [
  (data: any) => {
    const values: string[] = Object.values(config);
    Object.keys(config).forEach((key: string) => {
      const value = config[key];
      set(data, key, get(data, value));
    });
    values.forEach((value) => {
      set(data, value, undefined);
    });
  }
];

export default (fetchOption: Option) => {
  const { transform = {}, ...option } = fetchOption;
  const { request, response } = transform;
  request && (option.transformRequest = buildRequest(request));
  response && (option.transformRequest = buildResponse(response));
  return option;
};
