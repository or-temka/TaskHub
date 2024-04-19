import TextFocus from '../Texts/TextFocus'
import { ReactComponent as PdfFileSVG } from '../../../assets/svg/pdf-file.svg'
import { ReactComponent as WordFileSVG } from '../../../assets/svg/word-file.svg'
import { ReactComponent as ImageFileSVG } from '../../../assets/svg/img-file.svg'
import { ReactComponent as DefaultFileSVG } from '../../../assets/svg/default-file.svg'

import styles from './File.module.scss'

function File({ className, extension, downloadLink, fileName, ...params }) {
  const fileSVG = ['docx', 'doc', 'word'].includes(extension) ? (
    <WordFileSVG />
  ) : extension === 'pdf' ? (
    <PdfFileSVG />
  ) : ['png', 'jpg', 'jpeg', 'img', 'image'].includes(extension) ? (
    <ImageFileSVG />
  ) : (
    <DefaultFileSVG />
  )

  return (
    <a href={downloadLink} download target="_blank">
      <TextFocus {...params} className={[styles.file, className].join(' ')}>
        <div className={styles.file__fileImage}>{fileSVG}</div>

        <span className={'small-text'}>{fileName}</span>
      </TextFocus>
    </a>
  )
}

export default File
