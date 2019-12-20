import * as React from 'react';
import omit from 'lodash.omit';
import pick from 'lodash.pick';
import TypeForm from './type';
import { Provider } from '../context';
import StoreModel from '../../models/Store';
import ContextModel from '../../models/Context';
import ActionModel from '../../models/Action';
import toPairsFunc from '../../utils/toPairsFunc';
import onVerifyRule from '../../utils/onVerifyRule';
import onEnterRule from '../../utils/onEnterRule';
import { PICK_FORM_PROPS_KEYS } from '../../constants';
import { IProps, IParams } from '../../typings';
const { PureComponent } = React;

export class SchemaForm extends PureComponent<IProps> {
	static defaultProps = {
		initialData: {},
		form: {},
		fields: [],
		widgets: {},
		constants: {},
		functions: {},
		fetches: {},
		actions: []
	};
	public isVerify = false;
	private storeModel: StoreModel;
	private contextModel: ContextModel;
	private actionModel: ActionModel;
	constructor(props: IProps) {
		super(props);
		const { initialData, widgets, constants, functions, fetches, actions } = props;
		this.storeModel = new StoreModel({ initialData });
		this.contextModel = new ContextModel({ widgets, constants, functions, fetches });
		this.actionModel = new ActionModel({ actions });
		const { storeModel, contextModel, actionModel } = this;
		const { subscribe } = actionModel;
		subscribe('setFieldSchema', toPairsFunc(contextModel.setFieldSchema));
		subscribe('setConstant', toPairsFunc(contextModel.setConstant));
		subscribe('setFunction', toPairsFunc(contextModel.setFunction));
		subscribe('setFieldEnterRule', toPairsFunc(storeModel.setFieldEnterRule));
		subscribe('setFieldVerifyRule', toPairsFunc(storeModel.setFieldVerifyRule));
		subscribe('setFieldsError', toPairsFunc(storeModel.setFieldError));
		subscribe('setFieldsValue', this.setFieldsValue);
		subscribe('onSubmit', this.onSubmit);
	}
	get contextAPI() {
		const rest = pick(this, ['getFieldsValue', 'getFieldsError']);
		const actionRest = pick(this.actionModel, ['dispatch', 'subscribe', 'unsubscribe']);
		const contextRest = pick(this.contextModel, ['getWidget', 'getFunction', 'getConstant', 'getFieldSchema']);
		return { ...rest, ...actionRest, ...contextRest };
	}
	public getFieldsError = (names: string[]) => this.storeModel.getFieldsError(names);
	public getFieldsValue = (names: string[]) => this.storeModel.getFieldsValue(names);
	public setFieldsError = (params: IParams) => this.actionModel.dispatch('setFieldsError', params);
	public setFieldsValue = (params: IParams) => {
		const { setFieldValue } = this.storeModel;
		const nextNames: any[] = onEnterRule.call(this, params);
		nextNames.forEach((name: string) => {
			const value = params[name];
			setFieldValue(name, value);
		});
	};
	public onValidate = (names?: string[], option?: any) => {
		const { force = false } = option || {};
		const { formErrors } = this.storeModel;
		const { dispatch } = this.actionModel;
		const { errors, errorIds } = onVerifyRule.call(this, names);
		const errorSet = new Set(Object.keys(formErrors).concat(errorIds));
		const renderIds: string[] = [];
		errorSet.forEach((errorId) => {
			renderIds.push(errorId);
		});
		force && dispatch('onRerender', renderIds);
		return errors;
	};
	public onSubmit = () => {
		const { form } = this.props;
		const { formData, formErrors } = this.storeModel;
		if (form.verify) {
			this.isVerify = true;
			const errors = this.onValidate(undefined, { force: true });
			Object.keys(formErrors).forEach((id) => {
				errors[id] || (errors[id] = null);
			});
			this.setFieldsError(errors);
			console.error(errors);
			throw errors;
		}
		return formData;
	};
	render() {
		const { contextAPI, props } = this;
		const { className, style, form, fields, children, ...other } = props;
		const rest = omit(other, PICK_FORM_PROPS_KEYS);
		return (
			<div className={className} style={style}>
				<form {...rest}>
					<Provider value={contextAPI}>
						<TypeForm formSchema={form} fieldsSchema={fields} />
					</Provider>
					{children}
				</form>
			</div>
		);
	}
}
