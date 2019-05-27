import * as _widgets from '../widgets';
import fetch from '../lib/fetch';
import toOption from '../utils/toOption';
import { IContext, FetchOption } from '../typings';

export default class ContextModel {
  private widgets = {};
  private constants = {};
  private functions = {};
  private fieldSchemas = {};

  constructor(context: IContext) {
    const { widgets, constants, functions, fetches } = context;
    this.widgets = Object.assign({}, _widgets, widgets);
    this.constants = constants || {};
    this.functions = functions || {};
    this.handleFetchInit(fetches);
  }
  private handleFetchInit = (fetchOptions: { [key: string]: FetchOption }) => {
    const fetchFuncs = Object.keys(fetchOptions).reduce((prev, key) => {
      const option = toOption(fetchOptions[key]);
      prev[key] = () => fetch(option);
      return prev;
    }, []);
    Object.assign(this.functions, fetchFuncs);
  };
  // Bean: GET Function
  public getWidget = (key: string) => this.widgets[key] || null;
  public getConstant = (key: string) => this.constants[key] || null;
  public getFunction = (key: string) => this.functions[key] || null;
  public getFieldSchema = (id: string) => this.fieldSchemas[id] || null;
  // Bean: SET Function
  public setConstant = (key: string, constant: any) => {
    this.constants[key] = constant;
  };
  public setFunction = (key: string, func: any) => {
    this.functions[key] = func;
  };
  public setFieldSchema = (id: string, params: any) => {
    const fieldSchema = this.fieldSchemas[id] || {};
    params &&
      Object.keys(params).forEach((schemaName) => {
        const schemaValue = params[schemaName];
        fieldSchema[schemaName] = schemaValue;
      });
    this.fieldSchemas[id] = fieldSchema;
  };
}
