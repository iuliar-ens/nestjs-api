export const generateModuleTemplate = (
  modelName: string,
  resourceName: string,
) => {
  return `
  import { Module } from '@nestjs/common';
  import { ${modelName}Controller } from './${resourceName}.controller';
  import { ${modelName}Service } from './${resourceName}.service';
  import { PrismaService } from 'src/prisma.service';
    
  @Module({
    controllers: [${modelName}Controller],
    providers: [${modelName}Service , PrismaService],
  })
  export class ${modelName}Module {}    
  `;
};
