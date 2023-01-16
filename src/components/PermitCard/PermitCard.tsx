import styles from './PermitCard.module.css'
import image from '../../images/Union.png'
import projectData from '../../data/project_data'
import React, { useState, useEffect } from 'react'
import parse from 'html-react-parser'

interface PermitCardProps {
  permit: typeof projectData['results'][0]['permits'][0]
}

const PermitCard: React.FC<PermitCardProps> = ({ permit }) => {
  const [isRed, setIsRed] = useState(false)

  useEffect(() => {
    if (permit.status === 'P') {
      setIsRed(true)
    }
  }, [permit.status])

  const getPermitColor = (status: string) => {
    switch (status) {
      case 'D':
        return styles.purple
      case 'W':
        return styles.yellow
      case 'C':
        return styles.green
      case 'P':
        return styles.red
      default:
        return null
    }
  }

  const styleDate = (str: string) => {
    let dateRegex = /\d{2}\.\d{2}\.\d{2}/g
    let result = str.replace(dateRegex, `<span style='color: black'>$&</span>`)
    return result
  }

  const removeAsterisks = (str: string) => {
    return str.replace(/\*(.*)\*/, '$1')
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear().toString().substr(-2)
    const dayName = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
    }).format(date)
    const hours = date.getUTCHours()
    const minutes = date.getUTCMinutes().toString().padStart(2, '0')
    const ampm = hours >= 12 ? 'PM' : 'AM'
    const hour12 = hours % 12 || 12
    const hour12String = hour12.toString().padStart(2, '0')
    return `${day}.${month}.${year} ${dayName} ${hour12String}:${minutes} ${ampm}`
  }
  return (
    <div>
      <div
        className={[styles.permitCard, getPermitColor(permit.status)].join(' ')}
      >
        {isRed ? (
          <div className={styles.alert}>
            <img src={image} alt='alert.png' />
            <div>
              <p>Please ensure you apply for building and demo</p>
            </div>
          </div>
        ) : null}
        {permit.comments.length > 0 ? (
          <p className={styles.h1}>
            {permit.comments[0].user.firstName}{' '}
            {permit.comments[0].user.lastName}
          </p>
        ) : null}
        {permit.comments.length > 0
          ? permit.comments.map((comment) => (
              <>
                <p className={styles.comment}>
                  {parse(removeAsterisks(styleDate(comment.commentText)))}
                </p>

                <p className={styles.timestamp}>
                  {formatDate(comment.timeStamp)}
                </p>
              </>
            ))
          : 'Not Started'}
      </div>
    </div>
  )
}

export default PermitCard
