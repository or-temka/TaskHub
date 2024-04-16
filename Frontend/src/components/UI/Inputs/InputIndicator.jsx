import { useEffect, useState } from 'react'
import styles from './InputIndicator.module.css'

function InputIndicator({
  value = '',
  placeholder = '',
  className,
  style,
  indicators = [
    {
      text: 'Выше чем',
      data: 'up',
    },
    {
      text: 'Ниже чем',
      data: 'down',
    },
  ],
  inputClassName,
  indicatorClassName,
  onChangeInputValue = () => {},
  onChangeIndicator = () => {},
  onClickIndicator = () => {},
  onClickInput = () => {},
}) {
  const lastIndicatorNum = indicators.length - 1

  const [nowIndicatorNum, setNowIndicatorNum] = useState(0)
  const [nowIndicator, setNowIndicator] = useState(indicators[nowIndicatorNum])

  // Обработка изменения индикатора
  useEffect(() => {
    onChangeIndicator()
    setNowIndicator(indicators[nowIndicatorNum])
  }, [nowIndicatorNum])

  const changeIndicatorHandler = () => {
    onClickIndicator()
    if (nowIndicatorNum === lastIndicatorNum) {
      return setNowIndicatorNum(0)
    }
    setNowIndicatorNum(nowIndicatorNum + 1)
  }

  return (
    <div
      className={[styles.inputIndicator, className].join(' ')}
      data-indicator-value={nowIndicator.data}
      style={style}
    >
      <div
        className={[styles.inputIndicator__indicator, indicatorClassName].join(
          ' '
        )}
        onClick={changeIndicatorHandler}
      >
        {nowIndicator.text}
      </div>
      <input
        type="text"
        value={value}
        onChange={onChangeInputValue}
        onClick={onClickInput}
        placeholder={placeholder}
        className={[styles.inputIndicator__input, inputClassName].join(' ')}
      />
    </div>
  )
}

export default InputIndicator
