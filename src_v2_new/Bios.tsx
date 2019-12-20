import React, { Fragment, memo, forwardRef } from 'react';
import { Consumer } from './utils/context';
import Form from './Form';
import FormItem from './Item';
import { BiosFromProps } from '../typings';

export default memo(
	forwardRef((props: BiosFromProps, ref: any) => {
		const { header, footer, form, items, defaultValue, ...rest } = props;
		const { widgets, actions, constants, functions } = rest;
		const formContext = { widgets, actions, constants, functions };
		return (
			<Form ref={ref} {...form} {...formContext} defaultValue={defaultValue}>
				<Consumer>
					{(contextAPI) => (
						<Fragment>
							{header && header(contextAPI)}
							{items && items.map((item, i) => <FormItem key={i} {...item} contextAPI={contextAPI} />)}
							{footer && footer(contextAPI)}
						</Fragment>
					)}
				</Consumer>
			</Form>
		);
	}),
	() => true
);
