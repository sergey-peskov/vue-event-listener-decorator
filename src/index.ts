import { createDecorator } from 'vue-class-component';

type EventListener = (e: Event) => void

export function VueEventListenerDecorator<
	TTarget extends Window | Document,
	TEventName extends TTarget extends Window ? keyof WindowEventMap : keyof DocumentEventMap
>(target: TTarget, eventName: TEventName, options?: AddEventListenerOptions) {
	return createDecorator((componentOptions, handler) => {
		if (typeof componentOptions.methods![handler] !== 'function') {
			throw new TypeError('watch handler is not a function');
		}
		let mounted = componentOptions.mounted;
		let beforeDestroy = componentOptions.beforeDestroy;
		let handlerFn: null| EventListener = null;
		componentOptions.mounted = function () {
			handlerFn = (this as any)[handler] as EventListener;
			target.addEventListener(eventName, handlerFn, options);
			mounted?.call(this);
		};

		componentOptions.beforeDestroy = function () {
			if(handlerFn) {
				target.removeEventListener(eventName, handlerFn, options);
			}
			beforeDestroy?.call(this);
		};
	});
}