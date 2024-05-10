import styles from './FloatingPanelSkeleton.module.scss'

function FloatingPanelSkeleton({
  children,
  posHorizontal = 'right',
  posVertical = 'bottom',
  className,
  ...params
}) {
  // Определение выравнивания
  // По горизонтали
  const classNamePosHorizontal =
    posHorizontal === 'left'
      ? styles.skeleton_horizontal_left
      : posHorizontal === 'center'
      ? styles.skeleton_horizontal_center
      : styles.skeleton_horizontal_right
  const classNamePosVertical =
    posVertical === 'top'
      ? styles.skeleton_vertical_top
      : posVertical === 'center'
      ? styles.skeleton_vertical_center
      : styles.skeleton_vertical_bottom

  return (
    <div
      {...params}
      className={[
        styles.skeleton,
        classNamePosHorizontal,
        classNamePosVertical,
        posHorizontal === 'center' && posVertical === 'center'
          ? styles.skeleton_center
          : '',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}

export default FloatingPanelSkeleton
