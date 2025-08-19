import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import Text from "../components/Text"
import toast from "react-hot-toast"
import { useState } from "react"

const Suggestions = () => {
    const navigate = useNavigate()
    const [message, setMessage] = useState("")
  return (
    <div className="containers">
        <div className="flex py-[11px] mb-[18px]  gap-[90px] mt-[31px] ">
            <button onClick={() => navigate("/settings")}><ArrowLeft/></button>
            <h2 className="text-[18px] font-semibold ">Taklif va shikyatlar</h2>
        </div>
        <div>
            <h2 className="text-[22px] font-semibold max-w-[280px] ">Odatda bu yerga kamdan-kam kelishadi 😊</h2>
            <Text extraClass="!text-[14px] !text-[#000000B2] !mt-3 !max-w-[335px] " title="Dastur haqida taklif yoki shikoyatlaringiz bo‘lsa bizga yozing. Albatta sizning fikringiz biz uchun juda muhim." />
        </div>
        <div>
              <h2 className=" mt-[40px] mb-[8px] text-[13px] font-semibold">Taklif va shikoyat</h2>
              <textarea onChange={(e) => setMessage(e.target.value)}  placeholder="Xabar yozing..." className="px-[16px] h-[158px] resize-none text-[13px] w-full py-[14px] bg-[#F6F6F6] border-[1px] border-[#ECECEC] rounded-[8px] " name="namuna" id=""></textarea>
            </div>
            <button
            disabled={message === ""}
                                onClick={() => {toast.success("Yuborildi"); navigate("/settings")}}
                                className={`${message ? "" : "bg-[#a8a2ff] hover:bg-[#a8a2ff] "} px-[118px] fixed bottom-2 mt-[32px] py-[13px] w-[92%] rounded-[10px] text-[18px] font-medium transition bg-[#3478F7] hover:bg-[#2c6dd6] text-white `}>
                                Yaratish
                            </button>
    </div>
  )
}

export default Suggestions