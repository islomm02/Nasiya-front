import { ArrowLeft } from "lucide-react";
import { MoreIcon } from "../assets/icons";
import { useNavigate, useParams } from "react-router-dom";
import type { DebtType } from "../@types";
import { formatDate } from "../hooks/formDate";
import { FormatterPrice } from "../hooks/FormatterPrice";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../hooks/getEnv";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";

const CreditMore = () => {
    const navigate = useNavigate();
    const [cookies, __setCookie, __removeCookie] = useCookies(["token"])
    const { id } = useParams();
    const [debt, setDebt] = useState<DebtType>();
    const [debtImg, setDebtImg] = useState<string[]>([]);
    const [isMoreOpen, setIsMoreOpen] = useState<boolean>(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchDebt = async () => {
        try {
            const debtRes = await axios.get(`${API}/debt/${id}`);
            setDebt(debtRes.data);

            const imgRes = await axios.get(`${API}/images-debt?debtId=${id}`);
            console.log(imgRes);
            
            setDebtImg(imgRes.data.image || []); 
        } catch (err) {
            console.error("Xatolik:", err);
        }
    };
    fetchDebt();

        
    }, []);

    const handleDelete = async () => {
        await axios.delete(`${API}/debt/${id}`, {headers: {Authorization: `Bearer ${cookies.token}`}}).then((res) => {
            console.log(res);
            
            setDeleteModalOpen(false);
            setIsMoreOpen(false);
            toast.success("O'chirildi!")
            navigate(`/clients/${debt?.debterId}`);
        });
    };

    if (!debt) return null;

    return (
        <div className="containers">
            <div className="flex mt-[34px] justify-between">
                <button onClick={() => navigate(`/clients/${debt.debterId}`)} className="p-0">
                    <ArrowLeft className="h-6 w-6" />
                </button>
                <h1 className="text-lg text-black font-semibold">Batafsil</h1>
                <button onClick={() => setIsMoreOpen(!isMoreOpen)}>
                    <MoreIcon />
                </button>
            </div>

            <div
                onClick={() => setIsMoreOpen(false)}
                className={`absolute bg-white top-20 right-0 w-[172px] border border-[#ECECEC] rounded-[16px] shadow-xl ${isMoreOpen ? "" : "hidden"}`}
            >
                <p onClick={() => navigate("edit")} className="border-b p-2 border-[#ECECEC]">Tahrirlash</p>
                <p onClick={() => setDeleteModalOpen(true)} className="text-red-500 p-2">O‘chirish</p>
            </div>

            <div className={`fixed inset-0 flex items-center justify-center backdrop-blur-2xl transition-all duration-300 ${deleteModalOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                <div onClick={() => setDeleteModalOpen(false)} className={`fixed inset-0 flex items-center justify-center backdrop-blur-2xl transition-all duration-300 ${deleteModalOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                    <div onClick={(e) => e.stopPropagation()} className="bg-white border border-red-200 rounded-[20px] overflow-hidden shadow-lg">
                        <p className="p-4 font-medium text-[15px]">O'chirishni tasdiqlaysizmi?</p>
                        <div className="flex">
                            <button onClick={() => setDeleteModalOpen(false)} className="w-1/2 py-[10px] bg-[#d40000] hover:bg-red-600 text-white">Yo‘q</button>
                            <button onClick={handleDelete} className="w-1/2 py-[10px] bg-[#32d41c] hover:bg-[#35e01f] text-white">Ha</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-[28px]">
                <div className="flex justify-between">
                    <div>
                        <p className="mb-2 font-semibold text-[13px]">Sana</p>
                        <input disabled className="py-[13px] w-[242px] px-[16px] bg-[#F6F6F6] border rounded-[8px] border-[#ECECEC]" value={formatDate(debt.createdAt).dateOnly} type="text" />
                    </div>
                    <div>
                        <p className="mb-2 font-semibold text-[13px]">Sana</p>
                        <input disabled className="py-[13px] w-[89px] px-[16px] bg-[#F6F6F6] border rounded-[8px] border-[#ECECEC]" value={formatDate(debt.createdAt).timeOnly} type="text" />
                    </div>
                </div>
                <div className="mt-[24px]">
                    <p className="mb-2 font-semibold text-[13px]">Muddat</p>
                    <input disabled className="py-[13px] w-full px-[16px] bg-[#F6F6F6] border rounded-[8px] border-[#ECECEC]" value={`${debt.term} oy`} type="text" />
                </div>
                <div className="mt-[24px]">
                    <p className="mb-2 font-semibold text-[13px]">Summa miqdori</p>
                    <input disabled className="py-[13px] w-full px-[16px] bg-[#F6F6F6] border rounded-[8px] border-[#ECECEC]" value={`${FormatterPrice(debt.summaryAmount)?.space}`} type="text" />
                </div>
                <div className="mt-[24px]">
                    <p className="mb-2 font-semibold text-[13px]">Eslatma</p>
                    <textarea disabled className="py-[13px] w-full h-[104px] px-[16px] bg-[#F6F6F6] border rounded-[8px] border-[#ECECEC]" value={debt.description} />
                </div>
                <div>
                    <p>Rasm</p>
                    <div className="flex mt-[10px] justify-between ">
                        {debtImg[0] ? <a target="__blank" href={`${API}/${debtImg[0]}`}><img className=" h-[112px] object-cover rounded-[16px]" width={158} height={112} src={`${API}/${debtImg[0]}`} alt="" /></a> : null}
                        {debtImg[1] ? <a target="__blank" href={debtImg[1]}> <img className=" h-[112px] object-cover rounded-[16px]" width={158} height={112} src={`${debtImg[1]}`} alt="" /> </a> : null}
                    </div>
                </div>
                <button onClick={() => navigate(`/excition/${id}`)} className="px-[118px] mt-20 py-[13px] bg-[#3478F7] w-full hover:bg-[#2c6dd6] text-[18px] font-medium text-white rounded-[10px]">Sondirish</button>
            </div>
        </div>
    );
};

export default CreditMore;
