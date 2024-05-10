import FloatingPanelSkeleton from './FloatingPanelSkeleton'

import styles from './FloatingPanelContainer.module.scss'

function FloatingPanelContainer({
  children,
  className,
  wrapperClassName,
  ...params
}) {
  return (
    <FloatingPanelSkeleton className={wrapperClassName}>
      <div {...params} className={[styles.floatingPanel, className].join(' ')}>
        {children}
      </div>
    </FloatingPanelSkeleton>
  )
}

export default FloatingPanelContainer
