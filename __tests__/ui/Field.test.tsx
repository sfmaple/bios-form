import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Field } from '../../src_v2/ui/Field';

const context = {
  getWidget: () => () => <span>test</span>,
  getFieldsError: () => ({ test: true })
};
describe('The Field of ui components Test', () => {
  it('Initial render when props is empty.', () => {
    TestRenderer.create(<Field />);
  });
  it('Initial render when props.', () => {
    TestRenderer.create(<Field id={'test'} widget={'test'} context={context} props={{}} />);
  });
});
