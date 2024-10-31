"use client"

import { useEffect } from "react";
import { Tools } from "./components/Tools";
import { CanvasGrid } from "./components/CanvasGrid";
import styles from "./page.module.css"
import { useAppDispatch } from "./lib/hooks";
import { initCanvas } from "./lib/reducers/CanvasClise/CanvasSlice";
import { ICell } from "./lib/models";

export default function Home() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    let canvas: ICell[][] = []
    const data = localStorage.getItem("canvas")

    if (data) {
      canvas = JSON.parse(data)
    } 
    dispatch(initCanvas(canvas))
  }, [])

  return (
    <div className={styles.app}>
      <Tools />
      <CanvasGrid />
    </div>
  )
}
