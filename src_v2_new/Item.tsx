import React, { PureComponent, Fragment } from 'react';
import nanoid from 'nanoid';
import get from 'lodash.get';
import Layout from './Layout';
import { ItemProps, ContextAPI } from '../typings';

export default class FormItem extends PureComponent<ItemProps & ContextAPI> {
	id: string = nanoid();
	constructor(props: ItemProps) {
		super(props);
		const { id } = props;
		id && (this.id = id);
	}
	shouldComponentUpdate() {
		return false;
	}
	public onChange = (...args: any[]) => {
		const { common } = this.props;
		const { valueName = '0.target.value' } = common || {};
		const value = get(event, valueName);
		// TODO: 触发表单项修改事件
	};

	private renderTitle() {
		const { title, rules } = this.props;
		const { required } = rules || {};
		return (
			<Fragment>
				{required && <span style={{ margin: '0 2px', color: 'red' }}>*</span>}
				{title}
			</Fragment>
		);
	}
	private renderWidget() {
		const { name, widget, props, contextAPI } = this.props;
		if (!widget) return null;
		const Widget = get(contextAPI, `context.widgets.${widget}`);
		if (!Widget) return null;
		return <Widget {...props} />;
	}
	private renderMessage() {
		return null;
	}
	render() {
		const { layout } = this.props;
		return (
			<Layout schema={layout} title={this.renderTitle()} widget={this.renderWidget()} message={this.renderMessage()} />
		);
	}
}
