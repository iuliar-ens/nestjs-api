export const generateServiceTemplate = (
  modelName,
  resourceName,
  fieldNames,
) => {
  return `
  import { Injectable } from '@nestjs/common';
  import { ${modelName} } from '@prisma/client';
  import { PrismaService } from 'src/prisma.service';
    
  @Injectable()
  export class ${modelName}Service {
    constructor(private prisma: PrismaService) {}
    
    async findAll(): Promise<${modelName}[]> {
      return this.prisma.${resourceName}.findMany();
    }
    
    async findOne(id: number): Promise<${modelName} | null> {
      return this.prisma.${resourceName}.findUnique({ where: { id: Number(id) } });
    }
    
    async create(data: ${modelName}): Promise<${modelName}> {
      return this.prisma.${resourceName}.create({ data });
    }
    
    async update(id: number, data: ${modelName}): Promise<${modelName}> {
      return this.prisma.${resourceName}.update({
        where: { id: Number(id) },
        data: {
          ${fieldNames.map((field) => `${field}: data.${field}`).join(',\n\t\t\t\t')}
        }
      });
    }
    
    async remove(id: number): Promise<${modelName}> {
      return this.prisma.${resourceName}.delete({
        where: { id: Number(id) },
      });
    }
  }
  `;
};
