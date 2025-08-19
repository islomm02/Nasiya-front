import axios from "axios";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { API } from "../hooks/getEnv";
import type { DebtType } from "../@types";
import { FormatterPrice } from "../hooks/FormatterPrice";
import { formatDate } from "../hooks/formDate";
import { useCookies } from "react-cookie";
import SuccessModal from "./SuccessModal";
import { useNavigate } from "react-router-dom";

const CustomPaymentModal = ({
    isOpen,
    setIsOpen,
    itemId,
}: {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    itemId: string | undefined;
}) => {
    const [cookies, setCookie, removeCookie] = useCookies(["token", "refreshToken"]);
    const navigate = useNavigate()
    const [debt, setDebt] = useState<DebtType | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showSuccess, setShowSuccess] = useState(false); 

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
                `${API}/pay-debt`,
                {
                    debtId: debt?.id,
                    month: 1,
                },
                { headers: { Authorization: `Bearer ${cookies.token}` } }
            );

            setIsLoading(false);
            setShowSuccess(true);
        } catch (err) {
            console.error(err);
            setIsLoading(false);
            // @ts-ignore
            if (error.response?.status === 401) {
        try {
          const res = await axios.post(`${API}/auth/refresh`, {
            refreshToken: cookies.refreshToken,
          });

          const newAccessToken = res.data.token;


        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
        }

        removeCookie("token");
        navigate("/login");
      }
        }
    }

    if (showSuccess) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <SuccessModal />
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
                    <h2 className="text-lg font-semibold">
                        1 oy uchun so‘ndirish
                    </h2>
                    <button onClick={() => setIsOpen(false)}>
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="bg-[#DDE9FE] p-[16px] rounded-[16px]">
                    <h2 className="text-[#3478F7] mb-1 text-[16px] font-bold">
                        {FormatterPrice(debt?.monthlyPayment)?.space} so'm
                    </h2>
                    <p>
                        {formatDate(debt?.nextPaymentDay).monthFull} oyi uchun
                        so‘ndiriladi
                    </p>
                </div>

                <button
                    onClick={handleSubmit}
                    className={`px-[96px] mt-[183px] py-[13px] bg-[#3478F7] w-full hover:bg-[#2c6dd6] text-[14px] font-medium text-white rounded-[10px] transition`}
                >
                    {isLoading ? "..." : "1 oylik uchun so‘ndirish"}
                </button>
            </div>
        </div>
    );
};

export default CustomPaymentModal;
