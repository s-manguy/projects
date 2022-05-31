import { jsonLdFetch, useFetch, usePaginatedFetch } from './hooks'
import { renderHook, act } from '@testing-library/react-hooks'

describe('useFetch', () => {
  test('should return data after fetch', function () {
    const { result } = renderHook(() => useFetch())

    // assert Initial states
    expect(result.current.loading).toBeFalsy()
    expect(result.current.errors).toMatchObject({})

    // load data/error
    act(() => result.current.load())

    // --> loading à true
    expect(result.current.loading).toBeTruthy()

    // if received data response
    // --> loading false
  })

})

describe('usePaginatedFetch', () => {
  test('should return data after fetch', function () {

    const { result } = renderHook(() => usePaginatedFetch())

    // initial states
    expect(result.current.items).toEqual(expect.arrayContaining([]))
    expect(result.current.loading).toBeFalsy()
    expect(result.current.count).toEqual(0)
    expect(result.current.hasMore).toBeFalsy()

    act(() => result.current.load())
    expect(result.current.loading).toBeTruthy()
  })
  
})
