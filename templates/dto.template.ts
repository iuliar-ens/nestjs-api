type dtoType = 'create' | 'update';

export const generateDtoTemplate = (
  modelName: string,
  fields: string,
  dtoType: dtoType,
) => {
  const parseFields = (fields: string) => {
    return fields.split(',').map((field: string) => {
      let [fieldName, fieldType] = field.split(':');

      const isOptional = fieldType.includes('?');

      if (isOptional) {
        fieldType = fieldType.replace('?', '');
      }
      return { fieldName, fieldType, isOptional };
    });
  };

  const generateDtoTempate = (
    modelName: string,
    fields: { fieldName: string; fieldType: string; isOptional: boolean }[],
    dtoType: dtoType,
  ) => {
    const className =
      dtoType === 'create' ? `Create${modelName}Dto` : `Update${modelName}Dto`;

    let template = `export class ${className}` + ' {';
    let validators = [];

    fields.map((field) => {
      template += `
  ${field.isOptional || dtoType === 'update' ? '@IsOptional()' : ''}
  @Is${field.fieldType}()
  ${field.fieldName}${field.isOptional ? '?' : ''}:${field.fieldType.toLowerCase()}\n\n`;
      //update array of validators to use for import
      validators.push(`Is${field.fieldType}`);
      if (field.isOptional || dtoType) validators.push('IsOptional');
    });

    validators = [...new Set(validators)]; //filter out duplicates, so there is only one import

    let imports = 'import { ';

    validators.map((validator, index) => {
      if (index !== validators.length - 1) imports += validator + ', ';
      else imports += validator + " } from 'class-validator'";
    });

    template = imports + '\n\n' + template.trim() + '\n}';
    return template;
  };

  const parsedFields = parseFields(fields);
  return generateDtoTempate(modelName, parsedFields, dtoType);
};
