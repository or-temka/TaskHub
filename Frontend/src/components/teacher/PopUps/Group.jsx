import { useState } from 'react'

import PopUp from '../../UI/PopUps/PopUp'
import ContentContainer from '../../frames/ContentContainer'
import FrameContent from '../../frames/FrameContent'
import DangerButtonWithIcon from '../../UI/Buttons/DangerButtonWithIcon'
import Button from '../../UI/Buttons/Button'
import { ReactComponent as BinSVG } from '../../../assets/svg/bin.svg'
import PopUpConfirmation from '../../UI/PopUps/PopUpConfirmation'

import styles from './Group.module.scss'
import PrimaryButton from '../../UI/Buttons/PrimaryButton'
import Input from '../../UI/Inputs/Input'
import { fetchEditGroup, fetchRemoveGroup } from '../../../utils/fetchData'

function Group({
  groupData,
  users,
  setNewGroups = () => {},
  delUserHandler = () => {},
  onCancel = () => {},
  className,
  ...params
}) {
  const [group, setGroup] = useState(groupData)

  const [showDelUserPopUpConfirm, setShowDelUserPopUpConfirm] = useState(false)
  const [showDelGroupPopUpConfirm, setShowDelGroupPopUpConfirm] =
    useState(false)
  const [showEditGroupPopUp, setShowEditGroupPopUp] = useState(false)

  const [editGroupValues, setEditGroupValues] = useState({
    name: '',
    cource: '',
  })

  const [disabledEditButton, setDisabledEditButton] = useState(false)
  const [showWrongText, setShowWrongText] = useState(false)

  const usersGroup = users.filter((user) => group.studentsId.includes(user.id))

  const delUserFromGroupHandler = () => {
    const userId = showDelUserPopUpConfirm
    // TODO удаление пользователя из группы

    // Удаление на клиенте
    delUserHandler(group._id, userId)
    setShowDelUserPopUpConfirm(false)
  }

  const delGroupHandler = () => {
    const groupId = group._id
    // удаление группы
    fetchRemoveGroup(groupId)
      .then((res) => {
        setNewGroups((prevValue) =>
          [...prevValue].filter((tempGroup) => tempGroup._id !== group._id)
        )
        onCancel()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const openEditGroupHandler = () => {
    setEditGroupValues({ name: group.name, cource: group.cource })
    setShowEditGroupPopUp(true)
  }

  const editedGroupHandler = () => {
    setDisabledEditButton(true)
    const groupId = group._id
    // отправка новых данных об изменение на сервер
    const newData = {
      name: editGroupValues.name,
      cource: editGroupValues.cource,
    }
    fetchEditGroup(groupId, newData)
      .then((res) => {
        setNewGroups((prevValue) =>
          [...prevValue].map((tempGroup) =>
            tempGroup._id === groupId ? res : tempGroup
          )
        )
        setGroup(res)
        setDisabledEditButton(false)
        setShowWrongText(false)
        setShowEditGroupPopUp(false)
      })
      .catch((error) => {
        setShowWrongText(error.message)
        setDisabledEditButton(false)
      })
  }

  return (
    <>
      <PopUp
        {...params}
        onCancel={onCancel}
        onClickBack={onCancel}
        contentClassName={[styles.group, className].join(' ')}
        className={styles.group__wrapper}
      >
        <ContentContainer className={styles.group__main}>
          <div className={styles.group__info}>
            <h6 className={styles.group__name}>{group.name}</h6>
            <div className={styles.group__ads}>
              <div className={styles.group__infoLine}>
                <span className={styles.group__infoLabel}>Курс:</span>
                <span className={styles.group__infoValue}>{group.cource}</span>
              </div>
              <div className={styles.group__infoLine}>
                <span className={styles.group__infoLabel}>Студентов:</span>
                <span className={styles.group__infoValue}>
                  {group.studentsId.length}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.group__buttons}>
            <DangerButtonWithIcon
              title="Удалить группу"
              svgElem={<BinSVG />}
              onClick={() => setShowDelGroupPopUpConfirm(true)}
            />
            <Button title="Редактировать" onClick={openEditGroupHandler} />
          </div>
        </ContentContainer>
        <ContentContainer
          headerText="Студенты группы"
          className={styles.group__studentsContainer}
        >
          <FrameContent
            className={styles.group__studentsWrapper}
            contentClassName={styles.group__students}
          >
            {usersGroup.map((user) => (
              <div key={user.id} className={styles.group__student}>
                <span className={styles.group__studentName}>{user.name}</span>
                <span
                  className={styles.group__delStudentButton}
                  onClick={() => setShowDelUserPopUpConfirm(user.id)}
                >
                  Удалить из группы
                </span>
              </div>
            ))}
          </FrameContent>
        </ContentContainer>
      </PopUp>

      {/* PopUp`s */}
      {showDelUserPopUpConfirm && (
        <PopUpConfirmation
          onCancel={() => setShowDelUserPopUpConfirm(false)}
          onClickBack={() => setShowDelUserPopUpConfirm(false)}
          labelText="Вы действительно хотите удалить данного пользователя из группы?"
          text={`Студент "${
            users.find((user) => user.id === showDelUserPopUpConfirm).name
          }" будет удален из группы "${
            group.name
          }". Вы в любой момент можете добавить его обратно в группу.`}
          onConfirm={delUserFromGroupHandler}
        />
      )}
      {showDelGroupPopUpConfirm && (
        <PopUpConfirmation
          onCancel={() => setShowDelGroupPopUpConfirm(false)}
          onClickBack={() => setShowDelGroupPopUpConfirm(false)}
          labelText={`Вы действительно хотите удалить группу "${group.name}"?`}
          text="Восстановить её не получится."
          onConfirm={delGroupHandler}
        />
      )}
      {showEditGroupPopUp && (
        <PopUp
          headerText="Редактирование группы"
          className={styles.editGroup__popUp}
          contentClassName={styles.editGroup}
          onCancel={() => setShowEditGroupPopUp(false)}
          onClickBack={() => setShowEditGroupPopUp(false)}
        >
          <div className={styles.editGroup__content}>
            <div className={styles.editGroup__inputLine}>
              <span className={styles.editGroup__inputLabel}>
                Название группы:
              </span>
              <Input
                className={styles.editGroup__input}
                placeholder="Введите название группы"
                value={editGroupValues.name}
                onChange={(e) =>
                  setEditGroupValues({
                    ...editGroupValues,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div className={styles.editGroup__inputLine}>
              <span className={styles.editGroup__inputLabel}>Курс:</span>
              <Input
                className={styles.editGroup__input}
                placeholder="Введите курс"
                value={editGroupValues.cource}
                onChange={(e) =>
                  setEditGroupValues({
                    ...editGroupValues,
                    cource: e.target.value,
                  })
                }
              />
            </div>
            {showWrongText && (
              <span className={styles.editGroup__wrongText}>
                {showWrongText}
              </span>
            )}
          </div>
          <div className={styles.editGroup__buttons}>
            <PrimaryButton
              title="Сохранить изменения"
              onClick={editedGroupHandler}
              loading={disabledEditButton}
            />
            <Button
              title="Отмена"
              onClick={() => setShowEditGroupPopUp(false)}
            />
          </div>
        </PopUp>
      )}
    </>
  )
}

export default Group
