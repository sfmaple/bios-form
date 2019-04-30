import { Context } from '../typings';
import * as _widgets from '../widgets';

export default class ContextModel {
  private widgets = { ..._widgets };
  private constants = {};
  private functions = {};
  private fieldSchemas = {};

  constructor(context: Context) {
    const { widgets, constants, functions } = context;
    this.widgets = Object.assign(this.widgets, widgets || {});
    this.functions = functions || {};
    this.constants = constants || {};
  }
  // GET Function
  public getWidget = (key: string) => this.widgets[key] || null;
  public getConstant = (key: string) => this.constants[key] || null;
  public getFunction = (key: string) => this.functions[key] || null;
  public getFieldSchema = (name: string) => this.fieldSchemas[name] || null;
  // SET Function
  public setConstants = (key: string, constant: any) => {
    this.constants[key] = constant;
  };
  public setFieldSchema = (name: string, params: any) => {
    const fieldSchema = this.fieldSchemas[name] || {};
    params &&
      Object.keys(params).forEach((schemaName) => {
        const schemaValue = params[schemaName];
        fieldSchema[schemaName] = schemaValue;
      });
    this.fieldSchemas[name] = fieldSchema;
  };
}
