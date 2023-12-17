type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}`
  ? `${Lowercase<T>}${Capitalize<SnakeToCamelCase<U>>}`
  : S;
type ConvertToCamelCase<T> = T extends object
  ? { [K in keyof T as SnakeToCamelCase<K & string>]: ConvertToCamelCase<T[K]> }
  : T;

const _toCamelCase = (data: unknown): unknown => {
  if (Array.isArray(data)) {
    return data.map((item) => _toCamelCase(item));
  }
  if (typeof data === "object" && data !== null) {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key.replace(/([-_][a-z])/gi, ($1) =>
          $1.toUpperCase().replace("-", "").replace("_", "")
        ),
        _toCamelCase(value),
      ])
    );
  }

  return data;
};

export const toCamelCase = <T>(data: T): ConvertToCamelCase<T> => {
  return _toCamelCase(data) as ConvertToCamelCase<T>;
};

type CamelToSnakeCase<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Capitalize<T> ? "_" : ""}${Lowercase<T>}${CamelToSnakeCase<U>}`
  : S;
type ConvertToSnakeCase<T> = T extends object
  ? { [K in keyof T as CamelToSnakeCase<K & string>]: ConvertToSnakeCase<T[K]> }
  : T;

const _toSnakeCase = (data: unknown): unknown => {
  if (Array.isArray(data)) {
    return data.map((item) => _toSnakeCase(item));
  }
  if (typeof data === "object" && data !== null) {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key.replace(/([A-Z])/g, ($1) => `_${$1.toLowerCase()}`),
        _toSnakeCase(value),
      ])
    );
  }

  return data;
};

export const toSnakeCase = <T>(data: T): ConvertToSnakeCase<T> => {
  return _toSnakeCase(data) as ConvertToSnakeCase<T>;
};
