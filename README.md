# [bios-form](https://sfmaple.github.io/bios-form)

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/sfmaple/bios-form/blob/master/LICENSE)
[![Build Status](https://api.travis-ci.org/sfmaple/bios-form.svg?branch=master)](travis-ci.org/sfmaple/bios-form)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
<!-- [Coverage Status](https://coveralls.io) -->

The bios is taken from Latin βios. The bios-form is JavaScript library for building dynamic form.

* **Configuration:** The bios-form makes it simple to create form. Configure form make your code more quicker to develop, simpler to understand, and easier to use.
* **Compatibility:** The bios-form makes it quick to compatible components. It provide many decorator function to solve the adaptation problem.

## Installation

`npm install bios-form --save`

```javascript
// using ES6 modules
import BiosForm from 'bios-form';

// using CommonJS modules
var BiosForm = require('bios-form')
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
    return <BiosForm {...props} />
  }
}
```

[Learn how to use bios-form in your own project](https://sfmaple.github.io/bios-form/docs/getting-started.html).

## License

The bios-form is [MIT licensed](./LICENSE).
