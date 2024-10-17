import React, { FC, memo } from 'react'
import styles from './FormChanger.module.css'

interface FormChangerProps {
  header: string,
  value: number,
  increaseValue: () => void
  decreaseValue: () => void
}

const FormChanger: FC<FormChangerProps> = memo((props) => {
  return (
    <div>
      <h3 className={styles.formHeader}>{props.header}</h3>
      <div className={styles.formchanger}>
        <div className={styles.cell}>{props.value}</div>
        <div className={styles.cell + ' ' + styles.controlCell} onClick={props.increaseValue}>+</div>
        <div className={styles.cell + ' ' + styles.controlCell} onClick={props.decreaseValue}>-</div>
      </div>
    </div>
  )
})

export { FormChanger } 