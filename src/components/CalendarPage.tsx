import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
// import { Button } from "@/components/ui/button"

export default function CalendarCom() {
  const daysOfWeek = ["DU", "SE", "CH", "PA", "JU", "SH", "YA"]
  
  const navigate = useNavigate()

  const calendarDates = [
    { date: 1, hasIndicator: true },
    { date: 2, hasIndicator: false },
    { date: 3, hasIndicator: false },
    { date: 4, hasIndicator: false },
    { date: 5, hasIndicator: false },
    { date: 6, hasIndicator: false },
    { date: 7, hasIndicator: false },
    { date: 8, hasIndicator: false },
    { date: 9, hasIndicator: false },
    { date: 10, hasIndicator: false },
    { date: 11, hasIndicator: false },
    { date: 12, hasIndicator: false },
    { date: 13, hasIndicator: false },
    { date: 14, hasIndicator: false },
    { date: 15, hasIndicator: true },
    { date: 16, hasIndicator: false },
    { date: 17, hasIndicator: false },
    { date: 18, hasIndicator: false },
    { date: 19, hasIndicator: false },
    { date: 20, hasIndicator: false },
    { date: 21, hasIndicator: false },
    { date: 22, hasIndicator: true },
    { date: 23, hasIndicator: false },
    { date: 24, hasIndicator: false },
    { date: 25, hasIndicator: false },
    { date: 26, hasIndicator: false },
    { date: 27, hasIndicator: false },
    { date: 28, hasIndicator: false },
    { date: 29, hasIndicator: true },
    { date: 30, hasIndicator: false },
    { date: 31, hasIndicator: false },
  ]

  return (
    <div className="max-w-sm mx-auto bg-white min-h-screen">
      {/* <div className="flex justify-between items-center px-4 py-2 text-sm font-medium">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
          </div>
          <div className="w-4 h-2 border border-black rounded-sm">
            <div className="w-full h-full bg-black rounded-sm"></div>
          </div>
        </div>
      </div> */}

      <div className="flex items-center justify-between px-4 py-4">
        <button onClick={() => navigate(-1)} className="p-0">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-semibold">Kalendar</h1>
        <div className="w-6"></div>
      </div>

      {/* Month navigation */}
      <div className="flex items-center justify-between px-4 py-2">
        <h2 className="text-xl font-semibold">Oktabr, 2024</h2>
        <div className="flex items-center gap-2">
          <button   className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="px-4 py-2 flex justify-between items-center ">
        <div className="text-sm text-gray-600">Oylik jami:</div>
        <div className="text-lg font-semibold">50 125 000 so'm</div>
      </div>

      <div className="px-4 py-4">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {calendarDates.map((item) => (
            <div key={item.date} className="relative">
              <div className={`
                text-center py-3 text-sm font-medium rounded-lg
                ${item.date === 1 ? 'bg-green-100 text-green-800' : 'text-gray-900'}
                hover:bg-gray-100 cursor-pointer
              `}>
                {item.date.toString().padStart(2, '0')}
              </div>
              {item.hasIndicator && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 py-4">
        <div className="text-sm font-medium mb-3">1 Oktabr kuni to'lov kutilmoqda</div>
        
        <div className="space-y-3">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="font-medium text-gray-900">Avazbek Jahongirov</div>
            <div className="text-sm text-gray-600">UZS 1 000 000</div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="font-medium text-gray-900">Otabek Sulaymonov</div>
            <div className="text-sm text-gray-600">UZS 1 000 000</div>
          </div>
        </div>
      </div>
    </div>
  )
}
