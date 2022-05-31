import { useState, useCallback } from 'react'

export async function jsonLdFetch(url, method = 'GET', data = null) {
  const params = {
    method: method,
    headers: {
      Accept: 'application/ld+json',
      'Content-Type': 'application/json',
    },
  }

  if (data) {
    params.body = JSON.stringify(data)
  }

  const response = await fetch(url, params)
  if (response.status === 204) {
    return null
  }
  const responseData = await response.json()
  if (response.ok) {
    return responseData
  } else {
    throw responseData
  }
}

export function usePaginatedFetch(url) {
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])
  const [count, setCount] = useState(0)
  const [next, setNext] = useState(null)
  // It is possible to work on the errors here
  const load = useCallback(async () => {
    setLoading(true)

    // ALl the below commented code has been replaced
    // by the call to the generic jsLdFetch() */
    /* 
    const response = await fetch(next || url, {
      headers: {
        Accept: "application/ld+json",
      },
    });
    const responseData = await response.json();
    if (response.ok) {
      setItems((items) => [...items, ...responseData["hydra:member"]]);
      setCount(responseData["hydra:totalItems"]);
      if (
        responseData["hydra:view"] &&
        responseData["hydra:view"]["hydra:next"]
      ) {
        setNext(responseData["hydra:view"]["hydra:next"]);
      } else {
        setNext(null);
      }
    } else {
      console.error(responseData);
    }
    */

    try {
      const response = await jsonLdFetch(next || url)
      setItems((items) => [...items, ...response['hydra:member']])
      setCount(response['hydra:totalItems'])
      if (response['hydra:view'] && response['hydra:view']['hydra:next']) {
        setNext(response['hydra:view']['hydra:next'])
      } else {
        setNext(null)
      }
    } catch (error) {
      console.error(error)
    }

    setLoading(false)
  }, [url, next])

  return {
    items,
    setItems,
    load,
    loading,
    count,
    hasMore: next !== null,
  }
}

export function useFetch(url, method = 'POST', callback = null) {
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const load = useCallback(
    async (data = null) => {
      setLoading(true)

      try {
        const response = await jsonLdFetch(url, method, data)
        setLoading(false)
        /* setLoading move here to avoid problem on 'Delete' method 
        when trying to State an item deleted by the callback */
        if (callback) {
          callback(response)
        }
      } catch (error) {
        if (error.violations) {
          setLoading(false) // Move here to avoid problem on 'Delete' method
          setErrors(
            error.violations.reduce((acc, violation) => {
              acc[violation.propertyPath] = violation.message
              return acc
            }, {})
          )
        } else {
          throw error
        }
      }
      // setLoading(false); // moved to each bloc to avoid problem when Deleting
    },
    [url, method, callback]
  )

  const clearError = useCallback(
    (name) => {
      if (errors[name]) {
        setErrors((errors) => ({ ...errors, [name]: null }))
      }
    },
    [errors]
  )

  return {
    loading,
    errors,
    load,
    clearError,
  }
}
