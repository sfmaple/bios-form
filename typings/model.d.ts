declare type ContextOption = {
  widgets?: { [key: string]: Widget };
  actions?: { [key: string]: Function };
  constants?: { [key: string]: any };
  functions?: { [key: string]: Function };
};
