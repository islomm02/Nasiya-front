import { useCookies } from "react-cookie"
import { ArrowRight, LogOutIcon } from "../assets/icons"
import Footer from "../components/Footer"
import Text from "../components/Text"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const Settings = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"])
  const [isLogoutOpen, setIsLogoutOpen] = useState<boolean>(false)
  const navigate = useNavigate()
  return (
    <div className="containers">
        <div className="p-[16px] sticky z-30 pt-[29px] border-b-[1px] border-[#ECECEC]">
        <h2 className="text-[20px] font-medium ">Sozlamalar</h2>
      </div>
      <div className=" h-[78vh] overflow-y-auto">
      <div>
        <Text title="" extraClass="!text-[#3478F7] mt-[28px] " >Asosiy</Text>
        <div onClick={() => navigate("/profile")} className="flex border-b-[1px] py-[18px] border-[#ECECEC] justify-between items-center">
          <Text  title="" extraClass="" >Shaxsiy ma’lumotlar</Text>
          <ArrowRight/>
        </div>
        <div className="flex border-b-[1px] py-[18px] border-[#ECECEC] justify-between items-center">
          <Text title="" extraClass="" >Xavfsizlik</Text>
          <ArrowRight/>
        </div>
      </div>
      
      <div className="relative">
        <Text title="" extraClass="!text-[#3478F7] mt-[28px] " >Boshqa</Text>
        <div onClick={() => navigate("help")} className="flex border-b-[1px] py-[18px] border-[#ECECEC] justify-between items-center">
          <Text title="" extraClass="" >Yordam</Text>
          <ArrowRight/>
        </div>
        <div onClick={() => navigate("/suggestions")} className="flex border-b-[1px] py-[18px] border-[#ECECEC] justify-between items-center">
          <Text title="" extraClass="" >Taklif va shikoyatlar</Text>
          <ArrowRight/>
        </div>
        <div onClick={() => navigate("/about-app")} className="flex border-b-[1px] py-[18px] border-[#ECECEC] justify-between items-center">
          <Text title="" extraClass="" >Dastur haqida</Text>
          <ArrowRight/>
        </div>
        <div className="flex border-b-[1px] py-[18px] border-[#ECECEC] justify-between items-center">
          <Text title="" extraClass="" >Ommaviy oferta</Text>
          <ArrowRight/>
        </div>
        <div className="flex border-b-[1px] py-[18px] border-[#ECECEC] justify-between items-center">
          <Text title="" extraClass="" >Maxfiylik siyosati</Text>
          <ArrowRight/>
        </div>
        <div onClick={() => setIsLogoutOpen(true)}>
          <Text  title="" extraClass="!text-[#F94D4D] pb-[20px] mt-[18px] " >Chiqish</Text>
        </div>
        {isLogoutOpen && (
  <div className="fixed inset-0 z-40">
    <div 
      className="absolute z-0 inset-0 bg-black/30 backdrop-blur-sm"
      onClick={() => setIsLogoutOpen(false)} 
    />

    <div className="absolute bottom-0 left-0 w-full bg-white rounded-tr-[16px] rounded-tl-[16px] p-6">
      <div className="text-center flex flex-col justify-center items-center">
        <LogOutIcon />
        <h2 className="text-[18px] font-bold mt-[16px] mb-2">Hisobdan chiqish</h2>
        <p className="text-[14px] text-[#333333] mb-[49px]">
          Siz haqiqatan hisobdan chiqmoqchimisiz?
        </p>
        <div className="flex gap-[10px]">
          <button onClick={() => removeCookie("token")} className="py-[12px] text-[14px] font-medium px-[45px] border border-[#EDEDED] text-[#3478F7] rounded-[16px]">
            Ha, chiqish
          </button>
          <button
            onClick={() => setIsLogoutOpen(false)}
            className="py-[12px] text-[14px] font-medium px-[45px] bg-[#F94D4D] text-white rounded-[16px]"
          >
            Bekor qilish
          </button>
        </div>
      </div>
    </div>
  </div>
)}


      </div>
      </div>
      <Footer activePage="settings"/>
    </div>
  )
}

export default Settings