import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export class ValidationException extends Error {
  public errors: { property: string; constraints?: Record<string, string> }[];

  constructor(errors: { property: string; constraints?: Record<string, string> }[]) {
    super('Validation failed');
    this.errors = errors;
    this.name = 'ValidationException';
  }
}

export async function validateDto<T extends object>(
  dtoClass: new () => T,
  plainObject: unknown
): Promise<T> {
  const dtoObject = plainToInstance(dtoClass, plainObject);
  const errors = await validate(dtoObject);

  if (errors.length > 0) {
    const formattedErrors = errors.map((error) => ({
      property: error.property,
      constraints: error.constraints,
    }));
    throw new ValidationException(formattedErrors);
  }

  return dtoObject;
}
