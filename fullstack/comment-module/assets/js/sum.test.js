const sum = require('./sum')

describe('test jest is running correctly', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
  })

  test('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3)
  })

  test('adds 1 + 5 to equal 6', () => {
    expect(1 + 5).toBe(6)
  })

  test('adds 1 + 5 to equal 6 ', () => {
    expect(1 + 5).toEqual(6)
  })

  test('adds 1 + 2 not to equal 4', () => {
    expect(1 + 2).not.toBe(4)
  })
})
