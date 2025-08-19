import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../hooks/getEnv";
import { useCookies } from "react-cookie";
import type { ExampleMessageType } from "../@types";
import { paths } from "../hooks/paths";
import ExampleMessagesCard from "../components/ExampleMessagesCard";

const ExampleMessages = () => {
    const navigate = useNavigate();
    const [cookies, __setCookie, __removeCookie] = useCookies(["token"]);
    const [examples, setExamples] = useState<ExampleMessageType[]>([]);
    useEffect(() => {
        axios
            .get(`${API}/example-messages`, {
                headers: { Authorization: `Bearer ${cookies.token}` },
            })
            .then((res) => setExamples(res.data ));
    }, []);

    

    return (
        <div className="containers">
            <div className="flex mt-[34px] border-b-[1px] border-[#ECECEC] items-center justify-between px-4 py-4">
                <button onClick={() => navigate("/report")}>
                    <ArrowLeft className="h-6 w-6" />
                </button>
                <h1 className="text-lg font-semibold">Namunalar</h1>
                <div className="w-6"></div>
            </div>
            <div>
                {examples.length == 0 ? (
                    <div className="text-center mt-[200px]">
                        <h2 className="text-[16px] font-semibold">
                            Mavjud namunalar yo‘q
                        </h2>
                        <p className="text-[13px]">
                            <b>“Qo‘shish”</b> tugmasi orqali namuna yarating
                        </p>
                    </div>
                ) : (
                   <div className="mt-[20px]">
                    {examples.map((item) => (<ExampleMessagesCard item={item} key={item.id} />))}
                   </div>
                )}
                <button
                    onClick={() => navigate(paths.createExample)}
                    className={`px-[118px] fixed bottom-2 mt-[32px] py-[13px] w-[92%] rounded-[10px] text-[18px] font-medium transition bg-[#3478F7] hover:bg-[#2c6dd6] text-white `}>
                    Qo'shish
                </button>
            </div>
        </div>
    );
};

export default ExampleMessages;
