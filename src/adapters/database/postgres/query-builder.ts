export class PGQueryBuilder {
  private conditions: string[] = [];
  private values: unknown[] = [];

  where(condition: string, value?: unknown) {
    if (value === undefined || value === null) {
      return this;
    }

    this.values.push(value);

    // Replace ? with PostgreSQL parameter index
    this.conditions.push(condition.replace('?', `$${this.values.length}`));

    return this;
  }

  whereArray(column: string, values?: unknown[]) {
    if (!values?.length) {
      return this;
    }

    this.values.push(values);

    this.conditions.push(`${column} = ANY($${this.values.length})`);

    return this;
  }

  getWhere() {
    if (!this.conditions.length) {
      return '';
    }

    return `WHERE ${this.conditions.join(' AND ')}`;
  }

  getValues() {
    return this.values;
  }
}
