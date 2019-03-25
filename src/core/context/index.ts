import { createContext } from 'react';

const Context = createContext({
  getWidget: (_: any) => {},
  getConstant: (_: any) => {},
  getFieldSchema: (_: any): any => {},
  getFieldsValue: (_?: any) => {},
  getFieldsError: (_: any) => {},
  dispatch: (_: any, __: any) => {},
  subscribe: (_: any) => {}
});
export const { Provider, Consumer } = Context;
export default Context;
