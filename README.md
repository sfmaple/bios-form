# bios-form

## FieldSchema

```typescript
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
  action?: any[];
  props?: any;
}
```
