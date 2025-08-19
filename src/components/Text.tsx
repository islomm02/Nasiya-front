import type { FC } from "react"
import type { TextType } from "../@types"

const Text:FC<TextType> = ({extraClass, children, onClick, title}) => {
  return (
    <p onClick={onClick} className={`${extraClass} font-medium text-[16px]`}>{children || title}</p>
  )
}

export default Text