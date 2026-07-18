// import { trace } from "@opentelemetry/api";
// import { ValidationError } from "class-validator";

// const tracer = trace.getTracer("util");

// export function formatValidationErrors(errors: ValidationError[]) {
//     return tracer.startActiveSpan("formatValidationErrors", () => {
//         const errorMap: Record<string, any> = {};
//         errors.forEach((err) => {
//             if (err.children?.length) {
//                 errorMap[err.property] = formatValidationErrors(err.children)
//             } else {
//                 errorMap[err.property] = err.constraints ? Object.values(err.constraints) : [];
//             }
//         });
//         return errorMap;
//     })
// }

// type PlainObject = Record<string, any>;

// function isObject(value: any): value is PlainObject {
//     return value !== null && typeof value === "object" && !Array.isArray(value);
// }

// export function deepAssign<T extends PlainObject>(target: T, source: Partial<T>): T {
//     if (!isObject(target) || !isObject(source)) return target;

//     for (const key of Object.keys(source)) {
//         // Skip unknown properties
//         if (!(key in target)) continue;

//         const sourceValue = source[key];
//         const targetValue = target[key];

//         // If both are objects → recurse
//         if (isObject(sourceValue) && isObject(targetValue)) {
//             deepAssign(targetValue, sourceValue);
//         } else {
//             // Otherwise overwrite
//             (target as any)[key] = sourceValue;
//         }
//     }

//     return target;
// }

// //Pagination

// interface PaginationOptions {
//     page?: number;
//     perPage?: number;
// }

// export async function paginate<T>(
//     qb: any,
//     { page = 1, perPage = 10 }: PaginationOptions
// ) {
//     const skip = (page - 1) * perPage;

//     const [data, totalItems] = await qb
//         .skip(skip)
//         .take(perPage)
//         .getManyAndCount();

//     const totalPages = Math.ceil(totalItems / perPage);

//     return {
//         data,
//         pagination: {
//             currentPage: page,
//             perPage,
//             totalItems,
//             totalPages,
//             hasNext: page < totalPages,
//             hasPrevious: page > 1,
//         },
//     };
// }
