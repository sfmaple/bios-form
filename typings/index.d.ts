import { Component } from 'react';
import './native';
import './model';
import './render';

declare module 'bios-form';
export class BiosForm extends Component<any> {}
export class Form extends Component<any> {}
export class FormItem extends Component<any> {}
export class Context extends Component<any> {}
export type ContextAPI = any;
declare type ContextOption = {
	widgets?: { [key: string]: Widget };
	actions?: { [key: string]: Function };
	constants?: { [key: string]: any };
	functions?: { [key: string]: Function };
};
declare type NativeFormProps = {
	name?: string;
	action?: string;
	method?: string;
	enctype?: string;
};
declare type ContextMap = {
	model?: any;
};
declare enum FormStatus {
	Edit = 'edit',
	Readonly = 'readonly',
	Disabled = 'disabled',
	Preview = 'preview'
}
declare enum FormLayout {
	Flow = 'flow'
}
declare type FormRule = {
	verify?: boolean;
	status?: FormStatus;
	layout?: FormLayout;
};
declare type FormProps = {
	tags?: string[];
	rule?: FormRule;
	defaultValue?: any;
	props?: NativeFormProps;
	// 表单上下文支持
} & ContextOption;
declare type ItemProps = {
	id: string;
};
declare type Widget = React.ComponentClass | React.FunctionComponent;
declare type BiosFromProps = {
	forwardRef: any;
	header?: (contextAPI: any) => JSX.Element;
	footer?: (contextAPI: any) => JSX.Element;
	form?: FormProps;
	items?: ItemProps[];
	defaultValue?: any;
	// 表单上下文支持
} & ContextOption;
