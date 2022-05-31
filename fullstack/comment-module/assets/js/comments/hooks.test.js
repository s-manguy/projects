import { jsonLdFetch, useFetch, usePaginatedFetch } from './hooks'
import { renderHook, act } from '@testing-library/react-hooks'

const mockedData = {
  '@context': '/api/contexts/Comment',
  '@id': '/api/comments',
  '@type': 'hydra:Collection',
  'hydra:member': [
    {
      '@id': '/api/comments/171',
      '@type': 'Comment',
      id: 171,
      content: 'Les tests...',
      publishedAt: '2022-05-13T12:06:58+00:00',
      author: {
        '@type': 'User',
        '@id': '_:1205',
        id: 3,
        username: 'john_user',
      },
    },
    {
      '@id': '/api/comments/170',
      '@type': 'Comment',
      id: 170,
      content: 'Modification...',
      publishedAt: '2022-04-29T13:04:26+00:00',
      author: {
        '@type': 'User',
        '@id': '_:1205',
        id: 3,
        username: 'john_user',
      },
    },
  ],
  'hydra:totalItems': 18,
  'hydra:view': {
    '@id': '/api/comments?post=1&page=1',
    '@type': 'hydra:PartialCollectionView',
    'hydra:first': '/api/comments?post=1&page=1',
    'hydra:last': '/api/comments?post=1&page=9',
    'hydra:next': '/api/comments?post=1&page=2',
  },
  'hydra:search': {
    '@type': 'hydra:IriTemplate',
    'hydra:template': '/api/comments{?post,post[]}',
    'hydra:variableRepresentation': 'BasicRepresentation',
    'hydra:mapping': [
      {
        '@type': 'IriTemplateMapping',
        variable: 'post',
        property: 'post',
        required: false,
      },
      {
        '@type': 'IriTemplateMapping',
        variable: 'post[]',
        property: 'post',
        required: false,
      },
    ],
  },
}

// describe('jsonLdFetch', () => {
//   test('should stringify data', () => {})

//   test('should return null', () => {
//     //  received data status 204
//   })

//   test('should return LD+json data', () => {
//     // response.ok
//   })

//   test('should return error', () => {
//     // !response.ok
//   })
// })

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

  //  test('should return error.viloation', () => {
  //   //     // loading,  ---> false
  //   // errors, 	---> {}
  //   // load,	---> loaind à true
  //   //          ---> (response + loading false) or error
  //   // clearError, ---> error à vide

  //   const { result } = renderHook(() => useFetch())

  //   // assert Initial states
  //   expect(result.current.loading).toBeFalsy()
  //   expect(result.current.errors).toMatchObject({})

  //   // load data/error
  //   act(() => result.current.load())

  //   // --> loading à true
  //   expect(result.current.loading).toBeTruthy()
  //   // if received error response
  //   // --> loading à false
  //   // clear error
  //   expect(result.current.errors).not.toBeNull()
  //   act(() => result.current.clearError())
  //   expect(result.current.loading).toBeTruthy()
  //   expect(result.current.errors).toMatchObject({})
  //   //   })

  // test('should return error', () => {
  //   //     // loading,  ---> false
  //   // errors, 	---> {}
  //   // load,	---> loaind à true
  //   //          ---> (response + loading false) or error
  //   // clearError, ---> error à vide

  //   const { result } = renderHook(() => useFetch())

  //   // assert Initial states
  //   expect(result.current.loading).toBeFalsy()
  //   expect(result.current.errors).toMatchObject({})

  //   // load data/error
  //   act(() => result.current.load())

  //   // --> loading à true
  //   expect(result.current.loading).toBeTruthy()
  //   // if received error response
  //   // --> loading à false
  //   // clear error
  //   expect(result.current.errors).not.toBeNull()
  //   act(() => result.current.clearError())
  //   expect(result.current.loading).toBeTruthy()
  //   expect(result.current.errors).toMatchObject({})
  //   //   })
})

describe('usePaginatedFetch', () => {
  test('should return data after fetch', function () {
    // items,--> []
    //     setItems,
    //     load,	--> loading true,
    // 		--- > setItems [items+response], count reponse next response ou null
    // 		---> loading false
    //     hasMore: next !== null, ---> null

    const { result } = renderHook(() => usePaginatedFetch())

    // initial states
    expect(result.current.items).toEqual(expect.arrayContaining([]))
    expect(result.current.loading).toBeFalsy()
    expect(result.current.count).toEqual(0)
    expect(result.current.hasMore).toBeFalsy()

    act(() => result.current.load())
    expect(result.current.loading).toBeTruthy()
  })
  //   test('should not return data after fetch', function () {
  //     // items,--> []
  //     //     setItems,
  //     //     load,	--> loading true,
  //     // 		--- > setItems [items+response], count reponse next response ou null
  //     // 		---> loading false
  //     //     hasMore: next !== null, ---> null

  //     const { result } = renderHook(() => usePaginatedFetch())

  //     // initial states
  //     expect(result.current.items).toEqual(expect.arrayContaining([]))
  //     expect(result.current.loading).toBeFalsy()
  //     expect(result.current.count).toEqual(0)
  //     expect(result.current.hasMore).toBeFalsy()

  //     act(() => result.current.load())
  //     expect(result.current.loading).toBeTruthy()
  //   })

  // test('should return error', function () {
  //     // items,--> []
  //     //     setItems,
  //     //     load,	--> loading true,
  //     // 		--- > setItems [items+response], count reponse next response ou null
  //     // 		---> loading false
  //     //     hasMore: next !== null, ---> null

  //     const { result } = renderHook(() => usePaginatedFetch())

  //     // initial states
  //     expect(result.current.items).toEqual(expect.arrayContaining([]))
  //     expect(result.current.loading).toBeFalsy()
  //     expect(result.current.count).toEqual(0)
  //     expect(result.current.hasMore).toBeFalsy()

  //     act(() => result.current.load())
  //     expect(result.current.loading).toBeTruthy()
  //   })
})
