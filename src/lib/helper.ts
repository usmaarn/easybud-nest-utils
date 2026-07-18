import { Permission } from '@/shared/application/guards/permissions.guard';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { SelectQueryBuilder } from 'typeorm';

type PlainObject = Record<string, any>;

export class Helper {
  static isAdmin(user: any): boolean {
    return user.roles.includes('lets-meet:super-admin');
  }

  static hasPermissions(user: any, permissions: Permission[]): boolean {
    return permissions.every((p) => user.permissions.includes(p));
  }

  static async paginate<T>(
    qb: SelectQueryBuilder<any>,
    { page = 1, perPage = 10 }: { page?: number; perPage?: number },
  ) {
    // Calculate number of items to skip based on current page
    const skip = (page - 1) * perPage;

    // Execute query with pagination and total count
    const [data, totalItems] = await qb
      .skip(skip)
      .take(perPage)
      .getManyAndCount();

    // Compute total number of pages
    const totalPages = Math.ceil(totalItems / perPage);

    return {
      data,
      pagination: {
        currentPage: page,
        perPage,
        totalItems,
        totalPages,
        hasNext: page < totalPages,
        hasPrevious: page > 1,
      },
    };
  }

  static async paginateRaw<T>(
    qb: SelectQueryBuilder<any>,
    { page = 1, perPage = 10 }: { page?: number; perPage?: number },
  ) {
    const skip = (page - 1) * perPage;

    // clone query for count (IMPORTANT)
    const countQb = qb.clone();

    const totalItems = await countQb.getCount();

    const raw = await qb.skip(skip).take(perPage).getRawMany();

    const totalPages = Math.ceil(totalItems / perPage);

    return {
      data: raw,
      pagination: {
        currentPage: page,
        perPage,
        totalItems,
        totalPages,
        hasNext: page < totalPages,
        hasPrevious: page > 1,
      },
    };
  }

  static isObject(value: any): value is PlainObject {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }

  static deepAssign<T extends PlainObject>(target: T, source: PlainObject): T {
    // Ensure both inputs are valid objects before proceeding
    if (!Helper.isObject(target) || !Helper.isObject(source)) return target;

    // Iterate through source properties
    for (const key of Object.keys(source)) {
      // Skip keys that do not exist in target (prevents schema changes)
      if (!(key in target)) continue;

      const sourceValue = source[key];
      const targetValue = target[key];

      // If both values are objects, merge recursively
      if (Helper.isObject(sourceValue) && Helper.isObject(targetValue)) {
        Helper.deepAssign(targetValue, sourceValue);
      } else {
        // Otherwise overwrite the value directly
        (target as any)[key] = sourceValue;
      }
    }

    return target;
  }

  static cast<T, V>(cls: ClassConstructor<T>, plain: V): T {
    return plainToInstance(cls, plain, {
      excludeExtraneousValues: true,
    });
  }
}
