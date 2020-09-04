import Ajv from 'ajv';
import schema from './schema.json';

const validateJson = function validateJson(config: object) {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const valid = validate(config);

  if (!valid) {
    console.log('JSON SCHEMA VALIDATION REPORT');
    console.log(JSON.stringify(validate.errors, null, 2));

    throw new Error(
      'Invalid JSON config. Check the console for validation report'
    );
  }
};

export default validateJson;
