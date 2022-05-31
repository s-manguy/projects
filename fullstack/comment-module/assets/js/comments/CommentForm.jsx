import React, { useCallback, useEffect, useRef } from 'react'
import { useFetch } from './hooks'
import { Icon } from '../components/Icon'
import { Field } from '../components/Form'

export const CommentForm = React.memo(
  ({ name, post = null, onComment, comment = null, onCancel = null }) => {
    // return <form> Article {post} </form>; // first test

    // variables
    const ref = useRef(null)

    //méthode
    const onSucces = useCallback(
      (comment) => {
        onComment(comment)
        ref.current.value = ''
      },
      [ref, onComment]
    )

    // hooks
    const method = comment ? 'PUT' : 'POST'
    const url = comment ? comment['@id'] : '/api/comments'
    const { load, loading, errors, clearError } = useFetch(
      url,
      method,
      onSucces
    )

    // methodes
    const onSubmit = useCallback(
      (e) => {
        e.preventDefault()
        load({
          content: ref.current.value, // reference to textarea
          post: '/api/posts/' + post,
        })
      },
      [load, ref, post]
    )

    // effets
    useEffect(() => {
      if (comment && comment.content && ref) {
        ref.current.value = comment.content
      }
    }, [comment, ref])

    return (
      <div className="well">
        <form method={method} onSubmit={onSubmit}>
          {/* method added by Sandrine MANGUY */}
          <fieldset>
            {comment === null && (
              <legend>
                <Icon icon="comment" />
                Laisser un commentaire
              </legend>
            )}
            <Field
              name={name}
              help="Les commentaires non conformes à notre code de conduite seront modérés."
              ref={ref}
              required
              minLength={5}
              onChange={clearError.bind(this, 'content')}
              error={errors['content']}
              // error="Votre commentaire est trop court" // Initial test
              placeholder="Saisir le commentaire ici"
            >
              Votre commentaire
            </Field>
            <div
              className="btn-group pull-right"
              role="group"
              aria-label="Un groupe de boutons"
            >
              {/* pull-right in className to align right added here by Sandrine Manguy */}
              {onCancel && (
                <button className="btn btn-secondary" onClick={onCancel}>
                  Annuler
                </button>
              )}
              <button
                className="btn btn-primary"
                disabled={loading}
                type="submit"
              >
                <Icon icon="paper-plane" aria-hidden="true" />
                {comment === null ? 'Envoyer' : 'Editer'}
              </button>
              {/* primary and secondary buttons reversed here by Sandrine Manguy */}
            </div>
          </fieldset>
        </form>
      </div>
    )
  }
)
