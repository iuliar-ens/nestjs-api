import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

import {
  generateControllerTemplate,
  generateServiceTemplate,
  generateModuleTemplate,
  generateDtoTemplate,
} from './templates';

// Check if a resource name was provided
const resourceName = process.argv[2];
if (!resourceName) {
  console.error('Please provide a resource name');
  process.exit(1);
}

// Check if fields were provided
const fieldsArg = process.argv[3];
if (!fieldsArg) {
  console.error('Please provide fields for the resource');
  process.exit(1);
}

// Parse the fields
const fields = fieldsArg
  .split(',')
  .map((field) => {
    const [name, type] = field.split(':');
    return `${name} ${type}`;
  })
  .join('\n\t\t');

const fieldNames = fields
  .split('\n')
  .map((line) => {
    const [fieldName] = line.trim().split(' ');
    return fieldName;
  })
  .filter(Boolean);

// Capitalize the resource name for the model name
const modelName = resourceName.charAt(0).toUpperCase() + resourceName.slice(1);

// Function to execute a shell command
const executeCommand = (command: string) => {
  try {
    console.log(`--- Executing: ${command}`);
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    process.exit(1);
  }
};

// Helper function to generate a TypeScript class
const generateModelClass = (resourceName: string, fields: string) => {
  // Split fields into an array of individual field definitions
  const formattedFields = fields
    .split('\n') // Split by newline to get each field on a new line
    .map((field) => field.trim()) // Trim extra spaces from each field
    .map((field) => {
      // Check if the field is optional (contains "?")
      const [fieldName, fieldType] = field.split(' ');
      let formattedFieldName = fieldName;
      let formattedFieldType = fieldType;

      // If the field is optional, move the "?" after the field name
      if (fieldType.includes('?')) {
        formattedFieldType = fieldType.replace('?', '');
        formattedFieldName = `${fieldName}?`;
      }

      return `${formattedFieldName}: ${formattedFieldType.toLowerCase()};`; // Format like "field_name: field_type;"
    })
    .join('\n\t'); // Join the fields back, indented with a tab

  const modelName =
    resourceName.charAt(0).toUpperCase() + resourceName.slice(1);

  const classTemplate = `
import { Prisma } from '@prisma/client';

export class ${modelName} implements Prisma.${modelName}CreateInput {
  \tid: number;
  \t${formattedFields}
}
`;
  return classTemplate;
};

// Function to generate the Prisma model and create model file
const generatePrismaModel = () => {
  const prismaModel = `
model ${resourceName.charAt(0).toUpperCase() + resourceName.slice(1)} {
    id        Int     @id @default(autoincrement())
    ${fields}
}
`;

  // Append the model to the schema.prisma file
  fs.appendFileSync('./prisma/schema.prisma', prismaModel);
  console.log(`--- Generated Prisma model for ${resourceName}`);

  //Create new model file inside the newly generated resource folder
  const folderPath = path.join(__dirname, 'src', resourceName);
  const modelFilePath = path.join(folderPath, `${resourceName}.model.ts`);

  // Generate the model class code using the provided fields
  const modelClassContent = generateModelClass(resourceName, fields);
  fs.writeFileSync(modelFilePath, modelClassContent, 'utf-8');
  console.log(`--- Model file created at: ${modelFilePath}`);
};

// Function to run the migration
const runMigration = () => {
  const migrationName = `add-${resourceName}-model`;
  executeCommand(`npx prisma migrate dev --name ${migrationName}`);
  console.log(`--- Database migration applied for ${resourceName}`);
};

// Helper function to write content to a file
const writeToFile = (filePath: string, content: string) => {
  try {
    const directory = path.dirname(filePath);
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true }); // Create the directory structure if it doesn't exist
    }
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`--- File written successfully to: ${filePath}`);
  } catch (err) {
    console.error(`Error writing to file ${filePath}:`, err);
  }
};

// Generate resources and add the generated content to files
const generateResources = () => {
  // Step 1: Generate controller, service, and module
  executeCommand(`nest g controller ${resourceName}`);
  executeCommand(`nest g service ${resourceName}`);
  executeCommand(`nest g module ${resourceName}`);

  // Step 2: Generate dynamic content
  const serviceContent = generateServiceTemplate(
    modelName,
    resourceName,
    fieldNames,
  );
  const controllerContent = generateControllerTemplate(modelName, resourceName);
  const moduleContent = generateModuleTemplate(modelName, resourceName);
  const createDtoContent = generateDtoTemplate(modelName, fieldsArg, 'create');
  const updateDtoContent = generateDtoTemplate(modelName, fieldsArg, 'update');

  // Step 3: Write to the respective files
  const resourceFolder = path.join(__dirname, 'src', resourceName);
  const dtoFolder = path.join(resourceFolder, 'dto');

  const createDtoFilePath = path.join(dtoFolder, `create${modelName}Dto.ts`);
  const updateDtoFilePath = path.join(dtoFolder, `update${modelName}Dto.ts`);

  const serviceFilePath = path.join(
    resourceFolder,
    `${resourceName}.service.ts`,
  );
  const controllerFilePath = path.join(
    resourceFolder,
    `${resourceName}.controller.ts`,
  );
  const moduleFilePath = path.join(resourceFolder, `${resourceName}.module.ts`);

  writeToFile(createDtoFilePath, createDtoContent);
  writeToFile(updateDtoFilePath, updateDtoContent);
  writeToFile(serviceFilePath, serviceContent);
  writeToFile(controllerFilePath, controllerContent);
  writeToFile(moduleFilePath, moduleContent);
};

// Call the functions
generateResources();
generatePrismaModel();
runMigration();
