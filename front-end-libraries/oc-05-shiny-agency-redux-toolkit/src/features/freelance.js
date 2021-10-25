
import { createSlice } from '@reduxjs/toolkit'
import { selectFreelance } from '../utils/selectors'

const initialState = {
    // first the status is void then it contains the property correspond to one Freelance Id
}

export function fetchOrUpdateFreelance(freelanceId) {
  // return a thunk
  return async (dispatch, getState) => {
    // ...
    const selectFreelanceById = selectFreelance(freelanceId)
    const status = selectFreelanceById(getState()).status
    if (status === 'pending' || status === 'updating') {
      return
    }
    dispatch(actions.fetching(freelanceId))
    try {
      const response = await fetch(
        `http://localhost:8000/freelance?id=${freelanceId}`
      )
      const data = await response.json()
      dispatch(actions.resolved(freelanceId, data))
    } catch (error) {
      dispatch(actions.rejected(freelanceId, error))
    }
  }
}

function setVoidIfUndefined(draft, freelanceId) {
  if (draft[freelanceId] === undefined) {
    draft[freelanceId] = { status: 'void' }
  }
}


const { actions, reducer } = createSlice({
  name: 'freelance',
  initialState,
  reducers: {
    fetching: {
      prepare: (freelanceId) => ({
        payload: { freelanceId },
      }),
      reducer: (draft, action) => {
        setVoidIfUndefined(draft, action.payload.freelanceId)
        if (draft[action.payload.freelanceId].status === 'void') {
          draft[action.payload.freelanceId].status = 'pending'
          return
        }
        if (draft[action.payload.freelanceId].status === 'rejected') {
          draft[action.payload.freelanceId].error = null
          draft[action.payload.freelanceId].status = 'pending'
          return
        }
        if (draft[action.payload.freelanceId].status === 'resolved') {
          draft[action.payload.freelanceId].status = 'updating'
          return
        }
      },
    },
    resolved: {
      // prepare to modify the payload
      prepare: (freelanceId, data) => ({
        payload: { freelanceId, data },
      }),
      // the reducer funtion
      reducer: (draft, action) => {
        setVoidIfUndefined(draft, action.payload.freelanceId)
        if (
          draft[action.payload.freelanceId].status === 'pending' ||
          draft[action.payload.freelanceId].status === 'updating'
        ) {
          draft[action.payload.freelanceId].data = action.payload.data
          draft[action.payload.freelanceId].status = 'resolved'
          return
        }
        return
      },
    },
    rejected: {
      prepare: (freelanceId, error) => ({
        payload: { freelanceId, error },
      }),
      reducer: (draft, action) => {
        setVoidIfUndefined(draft, action.payload.freelanceId)
        if (
          draft[action.payload.freelanceId].status === 'pending' ||
          draft[action.payload.freelanceId].status === 'updating'
        ) {
          draft[action.payload.freelanceId].error = action.payload.error
          draft[action.payload.freelanceId].data = null
          draft[action.payload.freelanceId].status = 'rejected'
          return
        }
        return
      },
    },
  },
})

export const { fetching, resolved, rejected } = actions

export default reducer