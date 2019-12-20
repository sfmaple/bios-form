import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BiosForm, ContextAPI } from 'bios-form';
import { Button } from 'antd';
import schema from './schema';
import './index.css';

const context = {
	widgets: { Input: () => <span>input</span> }
};
class App extends React.Component {
	tesRef: any = React.createRef();
	renderHeader(contextAPI) {
		console.log('contextAPI:', contextAPI);
		return <div>header</div>;
	}
	renderFooter() {
		return (
			<div>
				<Button>submit</Button>
			</div>
		);
	}
	componentDidMount() {
		console.log('formIns', this.tesRef);
	}
	render() {
		return (
			<span style={{ width: 400, display: 'inline-block' }}>
				<BiosForm ref={this.tesRef} {...schema} header={this.renderHeader} footer={this.renderFooter} {...context} />
			</span>
		);
	}
}

// const App = () => <span>app</span>;
ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
