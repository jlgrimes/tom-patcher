import { handleByeConvert } from "./bye-convert";

describe('when handleByeConvert is called', () => {
  it('should return undefined if no tdfFile specified', () => {
    expect(handleByeConvert(undefined, 0)).toBe(undefined)
  })
})