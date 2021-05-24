import React from 'react'

const Message = ({ message, status }) => {
  return (
    <div className={status}>
      {message}
    </div>
  )
}

const Notification = ({ message, status }) => {
  if (message === null) {
    return null
  }
  if(status === 'succeed') {
  	return (
  	  <Message status={status} message={message} />
  	)
  } else if(status === 'error') {
  	return (
  	  <Message status={status} message={message} />
  	)
  } else {
  	return null
  }
}

export default Notification
