import axios from "axios";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { API } from "../hooks/getEnv";
import type { DebtType } from "../@types";
import { useCookies } from "react-cookie";
import SuccessModal from "./SuccessModal";
import { useNavigate } from "react-router-dom";

const CustomPaymentAllModal = ({
    isOpen,
    setIsOpen,
    itemId,
}: {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    itemId: string | undefined;
}) => {
    const [cookies, setCookie, removeCookie] = useCookies(["token", "refreshToken"]);
    const navigate = useNavigate();
    const [debt, setDebt] = useState<DebtType | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [amount, setAmount] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`${API}/debt/${itemId}`);
            setDebt(res.data);
        };
        if (itemId) fetchUser();
    }, [itemId]);

    async function handleSubmit() {
        setIsLoading(true);
        try {
            await axios.post(
                `${API}/pay-debt/amount`,
                {
                    debtId: debt?.id,
                    amount,
                },
                { headers: { Authorization: `Bearer ${cookies.token}` } }
            );

            setIsLoading(false);
            setShowSuccess(true);
        } catch (err: any) {
            console.error(err);
            if (err.response?.status === 401) {
                try {
                    const res = await axios.post(`${API}/auth/refresh`, {
                        refreshToken: cookies.refreshToken,
                    });
                    
                } catch (refreshError) {
                    console.error("Token refresh failed:", refreshError);
                }
                removeCookie("token");
                navigate("/login");
            }
            setIsLoading(false);
        }
    }

    if (showSuccess) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <SuccessModal   />
        </div>
    );
}

    if (!isOpen || !debt) return null;

    return (
        <div
            className="containers !p-0 fixed inset-0 z-50 flex items-end bg-black/30 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
        >
            <div
                className="w-full bg-white rounded-t-2xl p-4"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Har qanday miqdorda so‘ndirish</h2>
                    <button onClick={() => setIsOpen(false)}>
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div>
                    <h2>Miqdorni kiriting *</h2>
                    <input
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="py-[14px] text-[13px] mt-2 px-[16px] rounded-[8px] w-full bg-[#F6F6F6] border border-[#ECECEC]"
                        placeholder="To'lov miqdori"
                        type="text"
                    />
                </div>

                <button
                    disabled={!amount.trim()}
                    onClick={handleSubmit}
                    className={` ${!amount ? "bg-[#aac1e5]" : ""} px-[96px] mt-[183px] py-[13px] bg-[#3478F7] w-full hover:bg-[#2c6dd6] text-[14px] font-medium text-white rounded-[10px] transition`}
                >
                    {isLoading ? "..." : "So‘ndirish"}
                </button>
            </div>
        </div>
    );
};

export default CustomPaymentAllModal;
