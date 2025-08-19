import axios from "axios";
import { ArrowLeft, Divide } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../hooks/getEnv";
import type { DebterType, ExampleMessageType, MessageType } from "../@types";
import { MoreIcon, ReportIcon, SendIcon } from "../assets/icons";
import { useCookies } from "react-cookie";
import ChatMessageCard from "../components/ChatMessageCard";
import { formatDate } from "../hooks/formDate";
import MessagesNot from "../components/MessagesNot";
import ExampleMessagesCard from "../components/ExampleMessagesCard";

const ReportMore = () => {
    const { id } = useParams();
    console.log(id);
    
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const [examples, setExamples] = useState<ExampleMessageType[]>([])

    const [isMoreOpen, setIsMoreOpen] = useState<boolean>(false);
    const [debter, setDebter] = useState<DebterType | null>(null);
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const [newMessage, setNewMessage] = useState<string>("");
    const navigate = useNavigate();
    const [isExampleOpen, setIsExampleOpen] = useState<boolean>(false)
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res: { data: MessageType[] } = await axios.get(
                    `${API}/messages?chatId=${id}`,
                    {
                        headers: { Authorization: `Bearer ${cookies.token}` },
                    }
                );
                console.log(res);

                axios.get(`${API}/example-messages`, {headers: {Authorization: `Bearer ${cookies.token}`}}).then(res => setExamples(res.data))
                

                setMessages(res.data);

                const debterId = res.data[0].debterId;
                if (debterId) {
                    const userRes = await axios.get(
                        `${API}/debter/${debterId}`
                    );
                    setDebter(userRes.data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchUser();
    }, [id, cookies.token]);

    const handleSend = () => {
        axios
            .post(
                `${API}/messages`,
                { message: newMessage, chatId: id },
                { headers: { Authorization: `Bearer ${cookies.token}` } }
            )
            .then((res) => {
                console.log(res);
                
                const createdMessage = res.data;
                setMessages((prev) => [...prev, createdMessage]);
                setNewMessage("");
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handleDelete = async () => {
        await axios
            .delete(`${API}/chat/delete/${id}`, {
                headers: { Authorization: `Bearer ${cookies.token}` },
            })
            .then((res) => {
                console.log(res);
                
                setDeleteModalOpen(false);
                setIsMoreOpen(false);
                navigate("/report");
            });
    };


    return (
        <div className="containers">
            <div className="flex fixed left-[5%] top-0 z-50 right-[2%] bg-white pb-2 pt-[34px] justify-between">
                <button onClick={() => navigate("/report")} className="p-0">
                    <ArrowLeft className="h-6 w-6" />
                </button>

                <h1 className="text-[18px] text-black font-semibold">
                    {debter?.name}
                </h1>
                <button onClick={() => setIsMoreOpen(!isMoreOpen)}>
                    <MoreIcon />
                </button>
            </div>
            <div
                onClick={() => setIsMoreOpen(false)}
                className={`pl-[16px] absolute z-50  bg-white top-20 right-0 w-[172px] border-[1px] border-[#ECECEC]  rounded-[16px] shadow-xl ${
                    isMoreOpen ? "" : "hidden"
                } `}
            >
                
                <p
                    onClick={() => {
                        setDeleteModalOpen(true);
                    }}
                    className="text-red-500 p-2"
                >
                    O‘chirish
                </p>
            </div>
            <div className="flex pb-20 pt-20 flex-col items-end">

                    {messages.length > 0 ? messages.map((item, index) => {
                    const nextItem = messages[index + 1];
                    const currentDate = formatDate(
                        item.createdAt
                    ).dayMonthShort;
                    const nextDate = nextItem
                        ? formatDate(nextItem.createdAt).dayMonthShort
                        : null;
                    const todayDate = formatDate(
                        new Date().toISOString()
                    ).dayMonthShort;

                    const isDate =
                        currentDate === nextDate
                            ? false
                            : currentDate === todayDate
                            ? "today"
                            : true;

                    return (
                        <ChatMessageCard
                            key={item.id}
                            item={item}
                            isDate={isDate}
                        />
                    );
                }) : <div className=" contianers w-full text-center mt-[200px] flex justify-center items-center">
                    <h2>Habar yuborishni boshlang</h2>
                </div> }

                {}
            </div>

            <div
                    className={`fixed inset-0 flex items-center justify-center backdrop-blur-2xl transition-all duration-300 ${
                        deleteModalOpen
                            ? "opacity-100 visible"
                            : "opacity-0 invisible"
                    }`}
                >
                    <div
                        onClick={() => setDeleteModalOpen(false)}
                        className={`fixed inset-0 flex items-center justify-center backdrop-blur-2xl transition-all duration-300 ${
                            deleteModalOpen
                                ? "opacity-100 visible"
                                : "opacity-0 invisible"
                        }`}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white border border-red-200 rounded-[20px] overflow-hidden shadow-lg transform transition-transform duration-300"
                        >
                            <p className="p-4 font-medium text-[15px]">
                                Ochirishni tasdiqlaysizmi?
                            </p>
                            <div className="flex">
                                <button
                                    onClick={() => setDeleteModalOpen(false)}
                                    className="w-1/2 py-[10px] bg-[#d40000] hover:bg-red-600 duration-200 text-white"
                                >
                                    Yo'q
                                </button>
                                <button onClick={() => handleDelete()} className="w-1/2 py-[10px] bg-[#32d41c] hover:bg-[#35e01f] duration-200 text-white">
                                    Ha 
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
          <div className="fixed bottom-0 w-full bg-white border-t border-[#ECECEC] z-20">
    {/* Input panel */}
    <div className="flex py-[8px] px-[16px] gap-2 justify-start border-b border-[#ECECEC]">
        <button onClick={() => setIsExampleOpen(!isExampleOpen)}>
            <ReportIcon />
        </button>
        <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="bg-[#F5F5F5] pr-[50px] w-full focus:outline-0 py-[12px] px-[16px] rounded-[50px]"
            placeholder="Xabar yozish..."
            type="text"
        />
        {newMessage && (
            <button
                type="submit"
                onClick={() => handleSend()}
                className="absolute mt-[13px] right-10"
            >
                <SendIcon />
            </button>
        )}
    </div>

    {/* Example list */}
    {isExampleOpen && (
        <div className="max-h-[230px] overflow-y-auto">
            <div className="flex  gap-[16px] p-2">
                <button onClick={() => setIsExampleOpen(false)}>
                    <ArrowLeft />
                </button>
                <h2 className="text-[16px] font-semibold">Namunalar</h2>
            </div>

            {examples && examples.length > 0 ? (
                examples.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => setNewMessage(item.text)}
                        className="cursor-pointer mr-[30px]"
                    >
                        <ExampleMessagesCard item={item} />
                    </div>
                ))
            ) : (
                <h2 className="text-center mt-[80px] text-[16px] font-semibold">
                    Sizda hali namunalar yo‘q
                </h2>
            )}
        </div>
    )}
</div>


        </div>
    );
};

export default ReportMore;
