import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { API } from "../hooks/getEnv";
import axios from "axios";
import type { UserType } from "../@types";
import { FormatterPrice } from "../hooks/FormatterPrice";
import { ClickIcon, PaymeIcon } from "../assets/icons";
import SuccessModal from "../components/SuccessModal";

const PayBalance = () => {
    const navigate = useNavigate();
    const [cookies, __setCookie, __removeCookie] = useCookies(["token"]);
    const [user, setUser] = useState<UserType | null>(null);
    const [amount, setAmount] = useState<number>(0);
    const [selected, setSelected] = useState<"p" | "c" | null>(null);
    const [isSuccessOpen, setIsSuccessOpen] = useState<boolean>(false)

    const handlePay = () => {
        const updateBalance = async () => {
            await axios.patch(`${API}/sellers/${user?.id}`, {balance: user?.balance ? user.balance + amount : amount}, {headers: {Authorization: `Bearer ${cookies.token}`}}).then(() => {setIsSuccessOpen(true); })
        }
        updateBalance()
    }


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`${API}/auth/me`, {
                    headers: { Authorization: `Bearer ${cookies.token}` },
                });
                setUser(res.data);
            } catch (error) {
                console.error("Xatolik:", error);
            }
        };

        if (cookies.token) {
            fetchUser();
        }
    }, [cookies.token]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const rawValue = e.target.value.replace(/\D/g, "");
  setAmount(Number(rawValue));
};

    if(isSuccessOpen) return <SuccessModal to="/" action={"to'landi"} />

    return (
        <>
        <div className="containers">
            <div className="flex mt-[34px] items-center justify-between px-4 py-4">
                <button onClick={() => navigate("/")} className="p-0">
                    <ArrowLeft className="h-6 w-6" />
                </button>
                <h1 className="text-lg font-semibold">Shaxsiy hisob</h1>
                <div className="w-6"></div>
            </div>

            <div className="flex border-b-[1px] border-[#EDEDED] pb-[28px]  mt-[28px] items-center justify-center gap-2">
                <h2 className="font-bol text-[28px] ">{user?.balance}.00</h2>
                <p className="font-medium text-[14px]  ">so'm</p>
            </div>

            <div className="mt-[24px]  ">
                <h2 className="font-semibold text-[13px] mb-[8px] ">
                    To‘lov miqdori
                </h2>
                <input
                    onChange={handleChange}
                    className="w-full mb-4 py-[14px] pl-[16px] rounded-[8px] border-[1px] border-[#EDEDED]  "
                    value={FormatterPrice(amount)?.space}
                    placeholder="Miqdorni kiriting"
                    type="text"
                />
                <div className="flex justify-around">
                    <button
                        onClick={() => setAmount(20000)}
                        className="py-2 px-4 font-semibold text-[13px] border-[1px] border-[#EDEDED] rounded-[30px] "
                    >
                        20 000 so‘m
                    </button>
                    <button
                        onClick={() => setAmount(40000)}
                        className="py-2 px-4 font-semibold text-[13px] border-[1px] border-[#EDEDED] rounded-[30px] "
                    >
                        40 000 so‘m
                    </button>
                    <button
                        onClick={() => setAmount(60000)}
                        className="py-2 px-4 font-semibold text-[13px] border-[1px] border-[#EDEDED] rounded-[30px] "
                    >
                        60 000 so‘m
                    </button>
                </div>
            </div>

            <div className="flex flex-col ju">
                <h2 className="mb-[12px] mt-[48px] ">
                    Sizga qaysi biri qulay?
                </h2>
                <div className="flex justify-between">
                    <div
                        onClick={() => setSelected("p")}
                        className={`${
                            selected == "p"
                                ? "bg-white border-[1px] border-[#3478F7]"
                                : "bg-[#F5F5F5]"
                        } flex justify-between p-[16px] rounded-[8px] w-[173px] h-[82px] `}
                    >
                        <p
                            className={`text-[14px] ${
                                selected == "p"
                                    ? "text-[#3478F7] "
                                    : "text-black"
                            } font-medium `}
                        >
                            Payme
                        </p>
                        <PaymeIcon />
                    </div>
                    <div
                        onClick={() => setSelected("c")}
                        className={`${
                            selected == "c"
                                ? "bg-white border-[1px] border-[#3478F7]"
                                : "bg-[#F5F5F5]"
                        } flex justify-between p-[16px] rounded-[8px] w-[173px] h-[82px] `}
                    >
                        <p
                            className={`text-[14px] ${
                                selected == "c"
                                    ? "text-[#3478F7] "
                                    : "text-black"
                            } font-medium `}
                        >
                            Click
                        </p>
                        <ClickIcon />
                    </div>
                </div>
                <button
                    onClick={() => handlePay()}
                    disabled={amount == 0 || selected == null}
                    className={`px-[118px] mt-20 py-[13px] ${
                        amount == 0 || selected == null
                            ? "bg-[#DDE9FE] cursor-not-allowed"
                            : "bg-[#3478F7] hover:bg-[#2c6dd6]"
                    } text-[18px] font-medium text-white rounded-[10px] transition`}
                >
                    Davom etish
                </button>
            </div>
        </div>
        </>
    );
};

export default PayBalance;
