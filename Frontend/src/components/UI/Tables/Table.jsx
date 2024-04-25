import { v4 as uuidv4 } from 'uuid'

import styles from './Table.module.scss'

function Table({
  ths = [],
  trsOfTds = [[]],
  className,
  trClassName,
  thClassName,
  tdClassName,
  onClickTr = () => {},
  ...params
}) {
  return (
    <table {...params} className={[styles.table, className].join(' ')}>
      <thead className={styles.table__thead}>
        <tr className={[styles.table__tr, trClassName].join(' ')}>
          {ths.map((th) => (
            <th
              className={[styles.table__th, thClassName].join(' ')}
              key={uuidv4()}
            >
              {th}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={styles.table__tbody}>
        {trsOfTds.map((tr) => (
          <tr
            className={[styles.table__tr, trClassName].join(' ')}
            key={uuidv4()}
            onClick={() => onClickTr(tr.value)}
          >
            {tr.tds.map((td) => (
              <td
                className={[styles.table__td, tdClassName].join(' ')}
                key={uuidv4()}
              >
                {td}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
