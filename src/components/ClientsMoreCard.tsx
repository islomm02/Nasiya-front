import { useNavigate } from "react-router-dom"
import type { DebtType } from "../@types"
import { FormatterPrice } from "../hooks/FormatterPrice"
import { formatDate } from "../hooks/formDate"
import { DebtProgress } from "./DebtProcent"

const ClientsMoreCard = ({item}:{item: DebtType}) => {
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate(`/credits/${item.id}`)} className="bg-[#F6F6F6]  p-[16px] rounded-[16px] ">
        <div className="flex mb-[20px] justify-between  ">
          <p className="font-medium text-[14px]">{formatDate(item.createdAt).fullFormatted}</p>
          <p className="font-semibold text-[14px] text-[#3478F7] ">{FormatterPrice(item.remainingAmount)?.space} so'm</p>
        </div>
        <div>
          <p className="text-[12px] leading-[16px] ">Keyingi to'lo'v: {formatDate(item.nextPaymentDay).dateOnly}</p>
          <div className="flex items-center gap-2">
            <p className="font-extrabold text-[24px] text-[#735CD8] ">{FormatterPrice(item.monthlyPayment)?.space} </p>
          <p>so'm</p>
          </div>
        </div>
        <DebtProgress remainingMonths={item.remainingMonths} term={item.term} />
    </div>
  )
}

export default ClientsMoreCard