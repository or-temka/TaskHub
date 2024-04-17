import { useEffect, useState } from 'react'
import styles from './TextButtonSorter.module.scss'

function TextButtonSorter({
  className,
  textClassName,
  sortUpText = 'А-Я',
  sortDownText = 'Я-А',
  onClick = () => {},
  userStatus = 'passive',
  text,
  ...params
}) {
  const [status, setStatus] = useState(userStatus)
  const [sortText, setSortText] = useState('')

  useEffect(() => {
    setSortText(
      status === 'passive' ? '' : status === 'up' ? sortUpText : sortDownText
    )
  }, [status])

  const changeSortValueHandler = () => {
    onClick()
    setStatus(status === 'passive' ? 'up' : status === 'up' ? 'down' : 'up')
  }

  return (
    <div
      {...params}
      className={[
        styles.textButtonSorter,
        className,
        status !== 'passive' && styles.textButtonSorter_active,
      ].join(' ')}
      onClick={changeSortValueHandler}
      data-sort-value={status}
    >
      <span
        className={[
          styles.textButtonSorter__text,
          textClassName,
          status !== 'passive' && styles.textButtonSorter__text_active,
        ].join(' ')}
      >
        {sortText ? `${text} (${sortText})` : text}
      </span>
    </div>
  )
}

export default TextButtonSorter
