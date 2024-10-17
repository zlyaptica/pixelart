import React, { FC, memo, MutableRefObject } from 'react'
import styles from "@/app/styles/Tools.module.css"
import { useAppDispatch, useAppSelector } from '../lib/hooks'
import { setPrimaryColor, setSecondaryColor, swapColors } from '../lib/reducers/ColorSlice'
import { FormChanger } from '../lib/ui/FormChanger/FormChanger'
import { ToolType } from '../lib/enums'
import { setToolType } from '../lib/reducers/ToolSlice'
import changeColorIcon from '@/app/lib/img/changrColor.png'
import Image from 'next/image'
import { increaseHeight, decreaseHeight, decreaseWidth, increaseWidth } from '../lib/reducers/CanvasClise/CanvasSlice'

const Tools: FC = memo(() => {
  const primaryColor = useAppSelector((state) => state.colorReducer.primaryColor)
  const secondaryColor = useAppSelector((state) => state.colorReducer.secondaryColor)
  const width = useAppSelector((state) => state.canvasReducer.width)
  const height = useAppSelector((state) => state.canvasReducer.height)
  const x = useAppSelector((state) => state.canvasReducer.currentPosition.x)
  const y = useAppSelector((state) => state.canvasReducer.currentPosition.y)
  const toolType = useAppSelector((state) => state.toolReducer.toolType)

  const dispatch = useAppDispatch()

  return (
    <div className={styles.tools}>
      <p>x: {x}, y; {y}</p>
      <div className={styles.options}>
        <div className={styles.option}>
          <FormChanger header='Ширина, пикселей'
            value={width}
            increaseValue={() => dispatch(increaseWidth())}
            decreaseValue={() => dispatch(decreaseWidth())} />
        </div>
        <div className={styles.option}>
          <FormChanger header='Высота, пикселей'
            value={height}
            increaseValue={() => dispatch(increaseHeight())}
            decreaseValue={() => dispatch(decreaseHeight())} />
        </div>
      </div>
      <form className={styles.tooltypes}>
        <div>
          <input type="radio" name="brush" id="brush"
            checked={toolType === ToolType.brush}
            onChange={() => dispatch(setToolType(ToolType.brush))} />
          <span className={styles.radioName}>Кисть</span>
        </div>
        <div>
          <input type="radio" name="eraser" id="eraser"
            checked={toolType === ToolType.eraser}
            onChange={() => dispatch(setToolType(ToolType.eraser))} />Ластик
        </div>
        <div>
          <input type="radio" name="colorPicker" id="colorPicker"
            checked={toolType === ToolType.colorPicker}
            onChange={() => dispatch(setToolType(ToolType.colorPicker))} />Пипетка
        </div>
        <div>
          <input type="radio" name="fillBackground" id="fillBackground"
            checked={toolType === ToolType.backgroundFill}
            onChange={() => dispatch(setToolType(ToolType.backgroundFill))} />Залить фон
        </div>
        <div>
          <input type="radio" name="movePixels" id="movePixels"
            checked={toolType === ToolType.move}
            onChange={() => dispatch(setToolType(ToolType.move))} />Переместить
        </div>
      </form>
      <div className={styles.colorControlContainer}>
        <div className={styles.colorControl}>
          <input className={styles.colorPicker + ' ' + styles.secondaryColor} type="color" name="secondary-color-picker" id="color-picker" value={secondaryColor} onChange={(e) => dispatch(setSecondaryColor(e.target.value))} />
          <input className={styles.colorPicker + ' ' + styles.primaryColor} type="color" name="primary-color-picker" id="color-picker" value={primaryColor} onChange={(e) => dispatch(setPrimaryColor(e.target.value))} />
          <Image className={styles.changeColorIcon} width={20} height={20} src={changeColorIcon} alt='изменить цвет' onClick={() => dispatch(swapColors())} />
        </div>
      </div>
    </div>
  )
})

export { Tools } 