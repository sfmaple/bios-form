import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Form } from '../../src_v2/ui/Form';

describe('The Form of ui components Test', () => {
  it('Initial render when props is empty.', () => {
    TestRenderer.create(<Form />);
  });
});
