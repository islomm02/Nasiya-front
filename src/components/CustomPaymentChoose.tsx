import axios from "axios";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { API } from "../hooks/getEnv";
import type { DebtType } from "../@types";
import { useCookies } from "react-cookie";
import SuccessModal from "./SuccessModal";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../hooks/formDate";
import { FormatterPrice } from "../hooks/FormatterPrice";

interface OptionsType {
    month: number;
    date: string;
    amount: number;
}

const CustomPaymentChooseModal = ({
    isOpen,
    setIsOpen,
    itemId,
}: {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    itemId: string | undefined;
}) => {
    const [cookies, , removeCookie] = useCookies(["token", "refreshToken"]);
    const navigate = useNavigate();

    const [debt, setDebt] = useState<DebtType | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [options, setOptions] = useState<OptionsType[]>([]);
    const [selectedMonths, setSelectedMonths] = useState<number[]>([]); 

    useEffect(() => {
        if (!itemId) return;

        const fetchUser = async () => {
            try {
                const res = await axios.get(`${API}/debt/${itemId}`);
                setDebt(res.data);
            } catch (error) {
                console.error("Ma'lumot olishda xatolik:", error);
            }
        };

        fetchUser();
    }, [itemId]);

    useEffect(() => {
        if (!debt) return;

        const start = debt.term - debt.remainingMonths;
        const newOptions: OptionsType[] = Array.from(
            { length: debt.remainingMonths },
            (_, index) => ({
                month: start + index + 1,
                date: formatDate(debt.nextPaymentDay).dateOnly,
                amount: debt.monthlyPayment,
            })
        );

        setOptions(newOptions);
    }, [debt]);

    const totalAmount = selectedMonths.reduce((sum, month) => {
        const opt = options.find((o) => o.month === month);
        return sum + (opt?.amount || 0);
    }, 0);

    const toggleMonth = (month: number) => {
        setSelectedMonths((prev) =>
            prev.includes(month)
                ? prev.filter((m) => m !== month)
                : [...prev, month]
        );
    };

    const selectAll = () => {
        if (selectedMonths.length === options.length) {
            setSelectedMonths([]); // hammasini bekor qilish
        } else {
            setSelectedMonths(options.map((o) => o.month)); // hammasini tanlash
        }
    };

    async function handleSubmit() {
        if (!debt) return;

        setIsLoading(true);
        try {
            await axios.post(
                `${API}/pay-debt/amount`,
                {
                    debtId: debt.id,
                    amount: totalAmount,
                },
                { headers: { Authorization: `Bearer ${cookies.token}` } }
            );

            setIsLoading(false);
            setShowSuccess(true);
        } catch (err: any) {
            console.error(err);
            if (err.response?.status === 401) {
                try {
                    await axios.post(`${API}/auth/refresh`, {
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
        <div className="  fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <SuccessModal  />
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
                    <h2 className="text-lg font-semibold">To‘lov muddatini tanlang</h2>
                    <button onClick={() => setIsOpen(false)}>
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex items-center border-b border-[#ECECEC] py-5 justify-between">
                    <div>
                        <p className="text-[14px] mb-1">So‘ndirish:</p>
                        <h3 className="text-[16px] text-[#3478F7] font-bold">
                            {FormatterPrice(totalAmount)?.space} so'm
                        </h3>
                    </div>
                    <button
                        className="text-[14px] font-bold text-[#3478F7]"
                        onClick={selectAll}
                    >
                        Hammasini tanlash
                    </button>
                </div>

                {options.map((item) => (
                    <div
                        key={item.month}
                        className="flex items-center border-b border-[#ECECEC] py-5 justify-between"
                    >
                        <div>
                            <p className="text-[14px] mb-1">{item.month}-oy</p>
                            <h3 className="text-[16px] font-bold">{item.date}</h3>
                        </div>
                        <div className="flex gap-3 items-center">
                            <h2 className="text-[14px] font-bold">
                                {FormatterPrice(item.amount)?.space} so'm
                            </h2>
                            <input
                                type="checkbox"
                                checked={selectedMonths.includes(item.month)}
                                onChange={() => toggleMonth(item.month)}
                            />
                        </div>
                    </div>
                ))}

                <button
                    disabled={totalAmount === 0}
                    onClick={handleSubmit}
                    className={`${
                        totalAmount === 0 ? "bg-[#aac1e5]" : "bg-[#3478F7] hover:bg-[#2c6dd6]"
                    } mt-10 py-[13px] w-full text-[14px] font-medium text-white rounded-[10px] transition`}
                >
                    {isLoading ? "..." : "So‘ndirish"}
                </button>
            </div>
        </div>
    );
};

export default CustomPaymentChooseModal;
