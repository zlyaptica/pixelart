"use client"

import { useEffect } from "react";
import { Tools } from "./components/Tools";
import { CanvasGrid } from "./components/CanvasGrid";
import styles from "./page.module.css"
import { useAppDispatch } from "./lib/hooks";
import { initCanvas } from "./lib/reducers/CanvasClise/CanvasSlice";

export default function Home() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initCanvas())
  }, [])

  return (
    <div className={styles.app}>
      <Tools />
      <CanvasGrid />
    </div>
  )
}
