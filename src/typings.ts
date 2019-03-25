import Mitt from './lib/mitt';

// form
export interface FormProps {
  [key: string]: any;
}
export interface TypeProps {
  [key: string]: any;
}
export interface BaseProps {
  [key: string]: any;
}
// field
export interface FieldProps {
  [key: string]: any;
}
// model types
export type Error = any;
export type Rule = any;
export type Context = any;
export type Action = {
  name: string;
  handler: Mitt.Handler;
};
// schema
export type FieldSchema = any;
