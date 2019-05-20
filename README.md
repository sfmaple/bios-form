# bios-form

## FieldSchema

```typescript
enum FieldActionType {
  widget = 'widget',
  constant = 'constant',
  function = 'function',
  eval = 'eval',
  custom = 'custom'
}
type FieldAction = {
  type: FieldActionType;
  from: string;
  to: string;
}
type FieldSchema = {
  id?: string; // it was used on fieldSchema and action
  indexes?: string[];
  name?: string;
  title?: string;
  widget?: string;
  rules?: {
    check?;
    enter?;
  };
  common?: {
    isCustom?:  boolean;
    valueName?: string;
    defaultValue?: any;
    message?: string;
    depend?: {
      names?: string[],
      constants?: string[],
      functions?: string[]
    };
  };
  action?: {
    plusProps?: FieldAction[];
  };
  props?: any;
}
```
