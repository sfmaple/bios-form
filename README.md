# [tea-form](https://sfmaple.github.io/tea-form)

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/sfmaple/tea-form/blob/master/LICENSE)
[![Build Status](https://api.travis-ci.org/sfmaple/tea-form.svg?branch=master)](travis-ci.org/sfmaple/tea-form)
<!-- [Coverage Status](https://coveralls.io) -->
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

The tea-form is JavaScript library for building dynamic form.

* **Configuration** The tea-form makes it simple to create form. Configure form make your code more quicker to develop, simpler to understand, and easier to use.

## Installation

`npm install tea-form --save`

```javascript
// using ES6 modules
import TeaForm from 'tea-form';

// using CommonJS modules
var TeaForm = require('tea-form')
```

## Examples

```tsx
const props = {
  fields: [{
    name: 'test',
    widget: 'Input',
    title: 'Test Input'
  }],
  // Input: this is your custom component
  widgets: { Input }
}

class Example extends Component {
  render() {
    return <TeaForm {...props} />
  }
}
```

[Learn how to use tea-form in your own project](https://sfmaple.github.io/tea-form/docs/getting-started.html).

## License

The tea-form is [MIT licensed](./LICENSE).
