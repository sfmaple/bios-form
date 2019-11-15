declare type ContextMap = {
  model?: any;
};
declare enum FormStatus {
  Edit = 'edit',
  Readonly = 'readonly',
  Disabled = 'disabled',
  Preview = 'preview'
}
declare enum FormLayout {
  Flow = 'flow'
}
declare type FormRule = {
  verify?: boolean;
  status?: FormStatus;
  layout?: FormLayout;
};
declare type FormProps = {
  tags?: string[];
  rule?: FormRule;
  defaultValue?: any;
  props?: NativeFormProps;
  // 表单上下文支持
} & ContextOption;
declare type ItemProps = {};
declare type Widget = React.ComponentClass | React.FunctionComponent;
declare type BiosFromProps = {
  header?: JSX.Element;
  footer?: JSX.Element;
  form?: FormProps;
  items?: ItemProps[];
  defaultValue?: any;
  // 表单上下文支持
} & ContextOption;
