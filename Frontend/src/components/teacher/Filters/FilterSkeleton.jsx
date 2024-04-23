import ContentContainer from '../../frames/ContentContainer'

import styles from './FilterSkeleton.module.scss'

function FilterSkeleton({
  children,
  onClickClear = () => {},
  className,
  ...params
}) {
  return (
    <ContentContainer
      {...params}
      className={[styles.filterSkeleton, className].join(' ')}
    >
      <span className="text-bold">Фильтры</span>
      <span
        className={[
          'paragraph',
          styles.filterSkeleton__clearFiltersButton,
        ].join(' ')}
        onClick={onClickClear}
      >
        Сбросить все фильтры
      </span>
      <div className={styles.filterSkeleton__content}>{children}</div>
    </ContentContainer>
  )
}

export default FilterSkeleton
