import ContentHeader from '../components/frames/ContentHeader'

const PAGE_NAME = 'Вход в аккаунт'

function SignIn({ setPageName }) {
  setPageName(PAGE_NAME)

  return (
    <div className="wrapper">
      <ContentHeader title={PAGE_NAME}></ContentHeader>
    </div>
  )
}

export default SignIn
