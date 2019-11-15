import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BiosForm } from 'bios-form';
import schema from './schema';
import './index.css';

class App extends React.Component {
  render() {
    return (
      <span style={{ width: 400, display: 'inline-block' }}>
        <BiosForm {...schema} />
      </span>
    );
  }
}

// const App = () => <span>app</span>;
ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
