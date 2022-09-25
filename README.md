# vue-event-listener-decorator

Window or document event listener decorator for [vue-class-component](https://github.com/vuejs/vue-class-component)

## Installation

``` sh
npm i -S vue-event-listener-decorator
```

## Usage

```ts
import Vue from 'vue';
import Component from 'vue-class-component';
import { VueEventListenerDecorator } from 'vue-event-listener-decorator';

@Component
export default class App extends Vue {
    @VueEventListenerDecorator(window, 'click')
	onClick() {}
}
```

is equivalent to

```ts
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class App extends Vue {
	onClick() {}

	mounted() {
	    window.addEventListener('click', this.onClick)
	}

	beforeDestroy() {
		window.removeEventListener('click', this.onClick)
	}
}
```