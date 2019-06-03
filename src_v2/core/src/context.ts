import toOption from '../utils/toOption'
import { Option } from '../typings'

export default class Context {
  private widgets = {};
  private constants = {};
  private functions = {};
  private fieldSchemas = {};

  constructor(params: any) {
    const { widgets, constants, functions, fetches } = params;
    this.widgets = widgets;
    this.constants = constants;
    this.functions = functions;
    this.handleFetchInit(fetches);
  }
  private handleFetchInit = (fetches: { [key: string]: Option }) => {
    const fetchFuncs = Object.keys(fetches).reduce((prev, key) => {
      const option = toOption(fetches[key]);
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
