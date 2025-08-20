import { ArrowLeft, Edit2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import type { DebtType } from "../@types";
import { FormatterPrice } from "../hooks/FormatterPrice";
import { useEffect, useState, useRef } from "react";
import type { ChangeEvent } from "react";
import axios from "axios";
import { API } from "../hooks/getEnv";
import { useCookies } from "react-cookie";

const CreditEdit = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const { id } = useParams();
  const [debt, setDebt] = useState<DebtType | null>(null);
  const [formData, setFormData] = useState<any>({
    createdAt: "",
    term: "",
    summaryAmount: "",
    description: "",
  });
  const [debtImg, setDebtImg] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchDebt = async () => {
      try {
        const debtRes = await axios.get(`${API}/debt/${id}`);
        setDebt(debtRes.data);
        setFormData({createdAt:debt?.createdAt, summaryAmount:debt?.summaryAmount, term:debt?.term, description:debt?.description})

        setFormData({
          createdAt: new Date(debtRes.data.createdAt)
            .toISOString()
            .slice(0, 16),
          term: debtRes.data.term,
          summaryAmount: debtRes.data.summaryAmount,
          description: debtRes.data.description,
        });

        const imgRes = await axios.get(`${API}/images-debt?debtId=${id}`);
        setDebtImg(imgRes.data.image || []);
      } catch (err) {
        console.error("Xatolik:", err);
      }
    };
    fetchDebt();
  }, [id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleEditImage = (index: number) => {
    setEditingIndex(index);
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
  if (editingIndex === null) return;
  
  if (e.target.files && e.target.files.length > 0) {
    try {
      setLoading(true);

      const imgForm = new FormData();
      imgForm.append("file", e.target.files[0]);
      const res = await axios.post(`${API}/multer/upload`, imgForm, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      
      

      if (res.data?.url) {
        const newLink = res.data.url;
        const updatedImgs = [...debtImg];
        updatedImgs[editingIndex] = newLink;
        setDebtImg(updatedImgs);

        await axios.patch(
          `${API}/images-debt/${id}`,
          { image: updatedImgs }, 
          { headers: { Authorization: `Bearer ${cookies.token}` } }
        );
      }
    } catch (err) {
      console.error("Rasm yangilashda xatolik:", err);
    } finally {
      e.target.value = ""; 
      setEditingIndex(null);
      setLoading(false);
    }
  }
};


  const handleSave = async () => {
    try {
      setLoading(true);

      await axios.patch(
        `${API}/debt/${id}`,
        {

          summaryAmount: Number(formData.summaryAmount),
          term: Number(formData.term),
          createdAt: new Date(formData.createdAt).toISOString(),
          description: formData.description 
        },
        {
          headers: { Authorization: `Bearer ${cookies.token}` },
        }
      )

      navigate(`/clients/${debt?.debterId}`);
    } catch (err) {
      console.error("O‘zgartirishda xatolik:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!debt) return null;

  return (
    <div className="containers">
      <div className="flex mt-[34px] justify-between">
        <button
          onClick={() => navigate(`/clients/${debt.debterId}`)}
          className="p-0"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-lg text-black font-semibold pr-[105px] ">
          Qarzni tahrirlash
        </h1>
      </div>

      <div className="mt-[28px] space-y-6">
        <div>
          <p className="mb-2 font-semibold text-[13px]">Sana va vaqt</p>
          <input
            type="datetime-local"
            name="createdAt"
            value={formData.createdAt}
            onChange={handleChange}
            className="py-[13px] w-full px-[16px] bg-white border rounded-[8px] border-[#ECECEC]"
          />
        </div>

        <div>
          <p className="mb-2 font-semibold text-[13px]">Muddat (oy)</p>
          <input
            name="term"
            type="number"
            value={formData.term}
            onChange={handleChange}
            className="py-[13px] w-full px-[16px] bg-white border rounded-[8px] border-[#ECECEC]"
          />
        </div>

        <div>
          <p className="mb-2 font-semibold text-[13px]">Summa miqdori</p>
          <input
            name="summaryAmount"
            type="number"
            value={formData.summaryAmount}
            onChange={handleChange}
            className="py-[13px] w-full px-[16px] bg-white border rounded-[8px] border-[#ECECEC]"
          />
          <p className="text-sm text-gray-500 mt-1">
            Formatlangan:{" "}
            {FormatterPrice(Number(formData.summaryAmount))?.space}
          </p>
        </div>

        <div>
          <p className="mb-2 font-semibold text-[13px]">Eslatma</p>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="py-[13px] w-full h-[104px] px-[16px] bg-white border rounded-[8px] border-[#ECECEC]"
          />
        </div>

        <div>
          <p>Rasmlar</p>
          <div className="flex mt-[10px] gap-4 flex-wrap">
            {debtImg.map((img, i) => (
              <div key={i} className="relative group">
                <a target="__blank" href={`${API}/${img}`}>
                  <img
                    className="h-[112px] object-cover rounded-[16px]"
                    width={158}
                    height={112}
                    src={`${API}/${img}`}
                    alt="Debt"
                  />
                </a>
                <button
                  type="button"
                  onClick={() => handleEditImage(i)}
                  className="absolute top-2 right-2 bg-white/80 rounded-full p-1 shadow opacity-0 group-hover:opacity-100 transition"
                >
                  <Edit2 className="h-5 w-5 text-gray-700" />
                </button>
              </div>
            ))}
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => handleImageChange(e)}
            className="hidden"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="px-[118px] mt-10 py-[13px] bg-[#3478F7] w-full hover:bg-[#2c6dd6] text-[18px] font-medium text-white rounded-[10px] disabled:opacity-60"
        >
          {loading ? "Saqlanmoqda..." : "Saqlash"}
        </button>
      </div>
    </div>
  );
};

export default CreditEdit;
