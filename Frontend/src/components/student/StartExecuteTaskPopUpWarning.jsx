import PopUpConfirmation from '../UI/PopUps/PopUpConfirmation'

function StartExecuteTaskPopUpWarning({
  className,
  onCancel = () => {},
  onConfirm = () => {},
  ...params
}) {
  return (
    <PopUpConfirmation
      {...params}
      className={className}
      labelText="Вы уверены, что хотите начать выполнение задания?"
      text="После перехода к выполнению задания у вас не будет шанса вернуть потраченную на решение попытку. Отсчёт таймера задания начнётся через 10 секунд после открытия формы.
      После окончания таймера форма автоматически закроется."
      onCancel={onCancel}
      onConfirm={onConfirm}
      onClickBack={onCancel}
    />
  )
}

export default StartExecuteTaskPopUpWarning
