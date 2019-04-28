import * as React from 'react';
import omit from 'lodash.omit';
import pick from 'lodash.pick';
import TypeForm from './type';
import { Provider } from '../context';
import StoreModel from '../../models/Store';
import ContextModel from '../../models/Context';
import ActionModel from '../../models/Action';
import toPairsFunc from '../../utils/toPairsFunc';
import { PICK_FORM_PROPS_KEYS } from '../../constants';
import { IProps, IParams } from '../../typings';
const { PureComponent } = React;

export class SchemaForm extends PureComponent<IProps> {
  private storeModel: StoreModel;
  private contextModel: ContextModel;
  private actionModel: ActionModel;
  constructor(props: IProps) {
    super(props);
    const { initialData, widgets, constants, functions, actions } = props;
    this.storeModel = new StoreModel({ initialData });
    this.contextModel = new ContextModel({ widgets, constants, functions });
    this.actionModel = new ActionModel({ actions });
    const { storeModel, contextModel, actionModel } = this;
    const { subscribe } = actionModel;
    subscribe('setFieldSchema', toPairsFunc(contextModel.setFieldSchema));
    subscribe('setFieldCheckRule', toPairsFunc(storeModel.setFieldCheckRule));
    subscribe('setFieldEnterRule', toPairsFunc(storeModel.setFieldEnterRule));
    subscribe('removeFieldCheckRule', toPairsFunc(storeModel.cancelFieldCheckRule));
    subscribe('removeFieldEnterRule', toPairsFunc(storeModel.cancelFieldEnterRule));
    subscribe('setFieldsError', toPairsFunc(storeModel.setFieldError));
    subscribe('setFieldsValue', toPairsFunc(storeModel.setFieldValue));
    subscribe('onCheck', this.onCheck);
    subscribe('onSubmit', this.onSubmit);
  }
  get contextAPI() {
    const { dispatch, subscribe, unsubscribe } = this.actionModel;
    const { getWidget, getFunction, getConstant, getFieldSchema } = this.contextModel;
    const rest = pick(this, ['getFieldsValue', 'getFieldsError']);
    return {
      dispatch,
      subscribe,
      unsubscribe,
      getWidget,
      getFunction,
      getConstant,
      getFieldSchema,
      ...rest
    };
  }
  public getFieldsError = (names: string[]) => this.storeModel.getFieldsError(names);
  public getFieldsValue = (names: string[]) => this.storeModel.getFieldsValue(names);
  public setFieldsError = (params: IParams) => {
    const { actionModel } = this;
    const { dispatch } = actionModel;
    dispatch('setFieldsError', params);
  };
  public setFieldsValue = (params: IParams) => {
    const { actionModel } = this;
    const { dispatch } = actionModel;
    dispatch('setFieldsValue', params);
  };
  public onCheck = () => {};
  public onSubmit = () => {};
  render() {
    const { contextAPI, props } = this;
    const { className, style, form, fields, children, ...other } = props;
    const rest = omit(other, PICK_FORM_PROPS_KEYS);
    return (
      <div className={className} style={style}>
        <form {...rest}>
          <Provider value={contextAPI}>
            <TypeForm formSchema={form || {}} fieldsSchema={fields || []} />
          </Provider>
          {children}
        </form>
      </div>
    );
  }
}
