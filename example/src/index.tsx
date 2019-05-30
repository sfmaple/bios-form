import * as React from 'react';
import * as ReactDOM from 'react-dom';
import omit from 'lodash.omit';
import { Input, Button } from 'antd';
import SchemaForm from 'bios-form';
import './index.css';

class FInput extends React.Component<any> {
  onChange = (event: any) => {
    const { onChange } = this.props;
    const value = event.target.value;
    onChange(value);
  };
  render() {
    const rest = omit(this.props, ['onChange']);
    return <Input {...rest} onChange={this.onChange} />;
  }
}
const fields: any[] = [
  {
    indexes: ['common'],
    name: 'test_1',
    widget: 'Input',
    title: '测试字段1',
    common: { dependNames: ['test_2.a'] },
    rules: { check: { required: true } }
  }
];
const configure: any = {
  form: { index: 'common', verify: true },
  fields: fields,
  widgets: { Input: FInput },
  constants: {
    test: [
      {
        label: '1',
        value: true
      },
      {
        label: '2',
        value: false
      }
    ]
  }
};
class App extends React.Component {
  form: any;
  componentDidMount() {
    this.form.setFieldsValue({ test_2: { a: 1 } });
    configure.form.type = 'Base';
    this.forceUpdate();
  }
  onSubmit = () => {
    const formData = this.form.onSubmit();
    console.log(this.form);
    console.log(formData);
  };
  render() {
    return (
      <span style={{ width: 400, display: 'inline-block' }}>
        <SchemaForm
          ref={(form: any) => {
            this.form = form;
          }}
          {...configure}
        />
        <Button onClick={this.onSubmit}>确认</Button>
      </span>
    );
  }
}

// const App = () => <span>app</span>;
ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
