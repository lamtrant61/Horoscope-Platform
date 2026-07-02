export const responseMsg = (error: boolean, message: string) => {
  // true la ko loi, false la co loi
  return {
    error_code: error ? 0 : 1,
    message,
  }
}
export const responseBalance = (message: string) => {
  // true la ko loi, false la co loi
  return {
    error_code: 4,
    message,
  }
}

export const invalidTokenMsg = (message: string = 'Token không hợp lệ') => {
  // true la ko loi, false la co loi
  return {
    error_code: 3,
    message,
  }
}

export const responseData = <T>(data: T, message: string = 'Thành công') => {
  return {
    error_code: 0,
    data,
    message,
  }
}
