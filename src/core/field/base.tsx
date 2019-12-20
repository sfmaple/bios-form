import * as React from 'react';
import nanoid from 'nanoid';
import get from 'lodash.get';
import toAction from '../../utils/toAction';
import toDepend from '../../utils/toDepend';
import { DEFAULT_VERIFY_MESSAGE } from '../../constants';
import { IFieldProps, IFieldState } from '../../typings';
const { PureComponent } = React;

export default class BaseField extends PureComponent<IFieldProps, IFieldState> {
	static defaultProps = {
		id: nanoid(),
		common: {},
		rules: {},
		action: {}
	};
	public state: IFieldState = { isError: false };
	private Widget: React.ComponentClass;
	constructor(props: IFieldProps) {
		super(props);
		const { name, widget, common, contextAPI } = this.props;
		const { defaultValue } = common;
		const { getWidget, getFieldsValue, dispatch } = contextAPI;
		this.Widget = getWidget(widget);
		toDepend.call(this);
		toAction.call(this);
		const value = name ? get(getFieldsValue([name]), name) : getFieldsValue();
		if (value === undefined && defaultValue !== undefined) {
			dispatch('setFieldsValue', { [value || '']: defaultValue });
		}
	}
	static getDerivedStateFromError(error: any) {
		return { hasError: true, msgError: error.message };
	}
	componentWillMount() {
		// @ts-ignore
		const { handleRerender, onDependNames, onDependConstants, onDependFunctions } = this;
		const { id, rules, contextAPI } = this.props;
		const { enter, verify } = rules;
		const { subscribe, dispatch } = contextAPI;
		id && enter && dispatch('setFieldEnterRule', { [id]: enter });
		id && verify && dispatch('setFieldVerifyRule', { [id]: verify });
		subscribe('onRerender', handleRerender);
		subscribe('setFieldsValue', onDependNames);
		subscribe('setConstant', onDependConstants);
		subscribe('setFunction', onDependFunctions);
	}
	componentWillUnmount() {
		// @ts-ignore
		const { handleRerender, onDependNames, onDependConstants, onDependFunctions } = this;
		const { id, rules, contextAPI } = this.props;
		const { enter, verify } = rules;
		const { unsubscribe, dispatch } = contextAPI;
		id && enter && dispatch('setFieldEnterRule', { [id]: undefined });
		id && verify && dispatch('setFieldVerifyRule', { [id]: undefined });
		unsubscribe('onRerender', handleRerender);
		unsubscribe('setFieldsValue', onDependNames);
		unsubscribe('setConstant', onDependConstants);
		unsubscribe('setFunction', onDependFunctions);
	}
	handleRerender = (renderIds: string[]) => {
		const { id } = this.props;
		const isUpdate = renderIds.includes(id);
		isUpdate && this.forceUpdate();
	};
	handleExtraProps = (extra: any) => {
		// @ts-ignore
		const { plusProps } = this;
		const extraProps = plusProps && plusProps();
		const { common, contextAPI } = this.props;
		const { isCustom = false } = common || {};
		isCustom && (extra.contextAPI = contextAPI);
		return Object.assign({}, extraProps, extra);
	};
	onChange = (event: any) => {
		const { name, common, contextAPI } = this.props;
		const { valueName = null } = common || {};
		const { dispatch } = contextAPI;
		const value = valueName ? get(event, valueName) : event;
		dispatch('setFieldsValue', { [name || '']: value });
	};
	render() {
		if (this.state.hasError) return <span>{`Went wrong: ${this.state.msgError}`}</span>;
		const { Widget, onChange } = this;
		const { id, name, title, common, rules, props, contextAPI } = this.props;
		const { message = DEFAULT_VERIFY_MESSAGE } = common;
		const required = get(rules, 'verify.required', false);
		const { getFieldsError, getFieldsValue } = contextAPI;
		const error = getFieldsError([id])[id];
		const value = name ? get(getFieldsValue([name]), name) : getFieldsValue();
		const extraProps = this.handleExtraProps({ value, onChange });
		return (
			(Widget && (
				<div>
					{title != null && (
						<div>
							{required && <span style={{ color: 'red' }}>*</span>}
							{!!title && <span>{` ${title}：`}</span>}
						</div>
					)}
					<div>
						<Widget {...extraProps} {...props} />
					</div>
					{error != null && <div>{typeof error === 'string' ? error : message}</div>}
				</div>
			)) ||
			null
		);
	}
}
