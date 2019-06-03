import get from 'lodash.get';
import set from 'lodash.set';
import pick from 'lodash.pick';
import nanoid from 'nanoid';
import Form from './src/form';
import Action from './src/action';
import Context from './src/context';
import toPairsFunc from './utils/toPairsFunc'
import { IRest, FieldSchema } from './typings';

const parserFields = (initialValue: any, fieldsSchema: FieldSchema[]) => {
  fieldsSchema.forEach((fieldSchema: FieldSchema) => {
    const { id, name, defaultValue, childFields } = fieldSchema;
    // initial build id
    if (id == null) fieldSchema.id = nanoid();
    // initial defaultValue
    const currentValue = get(initialValue, name);
    const isUpdate = currentValue === undefined && defaultValue !== undefined;
    if (isUpdate) name ? set(initialValue, name, defaultValue) : Object.assign(initialValue, defaultValue);
    childFields && parserFields(initialValue, childFields);
  });
};

export const createForm = (rest: IRest) => {
  const {
    initialValue = {},
    formSchema = {},
    fieldsSchema = [],
    actions = [],
    widgets = {},
    constants = {},
    functions = {},
    fetches = {},
    onSubmit = () => {}
  } = rest;
  // parser formSchema
  const { rules = {} } = formSchema
  // parser fieldsSchema
  parserFields(initialValue, fieldsSchema);
  // initial class
  const formModel = new Form({ initialValue, rules });
  const actionModel = new Action({ actions });
  const contextModel = new Context({ widgets, constants, functions, fetches });
  // register event
  const { subscribe } = actionModel;
  subscribe('setFieldSchema', toPairsFunc(contextModel.setFieldSchema));
  subscribe('setConstant', toPairsFunc(contextModel.setConstant));
  subscribe('setFunction', toPairsFunc(contextModel.setFunction));
  subscribe('setFieldsValue', toPairsFunc(formModel.setFieldValue));
  subscribe('setFieldsError', toPairsFunc(formModel.setFieldError));
  // contextAPI
  const formRest = pick(formModel, ['getFieldsValue', 'getFieldsError'])
  const actionRest = pick(actionModel, ['dispatch', 'subscribe', 'unsubscribe'])
  const contextRest = pick(actionModel, ['getWidget', 'getFunction', 'getConstant', 'getFieldSchema'])
  const contextAPI = Object.assign({}, formRest, actionRest, contextRest)
  return;
};
export default createForm;
