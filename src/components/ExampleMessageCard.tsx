// "use client"

// import { useState } from "react"
// import { Switch } from "@/components/ui/switch"
// import { Button } from "@/components/ui/button"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { MoreVertical, Copy, Edit, Trash2 } from "lucide-react"

// interface Message {
//   id: string
//   text: string
//   status: boolean
//   sellerId: string
// }

// interface MessageCardProps {
//   message: Message
// }

// export function MessageCard({ message }: MessageCardProps) {
//   const [status, setStatus] = useState(message.status)

//   // Extract phone numbers from text and make them clickable
//   const formatTextWithPhoneLinks = (text: string) => {
//     const phoneRegex = /(\+998\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2})/g
//     const parts = text.split(phoneRegex)

//     return parts.map((part, index) => {
//       if (phoneRegex.test(part)) {
//         return (
//           <a
//             key={index}
//             href={`tel:${part.replace(/\s/g, "")}`}
//             className="underline text-blue-600 hover:text-blue-800"
//           >
//             {part}
//           </a>
//         )
//       }
//       return part
//     })
//   }

//   const handleStatusChange = (newStatus: boolean) => {
//     setStatus(newStatus)
//     // Here you would typically call an API to update the status
//     console.log(`Message ${message.id} status changed to:`, newStatus)
//   }

//   const handleMenuAction = (action: string) => {
//     console.log(`${action} action for message:`, message.id)
//     // Implement your menu actions here
//   }

//   return (
//     <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
//       {/* Header with toggle and menu */}
//       <div className="flex items-center justify-between mb-4">
//         <Switch checked={status} onCheckedChange={handleStatusChange} className="data-[state=checked]:bg-purple-600" />

//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
//               <MoreVertical className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuItem onClick={() => handleMenuAction("copy")}>
//               <Copy className="mr-2 h-4 w-4" />
//               Copy
//             </DropdownMenuItem>
//             <DropdownMenuItem onClick={() => handleMenuAction("edit")}>
//               <Edit className="mr-2 h-4 w-4" />
//               Edit
//             </DropdownMenuItem>
//             <DropdownMenuItem onClick={() => handleMenuAction("delete")} className="text-red-600">
//               <Trash2 className="mr-2 h-4 w-4" />
//               Delete
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>

//       <div className="text-gray-800 leading-relaxed">{formatTextWithPhoneLinks(message.text)}</div>

//       <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
//         <span>ID: {message.id}</span>
//         <span
//           className={`px-2 py-1 rounded-full text-xs ${
//             status ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
//           }`}
//         >
//           {status ? "Active" : "Inactive"}
//         </span>
//       </div>
//     </div>
//   )
// }
