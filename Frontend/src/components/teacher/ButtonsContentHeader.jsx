import Button from '../UI/Buttons/Button'

import styles from './ButtonsContentHeader.module.scss'

function ButtonsContentHeader({
  children,
  onClickAddViaStrings = () => {},
  onClickAddGroup = () => {},
  onClickAddStudent = () => {},
  className,
  ...params
}) {
  return (
    <div
      {...params}
      className={[styles.buttonsContentHeader, className].join(' ')}
    >
      <div className={styles.buttonsContentHeader__content}>{children}</div>
      <div className={styles.buttonsContentHeader__buttons}>
        <Button
          title="+ Добавить группу студентов"
          onClick={onClickAddViaStrings}
        />
        <Button title="+ Добавить группу" onClick={onClickAddGroup} />
        <Button title="+ Добавить студента" onClick={onClickAddStudent} />
      </div>
    </div>
  )
}

export default ButtonsContentHeader
