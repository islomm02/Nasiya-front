import axios from "axios"
import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { API } from "../hooks/getEnv"
import { useCookies } from "react-cookie"
import toast from "react-hot-toast"
import { paths } from "../hooks/paths"

const ExampleEdit = () => {
    const {id} = useParams()
  const navigate = useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies(["token"])
  const [message, setMessage] = useState("")
  useEffect(() => {
    axios.get(`${API}/example-messages/${id}`, {headers: {Authorization: `Bearer ${cookies.token}`}}).then(res => setMessage(res.data.text))
  },[])

  const handleUpdate = () => {
    axios.patch(`${API}/example-messages/${id}`, {text: message}, {headers: {Authorization: `Bearer ${cookies.token}`}}).then(res => {toast.success("Tahrirlandi!"); navigate(paths.exampleMessages)})
  }
  return (
    <div className="containers">
      <div className="flex mt-[34px] border-b-[1px] border-[#ECECEC] items-center justify-between px-4 py-4">
                <button onClick={() => navigate("/examples")}>
                    <ArrowLeft className="h-6 w-6" />
                </button>
                <h1 className="text-lg font-semibold">Namuna tahrirlash</h1>
                <div className="w-6"></div>
            </div>

            <div>
              <h2 className=" mt-[40px] mb-[8px] text-[13px] font-semibold">Namuna</h2>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Matn yozish..." className="px-[16px] h-[104px] resize-none text-[13px] w-full py-[14px] bg-[#F6F6F6] border-[1px] border-[#ECECEC] rounded-[8px] " name="namuna" id=""></textarea>
            </div>

            <button
            disabled={message === ""}
                                onClick={() => handleUpdate()}
                                className={`${message ? "" : "bg-[#a8a2ff] hover:bg-[#a8a2ff] "} px-[118px] fixed bottom-2 mt-[32px] py-[13px] w-[92%] rounded-[10px] text-[18px] font-medium transition bg-[#3478F7] hover:bg-[#2c6dd6] text-white `}>
                                Tahrirlash
                            </button>
    </div>
  )
}

export default ExampleEdit