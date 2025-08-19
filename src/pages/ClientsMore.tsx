import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import type { DebterType, DebtType } from "../@types";
import { MoreIcon, StarIconFilled, StarIconUnfilled } from "../assets/icons";
import { FormatterPrice } from "../hooks/FormatterPrice";
import DontHaveCreditDiv from "../components/DontHaveCreditDiv";
import ClientsMoreCard from "../components/ClientsMoreCard";
import { PlusOutlined } from "@ant-design/icons";
import { paths } from "../hooks/paths";
import axios from "axios";
import { API } from "../hooks/getEnv";
import { useCookies } from "react-cookie";

const ClientsMore = () => {
    const [user, setUser] = useState<DebterType | null>(null);
    const [cookies, __setCookie, __removeCookie] = useCookies(["token"])
    const [isMoreOpen, setIsMoreOpen] = useState<boolean>(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const { id } = useParams();
    const [star, setStar] = useState(user?.star)
    const handleStar = (e: React.MouseEvent, id: string, item: DebterType) => {
    e.stopPropagation();
    const updateUser = async () => {
        try {
            await axios.patch(
                `${API}/debter/${id}`,
                { star: !item.star },
                { headers: { Authorization: `Bearer ${cookies.token}` } }
            ).then(() => setStar(!star));
        } catch (err) {
            console.error(err);
        }
    };
    updateUser();
};
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`${API}/debter/${id}`, {headers: {Authorization: `Bearer ${cookies.token}`}});
            setUser(res.data);
        };
        fetchUser();
    }, []);
    const navigate = useNavigate();

    const handleDelete = async () => {
        await axios.delete(`${API}/debter/${id}`, {headers: {Authorization: `Bearer ${cookies.token}`}}).then(() => {
            
            setDeleteModalOpen(false);
            setIsMoreOpen(false);
            navigate("/clients");
        });
    };
    if(!user) return null

    return (
        <div className="containers">
            <div className="flex mt-[34px] justify-between">
                <div className="flex gap-[12px] items-center justify-between ">
                    <button
                        onClick={() => navigate("/clients")}
                        className="p-0"
                    >
                        <ArrowLeft className="h-6 w-6" />
                    </button>

                    <h1 className="text-lg text-black font-semibold">
                        {user?.name}
                    </h1>
                    <div className="w-6"></div>
                </div>
                <div className="flex gap-[14px]">
                    <button onClick={(e) => handleStar(e, user.id, user)}>
                        {star ?  <StarIconFilled /> : <StarIconUnfilled/>}
                    </button>
                    <button onClick={() => setIsMoreOpen(!isMoreOpen)}>
                        <MoreIcon />
                    </button>
                </div>
            </div>

            <div>
                <div
                onClick={() => setIsMoreOpen(false)}
                    className={`pl-[16px] absolute  bg-white top-20 right-0 w-[172px] border-[1px] border-[#ECECEC]  rounded-[16px] shadow-xl ${
                        isMoreOpen ? "" : "hidden"
                    } `}
                >
                    <p onClick={() => navigate("edit")} className="border-b-[1px] p-2 border-[#ECECEC] ">
                        Tahrirlash
                    </p>
                    <p
                        onClick={() => {
                            setDeleteModalOpen(true);
                        }}
                        className="text-red-500 p-2"
                    >
                        O‘chirish
                    </p>
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
            </div>

            <div className="bg-[#BBD2FC] px-[16px] py-[18px] mt-[20px] rounded-[20px] ">
                <h3 className="text-[12px] font-medium ">Umumiy nasiya:</h3>
                <div className="flex gap-2">
                    <p className="font-extrabold text-[22px] ">
                        {Array.isArray(user?.debts)
                            ? FormatterPrice(
                                  user.debts.reduce(
                                      (sum, item) => sum + item.summaryAmount,
                                      0
                                  )
                              )?.space
                            : 0}
                    </p>
                    <p className="font-medium text-[22px] ">so'm</p>
                </div>
            </div>

            <div className="mt-[24px]">
                <h2 className="font-semibold text-[16px] ">Faol nasiyalar</h2>
                <div className="flex flex-col gap-[16px]">
                    {user?.debts &&
                    user.debts.filter(
                        (item: DebtType) => item.status === "NOT_PAID"
                    ).length > 0 ? (
                        user.debts
                            .filter(
                                (item: DebtType) => item.status === "NOT_PAID"
                            )
                            .map((item: DebtType) => (
                                <ClientsMoreCard item={item} key={item.id} />
                            ))
                    ) : (
                        <DontHaveCreditDiv />
                    )}
                </div>
                <button
                    onClick={() =>
                        navigate(
                            paths.creditscreate.replace(":id", String(user?.id))
                        )
                    }
                    className="pl-[15px] pr-[25px] fixed shadow-lg bottom-2 right-3 text-white font-medium text-[16px] rounded-[10px] py-[12px] bg-[#3478F7] "
                >
                    <PlusOutlined /> Qo'shish
                </button>
            </div>
        </div>
    );
};

export default ClientsMore;
