import { useNavigate } from "react-router-dom"
import type { ChatType } from "../@types"
import { formatPhone } from "../hooks/formatPhone"
import { formatDate } from "../hooks/formDate"

const ChatComponent = ({item} : {item: ChatType}) => {
    const navigate = useNavigate()
    
  return (
    <div className="containers">
        <div onClick={() => navigate(item.id)} className="flex  border-b-[1px] border-[#ECECEC] py-[16px] justify-between item-center">
      <div>
        <h2 className="text-[14px] font-bold  ">{item?.debter?.name}</h2>
        <p className="text-[13px] mt-2 font-semibold text-[#000000ad] ">{formatPhone(item?.debter?.phone) }</p>
      </div>
      <p className="text-[12px] font-semibold ">{formatDate(item?.createdAt).dayMonthShort}</p>
    </div>
    </div>
  )
}

export default ChatComponent