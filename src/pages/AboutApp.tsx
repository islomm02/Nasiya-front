import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { LogoIcon } from "../assets/icons"

const AboutApp = () => {
    const navigate = useNavigate()
  return (
    <div className="containers">
        <div>
            <div className="flex py-[11px] mb-[18px]  gap-[90px] mt-[31px] ">
            <button onClick={() => navigate("/settings")}><ArrowLeft/></button>
            <h2 className="text-[18px] font-semibold ">Dastur haqida</h2>
        </div>
        <div className="w-[80px] pb-[40px]  mx-auto">
            <button className=" "><LogoIcon height="80" width="80"/></button>
        </div>
        <hr className="text-[#ECECEC]" />
        <div className="flex justify-between items-center py-[20px]">
            <p className="text-[14px] font-medium text-[#000000B2] ">Dastur versiyasi</p>
            <p className="text-[14px] font-bold ">1.0.4 </p>
        </div>
        </div>
    </div>
  )
}

export default AboutApp