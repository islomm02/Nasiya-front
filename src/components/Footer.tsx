import { useNavigate } from "react-router-dom"
import { ClientsIcon, ClientsIconActive, HisobotIcon, HisobotIconActive, HomeIcon, HomeIconActive, SettingsIcon, SettingsIconActive } from "../assets/icons"
import { useState } from "react"

const Footer = ({ activePage }: { activePage: "asosiy" | "clients" | "hisobot" | "settings" }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState<"asosiy" | "clients" | "hisobot" | "settings">(activePage);

  return (
    <div className="fixed bottom-0 left-0 w-[375px] h-[70px] bg-white border-t-[1px] border-[#EDEDED] z-10 max-w-[400px] mx-auto px-4">
      <div className="flex justify-around items-center h-full">
        <div
          onClick={() => {
            navigate("/");
            setActive("asosiy");
          }}
          className={`flex cursor-pointer ${
            active === "asosiy" ? "text-[#3478F7]" : "text-[#637D92]"
          } flex-col items-center`}
        >
          {active === "asosiy" ? <HomeIconActive /> : <HomeIcon />}
          <p className="text-xs">Asosiy</p>
        </div>

        {/* Mijozlar */}
        <div
          onClick={() => {
            navigate("/clients");
            setActive("clients");
          }}
          className={`flex cursor-pointer ${
            active === "clients" ? "text-[#3478F7]" : "text-[#637D92]"
          } flex-col items-center`}
        >
          {active === "clients" ? <ClientsIconActive /> : <ClientsIcon />}
          <p className="text-xs">Mijozlar</p>
        </div>

        {/* Hisobot */}
        <div
          onClick={() => {
            navigate("/report");
            setActive("hisobot");
          }}
          className={`flex cursor-pointer ${
            active === "hisobot" ? "text-[#3478F7]" : "text-[#637D92]"
          } flex-col items-center`}
        >
          {active === "hisobot" ? <HisobotIconActive /> : <HisobotIcon />}
          <p className="text-xs">Hisobot</p>
        </div>

        {/* Sozlama */}
        <div
          onClick={() => {
            navigate("/settings");
            setActive("settings");
          }}
          className={`flex cursor-pointer ${
            active === "settings" ? "text-[#3478F7]" : "text-[#637D92]"
          } flex-col items-center`}
        >
          {active === "settings" ? <SettingsIconActive /> : <SettingsIcon />}
          <p className="text-xs">Sozlama</p>
        </div>
      </div>
    </div>
  );
};



export default Footer