import { describe, expect, it } from 'vitest'
import {
  invalidTokenMsg,
  responseBalance,
  responseData,
  responseMsg,
} from '../../../../server/utils/response'

describe('response utils', () => {
  it('maps success and error messages to the expected error codes', () => {
    expect(responseMsg(true, 'ok')).toEqual({
      error_code: 0,
      message: 'ok',
    })
    expect(responseMsg(false, 'failed')).toEqual({
      error_code: 1,
      message: 'failed',
    })
  })

  it('returns dedicated balance and token error responses', () => {
    expect(responseBalance('need balance')).toEqual({
      error_code: 4,
      message: 'need balance',
    })
    expect(invalidTokenMsg('bad token')).toEqual({
      error_code: 3,
      message: 'bad token',
    })
  })

  it('wraps data with a success response', () => {
    expect(responseData({ id: 1 }, 'done')).toEqual({
      error_code: 0,
      data: { id: 1 },
      message: 'done',
    })
  })
})
