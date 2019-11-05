// context
interface ContextAPI {
  getWidget?: (widget: string) => any;
  getFieldsValue?: (names?: string[]) => object;
  getFieldsError?: (ids?: string[]) => object;
  dispatch?: (type: string, params: any) => void;
  subscribe?: (type: string, handler: Function) => void;
  unsubscribe?: (type: string, handler: Function) => void;
}
// Form
export declare type FormSchema = any;

// Field
export declare type BaseState = {
  count?: number;
  value?: any;
  [key: string]: any;
};
export declare type BaseSchema = {
  id?: string;
  name?: string;
  depends?: {
    ids?: string[];
    values?: string[];
  };
  context?: ContextAPI;
};
export declare type FieldSchema = BaseSchema & {
  widget?: string;
  layout?: LayoutSchema;
  props?: any;
};

export declare type ArraySchema = BaseSchema & any;
export declare type GroupSchema = BaseSchema & any;

// Layout
export declare type LayoutSchema = {
  type?: string;
  error?: any;
  props?: any;
};

export declare type BiosFormSchema = any;
declare module 'bios-form';
