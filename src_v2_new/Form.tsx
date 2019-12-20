import React, { PureComponent } from 'react';
import get from 'lodash.get';
import set from 'lodash.set';
import pick from 'lodash.pick';
import clone from 'lodash.clonedeep';
import EventBus from './lib/EventBus';
import Context from './lib/context';
import { Provider } from './utils/context';
import { FormProps } from '../typings';

const getContext = Symbol('getContext');
export default class Form extends PureComponent<FormProps, any> {
	ctxIns: Context;
	eventBus: EventBus;
	constructor(props: FormProps) {
		super(props);
		const { defaultValue } = props;
		this.ctxIns = new Context(pick(props, Context.optKeys));
		this.eventBus = new EventBus();
		this.state = {
			value: defaultValue || {},
			error: {}
		};
	}
	private get [getContext]() {
		const { ctxIns, eventBus } = this;
		return { context: ctxIns.option, eventBus };
	}
	public getFieldsError = (names?: string[]) => {
		const { error } = this.state;
		if (!names) return error;
		const valueObj = names.reduce((prev: any, name) => {
			const errorMap = error[name];
			const errorList = Object.values(errorMap);
			prev[name] = errorList;
			return prev;
		}, {});
		return valueObj;
	};
	public setFieldsError = (errorMap: any) => {
		const { eventBus } = this;
		const { error } = this.state;
		for (const key in errorMap) {
			// key: '${name}_${id}';
			const keyList = key.split('_');
			const nameStr = keyList[0];
			const idStr = keyList[1];
			const err = errorMap[key];
			if (err == null) {
				error[nameStr] && delete error[nameStr][idStr];
				Object.values(error[nameStr]).length && delete error[nameStr];
			} else {
				!error[nameStr] && (error[nameStr] = {});
				error[nameStr][idStr] = err;
			}
		}
		eventBus.dispatch('setFieldsError', errorMap);
	};
	public getFieldsValue = (names?: string[]) => {
		const { value } = this.state;
		if (!names) return clone(value);
		const valueObj = names.reduce((prev, name) => {
			const val = get(value, name);
			set(prev, name, clone(val));
			return prev;
		}, {});
		return valueObj;
	};
	public setFieldsValue = (valueMap: any) => {
		const { eventBus } = this;
		const { value } = this.state;
		for (const key in valueMap) {
			const val = clone(valueMap[key]);
			set(value, key, val);
		}
		eventBus.dispatch('setFieldsValue', valueMap);
	};
	public onValidate = () => {
		// TODO: 校验操作
	};
	public onSubmit = (callback?: Function) => {
		const {} = this.state;
		// TODO: 提交操作
	};
	render() {
		const { props, children } = this.props;
		return (
			<form {...props}>
				<Provider value={this[getContext]}>{children}</Provider>
			</form>
		);
	}
}
