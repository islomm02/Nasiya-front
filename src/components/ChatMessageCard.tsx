import { DotIcon } from "lucide-react"
import type { MessageType } from "../@types"
import { formatDate } from "../hooks/formDate"

const ChatMessageCard = ({ item, isDate }: { item: MessageType, isDate: boolean | "today" }) => {
  return (
    <>
    <div className={isDate ? `  flex flex-col max-w-[100px] mx-auto justify-center items-center` : "hidden"}>
      <p className="mt-[32px] text-[#323F49] text-[12px] font-medium flex mb-[20px] ">{formatDate(item.createdAt).dayMonthShort} <DotIcon/> {formatDate(item.createdAt).timeOnly}  </p>
    </div>
    <div className="max-w-[80%]">
      <h3 className="bg-[#F5F5F5] font-light rounded-[16px] mb-[16px] p-[16px] text-[13px] inline-block w-full break-words relative">
        {item?.message}
        <span className="text-[9px] text-gray-500 absolute bottom-1 right-2">
          {formatDate(item.createdAt).timeOnly}
        </span>
      </h3>
    </div>
    </>
  )
}

export default ChatMessageCard
