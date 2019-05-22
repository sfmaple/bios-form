import { Component } from 'react';
import Mitt from './lib/mitt';

// Schema
export type IFormSchema = any;
export type IFieldSchema = any;
export type IContextAPI = any;
// Form Component
export type IParams = {
  [key: string]: any;
};
export interface IProps {
  [key: string]: any;
}
export interface TypeProps {
  [key: string]: any;
}
export interface BaseProps {
  [key: string]: any;
}
// Field Component
export interface IFieldProps {
  [key: string]: any;
}
export interface IFieldState {
  [key: string]: any;
}
// model types
export type VerifyRule = any;
export type EnterRule = any;
export type IStore = {
  initialData: any;
};
export type IContext = {
  widgets: { [key: string]: Component };
  constants: { [key: string]: any };
  functions: { [key: string]: Function };
};
export type IAction = {
  actions: Action[];
};
export type CAction = {
  [key: string]: any;
};
export type Action = {
  name: string;
  handler: Mitt.Handler;
};
