import { useNavigate } from "react-router-dom"
import { ClientsIcon, HisobotIcon, HomeIcon, SettingsIcon } from "../assets/icons"
import { useState } from "react"

const Footer = () => {
    const navigate = useNavigate()
    const [active, setActive] = useState<"asosiy" | "clients" | "hisobot" | "settings">("asosiy")
  return (
    <div className="max-w-[400px]  ">
        <div className="flex justify-around  ">
            <div onClick={() => {navigate("/"); setActive("asosiy")}} className={`flex px-[21px] py-[10px] cursor-pointer ${active == "asosiy" ? "text-[#3478F7]" : "text-[#637D92]"} flex-col items-center`}>
                <HomeIcon extraClass={`${active == "asosiy" ? "text-[#3478F7]" : "text-[#637D92]"}`} />
                <p>Asosiy</p>
            </div>
            <div onClick={() => {navigate("/clients"), setActive("clients")} } className={`flex px-[21px] py-[10px] cursor-pointer ${active == "clients" ? "text-[#3478F7]" : "text-[#637D92]"} flex-col items-center`}>
                <ClientsIcon extraClass={`${active == "clients" ? "text-[#3478F7]" : "text-[#637D92]"}`} />
                <p>Mijozlar</p>
            </div>
            <div onClick={() => {navigate("/report"); setActive("hisobot")} } className={`flex px-[21px] py-[10px] cursor-pointer ${active == "hisobot" ? "text-[#3478F7]" : "text-[#637D92]"} flex-col items-center`}>
                <HisobotIcon extraClass={`${active == "hisobot" ? "text-[#3478F7]" : "text-[#637D92]"}`} />
                <p>Hisobot</p>
            </div>
            <div onClick={() => {navigate("/settings"); setActive("settings")}} className={`flex px-[21px] py-[10px] cursor-pointer ${active == "settings" ? "text-[#3478F7]" : "text-[#637D92]"} flex-col items-center`}>
                <SettingsIcon extraClass={`${active == "settings" ? "text-[#3478F7]" : "text-[#637D92]"}`} />
                <p>Sozlama</p>
            </div>
        </div>
    </div>
  )
}

export default Footer