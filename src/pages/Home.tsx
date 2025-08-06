import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { API } from "../hooks/getEnv";
import { useEffect, useState } from "react";
import type { UserType } from "../@types";
import { CalendarIcon, PlusIcon, WalletIcon } from "../assets/icons";
import axios from "axios";
import CommonCreditsDiv from "../components/CommonCreditsDiv";
import Payments from "../components/Payments";
import { FormatterPrice } from "../hooks/FormatterPrice";
import Footer from "../components/Footer";

const Home = () => {
    const [cookies, __, removeCookie] = useCookies(["token"]);
    const navigate = useNavigate();
    const [user, setUser] = useState<UserType | null>(null);
    const [common, setCommon] = useState<any>(null)
    const [overdue, setOverdue] = useState<any>(null)
    const [clientsCount, setClientsCount] = useState<any>(null)
    const handleLogout = () => {
        removeCookie("token", { path: "/" });
        navigate("/login");
    };

    useEffect(() => {

    const fetchUser = async () => {
      try {
         await axios.get(`${API}/debt/overdue`).then(res => {console.log(res)  ;      setOverdue(res.data)})
         await axios.get(`${API}/common/debts`, {headers: {Authorization: `Bearer ${cookies.token}`}}).then(res => setCommon(res.data))
         await axios.get(`${API}/debter`).then(res => setClientsCount(res.data.total))
        const res = await axios.get(`${API}/auth/me`, {headers: {Authorization: `Bearer ${cookies.token}`}});
        setUser(res.data);
        console.log(res.data);
        console.log(common);
        
      } catch (error) {
        console.error("Xatolik:", error);
      }
    };

    if (cookies.token) {
      fetchUser();
    }
  }, [cookies.token]);

    return (
        <div className="min-h-screen flex flex-col justify-between">
        <div className="containers !mt-[29px] ">
            <div className="flex justify-between items-center">
                <div className="flex gap-[15px] items-center ">
                  <img
                className="rounded-full border-[1px] w-[40px] h-[40px] "
                    src={
                        user?.image
                        ? `${API}/file/${user?.image}`
                            : "data:image/png;base64,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"
                    }
                    alt="User Image"
                />
                <p className="text-black  ">{user?.login}</p>
                </div>
                <button onClick={() => navigate("/calendar")} className="bg-[#F5F5F5] p-2 rounded-[12px] border-[2px] border-[#EDEDED] "><CalendarIcon/></button>
            </div>
            <CommonCreditsDiv/>
            <div className="flex justify-between mt-[31px]">
              <Payments count={overdue } title="Kechiktirilgan to‘lovlar" type="red" />
            <Payments count={clientsCount } title="Mijozlar soni" type="green" />
            </div>


            <div className="flex  flex-col gap-[28px] mt-[40px] ">
                <h2 className="text-[18px] font-semibold " >Hamyoningiz</h2>   
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-[12px]">
                    <div className=" flex items-center justify-center w-[48px] h-[48px] rounded-full bg-[#735CD81A] ">
                    <WalletIcon/>
                    </div>
                    <div>
                      <p className="text-[13px] font-medium leading-[100%] ">Hisobingizda</p>
                      <p className="flex gap-[10px] font-bold text-[24px] leading-[100%] " >{user?.balance ? FormatterPrice(user.balance) : FormatterPrice(300000)} <p className="font-bold text-[18px] ">so'm</p></p>
                    </div>
                  </div>
                  <button className="text-white bg-[#3478F7] rounded-full flex items-center justify-center w-[36px] h-[36px] "><PlusIcon/></button>
                </div>
                <div className="flex justify-between">
                  <p className="text-[14px] font-medium " >Bu oy uchun to‘lov:</p>
                  <p className="text-[14px] font-medium text-[#30AF49] " >To'lov qilingan</p>
                </div>
            </div>

        </div>
        <Footer/>
        </div>
    );
};

export default Home;
