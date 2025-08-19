import { useEffect, useState } from "react";
import { MessageIcon, ReportIcon } from "../assets/icons";
import axios from "axios";
import { API } from "../hooks/getEnv";
import { useCookies } from "react-cookie";
import type { ChatType,  PaymentsType } from "../@types";
import ReportNot from "../components/ReportNot";
import { useNavigate } from "react-router-dom";
import ChatComponent from "../components/ChatComponent";
import Footer from "../components/Footer";
import PaymentsCard from "../components/PaymentsCard";
import { formatDate } from "../hooks/formDate";
import { paths } from "../hooks/paths";

const Report = () => {
    const [active, setActive] = useState<"message" | "history">("message");
    const activeStyle =
        "bg-white rounded-[6px] text-[#3478F7] font-semibold  text-[14px] py-[9px] px-[38px] ";
    const inactiveStyle =
        "text-[#1A1A1ACC] font-medium text-[14px] py-[9px] px-[38px]";
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const [payments, setPayments] = useState<PaymentsType[] >([]);
    const [chats, setChats] = useState<ChatType[] | []>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!cookies.token) navigate("/login");

        const fetchUser = async () => {
            try {
                const meRes = await axios.get(`${API}/auth/me`, {
                    headers: { Authorization: `Bearer ${cookies.token}` },
                });

                const sellerId = meRes.data?.id;
                if (!sellerId) {
                    console.warn("sellerId topilmadi");
                    return;
                }

                const chatRes = await axios.get(
                    `${API}/chat?sellerId=${sellerId}`,
                    {
                        headers: { Authorization: `Bearer ${cookies.token}` },
                    }
                );
                setChats(chatRes.data.data);

                const historyRes = await axios.get(`${API}/payments`, {headers: {Authorization: `Bearer ${cookies.token}`}})
                setPayments(historyRes.data);
                

            } catch (error) {
                console.error("Xatolik:", error);
            }
        };

        fetchUser();
    }, [cookies.token]);


    return (
        <>
            <div className="containers">
                <div className="flex pb-[18px] border-b-[1px] border-[#ECECEC] mt-[26px] justify-between">
                    <h2 className="text-[20px] font-bold ">Hisobot</h2>
                    <button onClick={() => navigate(paths.exampleMessages)}><ReportIcon/></button>
                </div>
                <div className=" rounded-[8px] mt-[18px] items-center justify-between p-[2px] flex bg-[#F6F6F6]  ">
                    <h3
                        onClick={() => setActive("message")}
                        className={
                            active == "message" ? activeStyle : inactiveStyle
                        }
                    >
                        Xabarlar tarixi
                    </h3>
                    <h3
                        onClick={() => setActive("history")}
                        className={
                            active == "history" ? activeStyle : inactiveStyle
                        }
                    >
                        To‘lovlar tarixi
                    </h3>
                </div>
                   {active == "message" ?  <div className="mt-[16px]">
                        {chats.length > 0 ? (
                            chats.map((item) => (
                                <ChatComponent item={item} key={item.id} />
                            ))
                        ) : (
                            <ReportNot />
                        )}
                    </div> : ""}
                   {active == "history" ?  <div className="mt-[16px]">
                        {payments.length > 0 ? (
payments.map((item, index) => {
  const prevItem = payments[index - 1];
  const currentDate = formatDate(item.createdAt).dateOnly;
  const prevDate = prevItem ? formatDate(prevItem.createdAt).dateOnly : null;

  const isDate = currentDate !== prevDate;

  return (
    <PaymentsCard
      key={item.id}
      isDate={isDate}
      item={item}
    />
  );
})
                        ) : (
                            <ReportNot />
                        )}
                    </div> : ""}
            </div>
            <button onClick={() => navigate("/chat/create")} className={`p-[16px] fixed bottom-22 right-5 bg-[#3478F7] rounded-full ${active == "history" ? "hidden" : ""} `}><MessageIcon/></button>
            <Footer activePage="hisobot" />
        </>
    );
};

export default Report;
