import * as React from 'react';
import pick from 'lodash.pick';
import { Provider } from '../context';
import TypeForm from './type';
import FormModel from '../../models/Form';
import ContextModel from '../../models/Context';
import ActionModel from '../../models/Action';
import toPairsFunc from '../../utils/toPairsFunc';
import { FormProps } from '../../typings';
const { PureComponent } = React;

export class SchemaForm extends PureComponent<FormProps> {
  private formModel: FormModel;
  private contextModel: ContextModel;
  private actionModel: ActionModel;
  constructor(props: FormProps) {
    super(props);
    const { initialData, widgets, functions, constants, actions } = props;
    this.formModel = new FormModel(initialData);
    this.contextModel = new ContextModel({ widgets, functions, constants });
    this.actionModel = new ActionModel(actions);
    const { formModel, contextModel, actionModel } = this;
    const { subscribe } = actionModel;
    subscribe('setFieldSchema', toPairsFunc(contextModel.setFieldSchema));
    subscribe('setFieldCRule', toPairsFunc(formModel.setFieldCRule));
    subscribe('setFieldIRule', toPairsFunc(formModel.setFieldIRule));
    subscribe('setFieldsValue', this.setFieldsValue);
    subscribe('setFieldsError', this.setFieldsError);
    subscribe('onCheck', this.onCheck);
    subscribe('onSubmit', this.onSubmit);
    subscribe('onRefresh', this.forceUpdate);
  }
  // contextAPI
  get contextAPI(): any {
    const { dispatch, subscribe } = this.actionModel;
    const {
      getWidget,
      getFunction,
      getConstant,
      getFieldSchema
    } = this.contextModel;
    const rest = pick(this, ['getFieldsValue', 'getFieldsError']);
    return {
      dispatch,
      subscribe,
      getWidget,
      getFunction,
      getConstant,
      getFieldSchema,
      ...rest
    };
  }
  public getFieldsError = (params: any) =>
    this.formModel.getFieldsError(params);
  public getFieldsValue = (params: any) =>
    this.formModel.getFieldsValue(params);
  // form ref instance API
  public setFieldsError = (params: any) =>
    toPairsFunc(this.formModel.setFieldsError)(params);
  public setFieldsValue = (fields: any) => {
    console.log(fields);
    toPairsFunc(this.formModel.setFieldsValue)(fields);
    this.forceUpdate();
  };
  public onCheck = () => {};
  public onSubmit = () => {};
  render() {
    const { contextAPI, props } = this;
    const { className, style, form = {}, fields = [] } = props;
    return (
      <div className={className} style={style}>
        <Provider value={contextAPI}>
          <TypeForm formSchema={form} fieldsSchema={fields} />
        </Provider>
      </div>
    );
  }
}
