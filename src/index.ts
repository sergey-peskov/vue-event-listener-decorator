import { createDecorator } from 'vue-class-component';

export function VueEventListenerDecorator<
	TTarget extends Window | Document,
	TEventName extends TTarget extends Window ? keyof WindowEventMap : keyof DocumentEventMap
>(target: TTarget, eventName: TEventName, options?: AddEventListenerOptions) {
	return createDecorator((componentOptions, handler) => {
		let handlerFn = componentOptions.methods![handler];
		if (typeof handlerFn !== 'function') {
			throw new TypeError('watch handler is not a function');
		}
		let mounted = componentOptions.mounted;
		let beforeDestroy = componentOptions.beforeDestroy;
		componentOptions.mounted = function () {
			target.addEventListener(eventName, handlerFn, options);
			mounted?.call(this);
		};

		componentOptions.beforeDestroy = function () {
			target.removeEventListener(eventName, handlerFn, options);
			beforeDestroy?.call(this);
		};
	});
}