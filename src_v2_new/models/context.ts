import pick from 'lodash.pick';

export default class Context {
  static optKeys: string[] = ['widgets', 'actions', 'constants', 'functions'];
  option = {};
  constructor(option: ContextOption) {
    const { optKeys } = Context;
    this.option = pick(option, optKeys);
  }
}
