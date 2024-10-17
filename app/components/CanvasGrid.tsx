import React, { FC, memo, useRef } from 'react'
import { CanvasRow } from './CanvasRow'
import styles from "@/app/styles/CanvasGrid.module.css"
import { useAppDispatch, useAppSelector } from '../lib/hooks'
import { clearCanvas } from '../lib/reducers/CanvasClise/CanvasSlice'
import html2canvas from 'html2canvas'

const CanvasGrid: FC = memo(() => {
  const canvasRef = useRef(null)
  const dispatch = useAppDispatch()

  const rows: React.ReactElement[] = []

  const width = useAppSelector((state) => state.canvasReducer.width)
  const height = useAppSelector((state) => state.canvasReducer.height)

  for (let i = 0; i < width; i++) {
    rows.push(<CanvasRow key={i} x={i} height={height} />)
  }

  const saveImage = () => {
    if (!canvasRef?.current) return

    html2canvas(canvasRef.current, { backgroundColor: null, scale: 1 / 40 }).then((canvas) => {
      const imageUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'masterpiece.png';
      link.click();
    });
  }


  return (
    <div className={styles.canvasGrid}>
      <div ref={canvasRef} className={styles.rows}>
        {rows}
      </div>
      <div className={styles.controlButtons}>
        <button onClick={() => dispatch(clearCanvas())}>Очистить</button>
        <button onClick={saveImage}>Сохранить</button>
      </div>
    </div>
  )
})

export { CanvasGrid }