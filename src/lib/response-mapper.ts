export class ResponseMapper {
  static success(data?: any) {
    return {
      status: 'success',
      message: 'success',
      data,
    };
  }

  static error(message?: string, data?: any) {
    return {
      status: 'error',
      message: message ?? 'An error occurred!',
      data,
    };
  }

  static pagination(data: any) {
    return {
      status: 'success',
      message: 'success',
      ...data,
    };
  }
}
