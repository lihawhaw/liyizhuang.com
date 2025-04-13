import React, { useEffect } from 'react'

interface MessageProps {
  message: string
  onClose: () => void
}

const Message: React.FC<MessageProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 1500)
    return () => clearTimeout(timer)
  }, [onClose])

  return <div className='fixed top-4 right-4 rounded bg-gray-800 px-4 py-2 text-white shadow-lg'>{message}</div>
}

export default Message
