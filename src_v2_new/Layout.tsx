import React, { PureComponent } from 'react';

export default class Layout extends PureComponent<any> {
	render() {
		const { schema, title, widget } = this.props;
		return (
			<div>
				<span>{title}</span>
				<span>{widget}</span>
			</div>
		);
	}
}
