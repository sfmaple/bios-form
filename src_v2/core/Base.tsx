import get from 'lodash.get';
import { PureComponent, ReactNode } from 'react';
import nanoid from 'nanoid';
import { BaseSchema, BaseState } from '../../typings';

export class Base<P extends BaseSchema = {}, S extends BaseState = {}, SS = any> extends PureComponent<P, S, SS> {
  id?: string = this.props.id || nanoid();
  state: any = {};
  constructor(props: P) {
    super(props);
    const { context } = props;
    if (context && context.subscribe) {
      const subscribe = context.subscribe;
      subscribe('setFieldsValue', this.unSafeOnDependValue);
      subscribe('setFieldsSchema', this.unSafeOnDependSchema);
    }
  }
  static getDerivedStateFromProps(props: BaseSchema) {
    const { name, context } = props;
    const nextState: BaseState = {};
    if (context && context.getFieldsValue) {
      const { getFieldsValue } = context;
      const value = name ? get(getFieldsValue([name]), name) : getFieldsValue();
      nextState.value = value;
    }
    return nextState;
  }
  componentWillUnmount() {
    const { context } = this.props;
    if (context && context.unsubscribe) {
      const unsubscribe = context.unsubscribe;
      unsubscribe('setFieldsValue', this.unSafeOnDependValue);
      unsubscribe('setFieldsSchema', this.unSafeOnDependSchema);
    }
  }
  unSafeDepend(depends: string[], params: any) {
    const { count = 0 } = this.state;
    const names = Object.keys(params);
    const isUpdate = names.some((name) => depends.includes(name));
    isUpdate && this.setState({ count: count + 1 });
  }
  unSafeOnDependValue = (params: any) => {
    const { name, depends } = this.props;
    const dependValues: string[] = get(depends, 'values', []);
    typeof name === 'string' && dependValues.push(name);
    this.unSafeDepend(dependValues, params);
  };
  unSafeOnDependSchema = (params: any) => {
    const { id, depends } = this.props;
    const dependIds: string[] = get(depends, 'ids', []);
    typeof id === 'string' && dependIds.push(name);
    this.unSafeDepend(dependIds, params);
  };
  render(): ReactNode {
    return null;
  }
}
