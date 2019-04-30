import Mitt from '../lib/mitt';
import { Action } from '../typings';

export default class ActionModel {
  private emitter: Mitt.Emitter;

  constructor(actions: Action[] = []) {
    this.emitter = new Mitt();
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
}
