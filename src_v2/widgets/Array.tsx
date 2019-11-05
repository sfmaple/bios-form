import React, { Fragment } from 'react';
import { BaseComponent } from '../core';
import { ArraySchema } from '../../typings';

type IProps = ArraySchema & {};
type IState = {
  length: number;
};
// TODO: 数组的增删事件
export class Array extends BaseComponent<IProps, IState> {
  state = {
    isEdit: true,
    length: 0,
    maxLength: 0
  };
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const {} = this.state;
    const {} = this.props;

    return (
      <Fragment>
        {/* {childList.map(({ id, ...child }, index) => (
          <Field key={id || index} id={id} {...child} />
        ))} */}
      </Fragment>
    );
  }
}
