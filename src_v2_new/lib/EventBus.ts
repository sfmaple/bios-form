import Mitt from 'mitt';

export default class EventBus {
	emitter = Mitt();

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
