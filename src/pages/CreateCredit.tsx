import axios from "axios";
import { ArrowLeft, ImageIcon, Pencil } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../hooks/getEnv";
import type { TermType } from "../@types";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";

const CreateCredit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [cookies] = useCookies(["token"]);

    const [terms, setTerms] = useState<TermType[]>([]);
    const [productName, setProductName] = useState("");
    const [date, setDate] = useState("");
    const [useToday, setUseToday] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [term, setTerm] = useState("");
    const [note, setNote] = useState("");
    const [amount, setAmount] = useState("");
    const [image1, setImage1] = useState<string | null>(null);
    const [image2, setImage2] = useState<string | null>(null);

    const fileInput1 = useRef<HTMLInputElement | null>(null);
    const fileInput2 = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`${API}/terms`);
            const sorted = res.data.data.sort(
                (a: any, b: any) => Number(a.term) - Number(b.term)
            );
            setTerms(sorted);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (useToday) {
            const today = new Date().toISOString().split("T")[0];
            setDate(today);
        }
    }, [useToday]);

    const uploadToMulter = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        const res = await axios.post(`${API}/multer/upload`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return res.data?.url;
    };

    const handleImageChange = async (file: File | null, index: number) => {
        if (!file) return;

        try {
            const uploadedUrl = await uploadToMulter(file);

            if (index === 1) setImage1(`${uploadedUrl}`);
            if (index === 2) setImage2(`${uploadedUrl}`);
        } catch (err) {
            toast.error("Rasm yuklashda xatolik");
            console.error("Rasm yuklashda xatolik:", err);
        }
    };

    const handleSubmit = async () => {
        try {
            const createdAtValue = date
                ? new Date(date).toISOString()
                : new Date().toISOString();

            const debtPayload = {
                name: productName,
                term: Number(term),
                description: note,
                debterId: id,
                createdAt: createdAtValue,
                summaryAmount: Number(amount),
                remainingMonths: Number(term),
                remainingAmount: Number(amount),
                status: "NOT_PAID",
            };

            const debtRes = await axios.post(`${API}/debt`, debtPayload, {
                headers: { Authorization: `Bearer ${cookies.token}` },
            });

            const debtId = debtRes.data?.id;
            if (!debtId) throw new Error("Debt ID qaytmadi");

            const saveImage = async (url: string) => {
                await axios.post(
                    `${API}/images-debt`,
                    { debtId, image: url },
                    { headers: { Authorization: `Bearer ${cookies.token}` } }
                );
            };

            if (image1) await saveImage(image1);
            if (image2) await saveImage(image2);

            toast.success("Yaratildi!");
            navigate(`/clients/${id}`);
        } catch (error) {
            console.error(error);
        }
    };

    const isFormValid = productName && date && term && amount;

    return (
        <div className="containers">
            <div className="flex mt-[34px] items-center justify-between px-4 py-4">
                <button
                    onClick={() => navigate(`/clients/${id}`)}
                    className="p-0"
                >
                    <ArrowLeft className="h-6 w-6" />
                </button>
                <h1 className="text-lg font-semibold">Nasiya yaratish</h1>
                <div className="w-6"></div>
            </div>

            <div className="mt-[24px]">
                <p className="text-[13px] font-semibold">Mahsulot nomi *</p>
                <input
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="py-[14px] text-[13px] mt-2 px-[16px] rounded-[8px] w-full bg-[#F6F6F6] border border-[#ECECEC]"
                    placeholder="Ismini kiriting"
                    type="text"
                />
            </div>

            <div className="flex items-end justify-between mt-[24px]">
                <div className="w-[70%]">
                    <p className="text-[13px]">Sana</p>
                    <input
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="py-[14px] text-[13px] mt-2 px-[16px] rounded-[8px] w-full bg-[#F6F6F6] border border-[#ECECEC]"
                        type="date"
                    />
                </div>
                <label className="flex items-center gap-2">
                    <input
                        checked={useToday}
                        onChange={() => setUseToday(!useToday)}
                        className="w-5 h-5"
                        type="checkbox"
                    />
                    <span className="text-[14px] font-medium">Bugun</span>
                </label>
            </div>

            <div className="mt-[24px]">
                <p className="text-[13px] font-semibold">Summani kiriting</p>
                <input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="py-[14px] text-[13px] mt-2 px-[16px] rounded-[8px] w-full bg-[#F6F6F6] border border-[#ECECEC]"
                    placeholder="Summa kiriting"
                    type="number"
                />
            </div>

            <div className="mt-[24px]">
                <p className="text-[13px]">Muddat</p>
                <select
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    className="mt-2 py-[14px] px-[16px] rounded-[8px] w-full bg-[#F6F6F6] border border-[#ECECEC]"
                >
                    <option value="">Qarz muddatini tanlang</option>
                    {terms.map((item) => (
                        <option key={item.id} value={item.term}>
                            {item.term}
                        </option>
                    ))}
                </select>
            </div>

            <textarea
                value={note}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => setNote(e.target.value)}
                className={`mt-[24px] resize-none border pl-[14px] border-[#ECECEC] text-[14px] py-[12px] w-full rounded-[8px] bg-white ${
                    isFocused ? "shadow-2xl border-[#ECECEC]" : ""
                }`}
                placeholder="Izoh qo‘shish"
            />

            <div className="mt-[24px]">
                <p className="text-[13px]">Rasm biriktirish</p>
                <div className="flex gap-4 mt-2">
                    <div className="w-[48%] relative">
                        {image1 ? (
                            <div className="relative h-[120px]">
                                <img
                                    src={image1}
                                    alt="Rasm 1"
                                    className="w-full h-full object-cover rounded-[8px]"
                                />
                                <button
                                    type="button"
                                    onClick={() => fileInput1.current?.click()}
                                    className="absolute top-2 right-2 bg-white p-1 rounded-full shadow"
                                >
                                    <Pencil className="w-4 h-4 text-gray-700" />
                                </button>
                            </div>
                        ) : (
                            <label className="flex flex-col items-center justify-center border border-[#ECECEC] rounded-[8px] bg-[#F6F6F6] h-[120px] cursor-pointer">
                                <ImageIcon className="w-6 h-6 text-gray-400" />
                                <span className="text-[14px] mt-2">Rasm 1</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInput1}
                                    className="hidden"
                                    onChange={(e) =>
                                        handleImageChange(
                                            e.target.files?.[0] || null,
                                            1
                                        )
                                    }
                                />
                            </label>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInput1}
                            className="hidden"
                            onChange={(e) =>
                                handleImageChange(
                                    e.target.files?.[0] || null,
                                    1
                                )
                            }
                        />
                    </div>

                    <div className="w-[48%] relative">
                        {image2 ? (
                            <div className="relative h-[120px]">
                                <img
                                    src={image2}
                                    alt="Rasm 2"
                                    className="w-full h-full object-cover rounded-[8px]"
                                />
                                <button
                                    type="button"
                                    onClick={() => fileInput2.current?.click()}
                                    className="absolute top-2 right-2 bg-white p-1 rounded-full shadow"
                                >
                                    <Pencil className="w-4 h-4 text-gray-700" />
                                </button>
                            </div>
                        ) : (
                            <label className="flex flex-col items-center justify-center border border-[#ECECEC] rounded-[8px] bg-[#F6F6F6] h-[120px] cursor-pointer">
                                <ImageIcon className="w-6 h-6 text-gray-400" />
                                <span className="text-[14px] mt-2">Rasm 2</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInput2}
                                    className="hidden"
                                    onChange={(e) =>
                                        handleImageChange(
                                            e.target.files?.[0] || null,
                                            2
                                        )
                                    }
                                />
                            </label>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInput2}
                            className="hidden"
                            onChange={(e) =>
                                handleImageChange(
                                    e.target.files?.[0] || null,
                                    2
                                )
                            }
                        />
                    </div>
                </div>
            </div>

            <button
                onClick={handleSubmit}
                disabled={!isFormValid}
                className={`px-[118px] mt-[32px] py-[13px] w-full rounded-[10px] text-[18px] font-medium transition ${
                    isFormValid
                        ? "bg-[#3478F7] hover:bg-[#2c6dd6] text-white"
                        : "bg-[#dbe7ff] text-gray-400"
                }`}
            >
                Saqlash
            </button>
        </div>
    );
};

export default CreateCredit;
