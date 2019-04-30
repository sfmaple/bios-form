export default (execute: Function) => (params: any) => {
  if (!params) throw new Error('the params must be an object type.');
  Object.keys(params).map((key) => {
    const value = params[key];
    execute(key, value);
  });
};
