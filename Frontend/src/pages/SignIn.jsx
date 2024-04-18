import { useState } from 'react'

import ContentHeader from '../components/frames/ContentHeader'
import ContentContainer from '../components/frames/ContentContainer'
import PrimaryButton from '../components/UI/Buttons/PrimaryButton'
import Input from '../components/UI/Inputs/Input'

import styles from './SignIn.module.scss'

const PAGE_NAME = 'Вход в аккаунт'

function SignIn({ setPageName }) {
  setPageName(PAGE_NAME)

  const [loginInputVal, setLoginInputVal] = useState('')
  const [passwordInputVal, setPasswordInputVal] = useState('')

  return (
    <div className={['wrapper', styles.signIn].join(' ')}>
      <ContentHeader title={PAGE_NAME}></ContentHeader>
      <ContentContainer className={styles.signIn__content}>
        <div className={styles.signIn__form}>
          <div className={styles.signIn__inputs}>
            <div className={styles.signIn__inputContainer}>
              <span className={styles.signIn__inputLabel}>Логин:</span>
              <Input
                placeholder="Введите ваш логин"
                className={styles.signIn__input}
                value={loginInputVal}
                onChange={(e) => setLoginInputVal(e.target.value)}
              />
            </div>
            <div className={styles.signIn__inputContainer}>
              <span className={styles.signIn__inputLabel}>Пароль:</span>
              <Input
                placeholder="Введите ваш пароль"
                className={styles.signIn__input}
                value={passwordInputVal}
                onChange={(e) => setPasswordInputVal(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.signIn__sendBtnContainer}>
            <PrimaryButton
              title="Войти"
              onClick={() => {}}
              className={styles.signIn__sendBtn}
            />
          </div>
        </div>

        <ContentContainer>
          <span>
            Укажите логин и пароль, которые вам выдал преподаватель.
            <br></br>
            <br></br>В случае, если у вас нет данных для входа, просьба
            обратиться к преподавателю для получения данных.
          </span>
        </ContentContainer>
      </ContentContainer>
    </div>
  )
}

export default SignIn
