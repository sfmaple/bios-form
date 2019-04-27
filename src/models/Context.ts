import { IContext } from '../typings';
import * as _widgets from '../widgets';

export default class ContextModel {
  private widgets = {};
  private constants = {};
  private functions = {};
  private fieldSchemas = {};

  constructor(context: IContext) {
    const { widgets, constants, functions } = context;
    this.widgets = Object.assign({}, _widgets, widgets);
    this.constants = constants || {};
    this.functions = functions || {};
  }
  // Bean: GET Function
  public getWidget = (key: string) => this.widgets[key] || null;
  public getConstant = (key: string) => this.constants[key] || null;
  public getFunction = (key: string) => this.functions[key] || null;
  public getFieldSchema = (id: string) => this.fieldSchemas[id] || null;
  // Bean: SET Function
  public setConstants = (key: string, constant: any) => {
    this.constants[key] = constant;
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
