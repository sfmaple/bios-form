import Mitt from 'mitt';

export default class Action {
  private emitter: Mitt.Emitter;
  constructor(params: any) {
    const { actions } = params;
    actions.forEach(({ name, handler }) => {
      this.subscribe(name, handler);
    });
  }
  public dispatch = (name: string, params?: any) => {
    this.emitter.emit(name, params);
  };
  public subscribe = (name: string, handler: Mitt.Handler) => {
    this.emitter.on(name, handler);
  };
  public unsubscribe = (name: string, handler: Mitt.Handler) => {
    this.emitter.off(name, handler);
  };
}
