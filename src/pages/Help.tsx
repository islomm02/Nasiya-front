import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import Text from "../components/Text"
import { InstaIcon, TelegramIcon, TelIcon } from "../assets/icons"

const Help = () => {
  const navigate = useNavigate()
  return (
    <div className="containers">
        <div className="flex py-[11px] mb-[18px]  gap-[120px] mt-[31px] ">
            <button onClick={() => navigate("/settings")}><ArrowLeft/></button>
            <h2 className="text-[18px] font-semibold ">Yordam</h2>
        </div>
        <div>
            <Text extraClass="!text-[16px] !mb-2 !font-semibold " title="Biz doim siz bilan aloqadamiz" />
            <h2 className=" !text-[14px] !text-[#000000B2] !max-w-[327px] ">Har qanday savollarga javob beramiz, buyurtma bilan yordam beramiz, istaklarni tinglaymiz</h2>
        </div>
        <div className="flex mt-[24px] items-center gap-[30px] ">
          <div className="flex flex-col justify-center items-center">
            <InstaIcon/>
            <p className="text-[10px] font-medium">Instagram</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <TelegramIcon/>
            <p className="text-[10px] font-medium">Telegram</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <TelIcon/>
            <p className="text-[10px] font-medium">Aloqa uchun</p>
          </div>
        </div>
    </div>
  )
}

export default Help