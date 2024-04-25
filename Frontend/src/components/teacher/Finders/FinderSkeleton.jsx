import { v4 as uuidv4 } from 'uuid'

import ContentContainer from '../../frames/ContentContainer'
import Input from '../../UI/Inputs/Input'

import styles from './FinderSkeleton.module.scss'

function FinderSkeleton({
  children,
  inputSearchPlaceholder = 'Поиск',
  searchInputValue = '',
  onChangeSearchInput = () => {},
  textButtonsSorters = [],
  className,
  ...params
}) {
  return (
    <ContentContainer
      {...params}
      className={[styles.finderSkeleton, className].join(' ')}
      wrapperClassName={styles.finderSkeleton__wrapper}
    >
      <div className={styles.finderSkeleton__search}>
        <span className={styles.finderSkeleton__searchLabel}>Поиск:</span>
        <Input
          placeholder={inputSearchPlaceholder}
          className={styles.finderSkeleton__searchInput}
          value={searchInputValue}
          onChange={onChangeSearchInput}
        />
      </div>
      <div className={styles.finderSkeleton__sort}>
        <span className={styles.finderSkeleton__sortLabel}>Сортировка по:</span>
        {textButtonsSorters.map((button) => (
          <div
            key={uuidv4()}
            className={styles.finderSkeleton__sortButtonContainer}
          >
            {button}
          </div>
        ))}
      </div>
      <div className={styles.finderSkeleton__content}>{children}</div>
    </ContentContainer>
  )
}

export default FinderSkeleton
