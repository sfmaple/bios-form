export type FormSchema = any;
export type FieldSchema = any;
export type Option = any;

export type IParams = any
export type Action = {
  name: string;
  handler: Function;
};
export type IRest = {
  initialValue?: any;
  formSchema?: FormSchema;
  fieldsSchema?: FieldSchema[];
  widgets?: { [key: string]: any };
  constants?: { [key: string]: any };
  functions?: { [keyFunc: string]: Function };
  fetches?: { [keyFunc: string]: Option  }
  actions?: Action[];
  [key: string]: any
};
