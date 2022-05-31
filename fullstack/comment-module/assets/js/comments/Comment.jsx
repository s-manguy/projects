import React, { useCallback, useState } from 'react'
import { useFetch } from './hooks'
import { Icon } from '../components/Icon'
import { CommentForm } from './CommentForm'

const dateFormat = {
  dateStyle: 'medium',
  timeStyle: 'short', // delete the seconds
}

const VIEW = 'VIEW'
const EDIT = 'EDIT'

export const Comment = React.memo(
  ({ comment, onDelete, canEdit, onUpdate }) => {
    // console.log("render"); // for performance testing

    // variables
    const date = new Date(comment.publishedAt)

    //events or methods
    const toggleEdit = useCallback(() => {
      setState((state) => (state === VIEW ? EDIT : VIEW))
    }, [])

    const onDeleteCallback = useCallback(() => {
      onDelete(comment)
    }, [comment])

    const onComment = useCallback(
      (newComment) => {
        // console.log(newComment) // Test
        onUpdate(newComment, comment)
        toggleEdit()
      },
      [comment]
    )

    // hooks
    const [state, setState] = useState(VIEW)

    const { loading: loadingDelete, load: callDelete } = useFetch(
      comment['@id'],
      'DELETE',
      onDeleteCallback
    )
    console.log(comment)
    // render
    return (
      <div className="row post-comment">
        <h4 className="col-sm-3">
          <strong>{comment.author.username}</strong>
          commenté le
          <strong>{date.toLocaleString(undefined, dateFormat)}</strong>
        </h4>
        <div className="col-sm-9">
          {state === VIEW ? (
            <p>{comment.content}</p>
          ) : (
            <CommentForm
              name="contentToModify"
              comment={comment}
              onComment={onComment}
              onCancel={toggleEdit}
            />
          )}

          {canEdit && state !== EDIT && (
            <div
              className="btn-group pull-right"
              role="group"
              aria-label="Un groupe de boutons"
            >
              {/* pull-right in className to align right added here by Sandrine Manguy */}
              <button
                type="button"
                className="btn btn-danger ml-1"
                onClick={callDelete.bind(this, null)}
                disabled={loadingDelete}
              >
                <Icon icon="trash" />
                Supprimer
              </button>
              <button
                type="button"
                className="btn btn-secondary ml-1"
                onClick={toggleEdit}
              >
                <Icon icon="pen" />
                Editer
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }
)
