import axios from "axios";
import { ArrowLeft, ImageIcon, Pencil } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../hooks/getEnv";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast"

const CreateClient = () => {
  const navigate = useNavigate();
  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("");
  const [adress, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [images, setImages] = useState<(File | null)[]>([null, null]);
  const [previews, setPreviews] = useState<string[]>(["", ""]);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [cookies] = useCookies(["token"]);
  const [isLoading, setIsLoading] = useState(false);

  const isFormValid = clientName.trim() !== "" && phone.trim() !== "";

  const handleImageChange = (index: number, file: File | null) => {
    const newImages = [...images];
    const newPreviews = [...previews];
    newImages[index] = file;
    newPreviews[index] = file ? URL.createObjectURL(file) : "";
    setImages(newImages);
    setPreviews(newPreviews);
  };

  const handleSubmit = async () => {
    if (!isFormValid) return;
    setIsLoading(true);

    try {
      const debterRes = await axios.post(
        `${API}/debter`,
        { name: clientName, phone, adress },
        { headers: { Authorization: `Bearer ${cookies.token}` } }
      );
      const debterId = debterRes.data?.id;

      if (debterId) {
        for (let i = 0; i < images.length; i++) {
          if (images[i]) {
            const formDataImg = new FormData();
            formDataImg.append("file", images[i] as File);

            const uploadRes = await axios.post(`${API}/multer/upload`, formDataImg, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${cookies.token}`,
              },
            });

            

            const uploadedImageUrl = uploadRes.data?.url || "";

            if (uploadedImageUrl) {
              await axios.post(
                `${API}/images-client`,
                { debterId, image: uploadedImageUrl },
                { headers: { Authorization: `Bearer ${cookies.token}` } }
              )
            }else{
              toast.error("Rasm yuklashda xatolik")
            }
          }
        }
      }
      toast.success("Yaratildi")
      navigate(-1);
    } catch (error:any) {
      if (axios.isAxiosError(error)) {
    console.log("Server javobi:", error.response?.data);
    console.log("Status kodi:", error.response?.status);
  }
      const errMsg =
      error.response?.data?.message || error.message || "Xatolik yuz berdi!";
    toast.error(errMsg);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="containers">
      <div className="flex mt-[34px] items-center justify-between px-4 py-4">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-semibold">Mijoz yaratish</h1>
        <div className="w-6"></div>
      </div>

      <div className="mt-[24px]">
        <p className="text-[13px] font-semibold">Ismi *</p>
        <input
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          className="py-[14px] text-[13px] mt-2 px-[16px] rounded-[8px] w-full bg-[#F6F6F6] border border-[#ECECEC]"
          placeholder="Ismini kiriting"
          type="text"
        />
      </div>

      <div className="mt-[24px]">
        <p className="text-[13px]">Telefon raqami *</p>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="py-[14px] text-[13px] mt-2 px-[16px] rounded-[8px] w-full bg-[#F6F6F6] border border-[#ECECEC]"
          type="text"
          placeholder="Telefon raqami"
        />
      </div>

      <div className="mt-[24px]">
        <p className="text-[13px] font-semibold">Yashash Manzili</p>
        <input
          value={adress}
          onChange={(e) => setAddress(e.target.value)}
          className="py-[14px] text-[13px] mt-2 px-[16px] rounded-[8px] w-full bg-[#F6F6F6] border border-[#ECECEC]"
          placeholder="Manzilni kiriting"
          type="text"
        />
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
          {[0, 1].map((i) => (
            <label
              key={i}
              className="relative flex-1 flex flex-col items-center justify-center border border-[#ECECEC] rounded-[8px] bg-[#F6F6F6] h-[120px] cursor-pointer overflow-hidden"
            >
              {previews[i] ? (
                <>
                  <img
                    src={previews[i]}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-[8px]"
                  />
                  <div className="absolute top-2 right-2 bg-white p-1 rounded-full shadow cursor-pointer">
                    <Pencil className="w-4 h-4 text-gray-600" />
                  </div>
                </>
              ) : (
                <>
                  <ImageIcon className="w-6 h-6 text-gray-400" />
                  <span className="text-[14px] mt-2">Rasm qo‘shish</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageChange(i, e.target.files?.[0] || null)}
              />
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!isFormValid || isLoading}
        className={`px-[118px] mt-[32px] py-[13px] w-full rounded-[10px] text-[18px] font-medium transition ${
          isFormValid
            ? "bg-[#3478F7] hover:bg-[#2c6dd6] text-white"
            : "bg-[#dbe7ff] text-gray-400"
        }`}
      >
        {isLoading ? "Yuklanmoqda..." : "Saqlash"}
      </button>
    </div>
  );
};

export default CreateClient;
