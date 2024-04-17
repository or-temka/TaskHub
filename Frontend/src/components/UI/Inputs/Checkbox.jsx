import { v4 as uuidv4 } from 'uuid'

import styles from './Checkbox.module.scss'

function Checkbox({
  idHTML = uuidv4(),
  label = '',
  style,
  className,
  checked = false,
  disabled = false,
  onClick = () => {},
  onChange = () => {},
}) {
  return (
    <div className={[styles.checkbox, className].join(' ')}>
      <input
        id={idHTML}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        className={[styles.checkbox__input, className].join(' ')}
        style={style}
        onClick={onClick}
        onChange={onChange}
      />
      <label
        for={idHTML}
        className={[styles.checkbox__label, 'paragraph', className].join(' ')}
      >
        {label}
      </label>
    </div>
  )
}

export default Checkbox
