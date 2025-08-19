import { Switch } from "antd";
import type { ExampleMessageType } from "../@types";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { MoreIcon } from "../assets/icons";
import axios from "axios";
import { API } from "../hooks/getEnv";
import { useNavigate } from "react-router-dom";

const ExampleMessagesCard = ({ item , isMore}: { item: ExampleMessageType, isMore?:boolean }) => {
    const [isMoreOpen, setIsMoreOpen] = useState<boolean>(false);
    const [__deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const [cookies, __setCookie, __removeCookie] = useCookies(["token"]);
    const [status, setStatus] = useState(item.status)
    const navigate = useNavigate()


    const handleSet = (id:string) => {
        axios.patch(`${API}/example-messages/${id}`, {status: !item.status}, {headers: {Authorization: `Bearer ${cookies.token}`}}).then(() => setStatus(!status))

    }

    return (
        <div className="bg-[#F5F5F5] mb-[16px] p-[16px] rounded-[16px] relative">
    <div className="flex justify-between mb-1">
        <Switch onClick={() => handleSet(item.id)} checked={status} />
        <button className={`${isMore ? "" : "hidden"}`} onClick={() => setIsMoreOpen(!isMoreOpen)}>
            <MoreIcon />
        </button>
    </div>

    {isMoreOpen && (
        <div
            className="pl-[16px] absolute bg-white top-[40px] right-0 w-[172px] border-[1px] border-[#ECECEC] rounded-[16px] shadow-xl z-10"
        >
            <p
                onClick={() => navigate(`edit/${item.id}`)}
                className="border-b-[1px] p-2 border-[#ECECEC] "
            >
                Tahrirlash
            </p>
            <p
                onClick={() => {
                    setDeleteModalOpen(true);
                    setIsMoreOpen(false);
                }}
                className="text-red-500 p-2"
            >
                O‘chirish
            </p>
        </div>
    )}

    <h2>{item.text}</h2>
</div>

    );
};

export default ExampleMessagesCard;
