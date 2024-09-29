import { Categoria } from "@/types/Categoria"
import { ChevronDown } from "lucide-react"
import { IconDescriptor } from "next/dist/lib/metadata/types/metadata-types"
import { useState } from "react"



type Props ={
    label:string | undefined
    options:Categoria[]
    onFocusChange : (isFocused:boolean)=>void
    type?:number;
    Category:(key:number)=>void
    Units:(key:number)=>void
}





export const DropDown = ({label,options,onFocusChange,Category, type,Units}:Props)=>{
const [isOpen, setIsOpen] = useState(false)
const [opSelected,setOpSelected]=useState(4)

const toggleDropDawn=()=>{
  
        setIsOpen(!isOpen)
        onFocusChange(!isOpen)
  
    
}
const hadleCategory=(key:number)=>{
   
    if(key !==null){
        setIsOpen(false)  
        Category(key)
    }
}

return(
    
      <div className="relative">
    <div 
    onClick={toggleDropDawn}
    className={`bg-input ${type === 1 ?"w-60  rounded-md":"w-16 rounded-r-md "} border h-10 px-2 text-sm text-white/30 flex justify-between items-center  cursor-pointer  ${isOpen ? "border-purple-300" : "border-white/30"}`} >
        <span>{label}</span><ChevronDown color="gray" size="15" />
    </div>
    {isOpen && (
     <div className={`${type === 1 ?"w-60 ":"w-16 rounded-r-md"} bg-input absolute  top-12 rounded-md`}>
      {options.map((item,key)=>(
       <div
       onClick={()=>hadleCategory(key)}
       key={key}
       className={`${key === options.length -1 ? "":"border-b border-white/20"} p-2 cursor-pointer text-sm text-gray-300 tracking-wide`}
       >{
        type === 1 &&(
             <div className="flex gap-2 items-center">
          {item.icon}{item.label}
        </div>
        )
        

       }
        
        {
            type === 2 &&(
                <div className="flex gap-2 items-center">
               {item.label}
           </div>
           )
           
        }
        </div>
      ))}
     </div>
    )}
    </div>

   
)
}
