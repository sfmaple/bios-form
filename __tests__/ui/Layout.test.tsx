import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Layout } from '../../src_v2/ui/Layout';

describe('The Layout of ui components Test', () => {
  it('Initial render when props is empty.', () => {
    TestRenderer.create(<Layout />);
  });
});
