import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Base } from '../../src_v2/core/Base';

const context = {
  getFieldsValue: () => 'test',
  dispatch: () => {},
  subscribe: () => {},
  unsubscribe: () => {}
}
describe('The BaseComponent of core components Test', () => {
  it('Initial render when props is empty.', () => {
    const root = TestRenderer.create(<Base />);
    root.unmount();
  });
  it('test context of props', () => {
    const root = TestRenderer.create(<Base context={context} />);
    root.unmount();
  })
  it('Pass ID through props', () => {
    const root = TestRenderer.create(<Base id={'test'} />);
    const instance: any = root.getInstance()
    expect(instance.id).toBe('test');
  })
  it('test unSafeOnDependValue and unSafeOnDependSchema of props', () => {
    const root = TestRenderer.create(<Base id={'test'} name={'test'} context={context} />);
    const instance: any = root.getInstance();
    instance.unSafeOnDependValue({ test: '' })
    instance.unSafeOnDependSchema({ test: {} })
  })
  it('test unSafeOnDependValue and unSafeOnDependSchema of props', () => {
    const root = TestRenderer.create(<Base context={context} />);
    const instance: any = root.getInstance();
    instance.unSafeOnDependSchema({ test: {} })
  })
});
