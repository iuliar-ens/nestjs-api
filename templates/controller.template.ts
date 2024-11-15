export const generateControllerTemplate = (
  modelName: string,
  resourceName: string,
) => {
  return `
  import { ${modelName} } from '@prisma/client';
  import { ${modelName}Service } from './${resourceName}.service';
  import { Create${modelName}Dto } from './dto/create${modelName}Dto';
  import { Update${modelName}Dto } from './dto/update${modelName}Dto';
  import {
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    Controller,
  } from '@nestjs/common';
  
  @Controller('api/v1/${resourceName}')
  export class ${modelName}Controller {
    constructor(private readonly ${resourceName}Service: ${modelName}Service) {}
  
    @Get()
    async findAll(): Promise<${modelName}[]> {
      return this.${resourceName}Service.findAll();
    }
  
    @Post()
    async create(@Body() postData: Create${modelName}Dto): Promise<Create${modelName}Dto> {
      return this.${resourceName}Service.create(postData);
    }
  
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<${modelName} | null> {
      return this.${resourceName}Service.findOne(id);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: number): Promise<${modelName}> {
      return this.${resourceName}Service.remove(id);
    }
  
    @Put(':id')
    async update(
      @Param('id') id: number,
      @Body() postData: Update${modelName}Dto,
    ): Promise<Update${modelName}Dto> {
      return this.${resourceName}Service.update(id, postData);
    }
  }`;
};
