
function parseAction(value: any[]) {
  const { contextAPI } = this.props
  const { getWidget, getConstant, getFunction, dispatch } = contextAPI;

  return value.reduce((prev: any, obj: any) => {
    const { type, from, to, evalString } = obj
    switch(type) {
      case 'widget':
        prev[to] = getWidget(from);
        break;
      case 'constant':
        prev[to] = getConstant(from);
        break;
      case 'function':
        prev[to] = getFunction(from);
        break;
      case 'eval':
        // tslint:disable-next-line:no-eval
        prev[to] = eval(evalString);
        break;
      case 'custom':
        break;
    }
    return prev
  }, {})
}

export default function() {
  const { action } = this.props;
  const plusState = Object.keys(action).reduce((prev: any, type: string) => {
    const value = action[type];
    prev[type] = parseAction.call(this, value);
    return prev;
  }, {});
  Object.assign(this.state, plusState)
}
