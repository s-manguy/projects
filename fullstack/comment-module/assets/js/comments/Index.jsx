import { render, unmountComponentAtNode } from 'react-dom'
import React, { useCallback, useEffect } from 'react'
import { usePaginatedFetch } from './hooks'
import { Icon } from '../components/Icon'
import { CommentForm } from './CommentForm'
import { Comment } from './Comment'

export function Comments({ post, user }) {
  // return <div>"Ciao tutti"</div>; // first testing
  const {
    items: comments,
    setItems: setComments,
    load,
    loading,
    count,
    hasMore,
  } = usePaginatedFetch('/api/comments?post=' + post)

  const addComment = useCallback((comment) => {
    setComments((comments) => [comment, ...comments])
  }, [])

  const deleteComment = useCallback((comment) => {
    setComments((comments) => comments.filter((c) => c !== comment))
  }, [])

  const updateComment = useCallback((newComment, oldComment) => {
    // console.log(newComment, oldComment); // Test
    setComments((comments) =>
      comments.map((comment) => (comment === oldComment ? newComment : comment))
    )
  }, [])

  useEffect(() => {
    load()
  }, [])

  return (
    <div>
      <Title count={count} />
      {user ? (
        <CommentForm post={post} onComment={addComment} name="content" />
      ) : (
        <ConnectBlock />
      )}
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          canEdit={comment.author.id === user}
          onDelete={deleteComment}
          onUpdate={updateComment}
        />
      ))}
      {hasMore && (
        <button
          disabled={loading}
          className="btn btn-primary"
          style={{ marginBottom: 20 }}
          onClick={load}
        >
          {/* style added by Sandrine Manguy to avoid the button 
          to be stuck to the side elements in mobile version */}
          Charger plus de commentaires
        </button>
      )}
    </div>
  )
}

export function Title({ count }) {
  return (
    <h3>
      <Icon icon="comments" />
      {count} Commentaire{count > 1 ? 's' : ''}
    </h3>
  )
}

export function ConnectBlock() {
  // page address on dev server
  const loginPage = 'http://localhost:8000/fr/login'

  return (
    <p className="well">
      <a id="post-connect" href={loginPage}>
        Se connecter
      </a>{' '}
      pour laisser un commentaire.
    </p>
  )
}

class CommentsElement extends HTMLElement {
  /* Constructor added for the observer, no need if there is no observer */
  constructor() {
    super()
    this.observer = null
  }

  connectedCallback() {
    const post = parseInt(this.dataset.post, 10)
    const user = parseInt(this.dataset.user, 10) || null
    /* IntersectionObserver */
    if (this.observer === null) {
      this.observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target === this) {
            observer.disconnect()
            // render moved from the connectedCallback body to the observer
            render(<Comments post={post} user={user} />, this)
          }
        })
      })
    }
    // render(<Comments post={post} user={user} />, this); // Moved in the observer
    /* Call the IntersectionObserver on this component */
    this.observer.observe(this)
  }

  disconnectCallback() {
    /*Disconnect the IntersectionObserver */
    this.observer.disconnect()
    unmountComponentAtNode(this)
  }
}

customElements.define('post-comments', CommentsElement)
}
