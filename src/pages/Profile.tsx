import { ArrowLeft } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import type { SellerType } from "../@types"
import axios from "axios"
import { API } from "../hooks/getEnv"
import { useCookies } from "react-cookie"
import { EditPicIcon } from "../assets/icons"
import Text from "../components/Text"
import { useNavigate } from "react-router-dom"

const Profile = () => {
  const [me, setMe] = useState<SellerType | null>(null)
  const [cookies] = useCookies(["token"])
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    const res = await axios.get(`${API}/auth/me`, {
      headers: { Authorization: `Bearer ${cookies.token}` },
    })
    setMe(res.data)
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    const file = e.target.files[0]

    const formData = new FormData()
    formData.append("image", file)

    try {
       await axios.post(`${API}/multer/upload`, formData, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      fetchProfile()
    } catch (err) {
      console.error("Image update error:", err)
    }
  }

  return (
    <div className="containers">
      <div className="flex py-[11px] mb-[18px]  gap-[70px] mt-[31px] ">
        <button onClick={() => navigate("/settings")}><ArrowLeft/></button>
        <h2 className="text-[18px] font-semibold ">Shaxsiy ma’lumotlar</h2>
      </div>
      <div className="flex justify-center items-center relative">
        <img
          className="rounded-full w-[96px] h-[96px] object-cover"
          src={`${API}/${me?.image}`}
          alt="Profile"
        />
        <button
          className="absolute bottom-0 right-[calc(50%-48px)] bg-white rounded-full p-1 shadow"
          onClick={() => fileInputRef.current?.click()}
        >
          <EditPicIcon/>
        </button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      <div>
        <Text extraClass="!text-[13px] !mb-2 !font-semibold " >Ismi familiya</Text>
        <h2 className="p-[15px] text-[13px] bg-[#F6F6F6] border-[1px] border-[#ECECEC] rounded-[8px] ">
          {me?.name}
        </h2>
      </div>
      <div>
        <Text extraClass="!text-[13px] !mt-[32px] !mb-2 !font-semibold " >Telefon raqam</Text>
        <h2 className="p-[15px] text-[13px] bg-[#F6F6F6] border-[1px] border-[#ECECEC] rounded-[8px] ">
          {me?.phone}
        </h2>
      </div>
      <div>
        <Text extraClass="!text-[13px] !mt-[32px] !mb-2 !font-semibold "  >Elektron pochta</Text>
        <h2 className="p-[15px] text-[13px] bg-[#F6F6F6] border-[1px] border-[#ECECEC] rounded-[8px] ">
          {me?.email}
        </h2>
      </div>
    </div>
  )
}

export default Profile
