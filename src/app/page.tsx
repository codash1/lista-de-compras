"use client"

import { Apple, Beef, Carrot, Dot, EllipsisVertical, Milk, Plus, Sandwich,  } from 'lucide-react'; 
import { useState } from 'react';
import { DropDown } from './components/DropDown';
import { Categoria } from '@/types/Categoria';
import { Item } from '@/types/Item';
import { space } from 'postcss/lib/list';

export default function Page() {
  // Estados separados para o foco de cada DropDown
  const [isQuantityFocused, setIsQuantityFocused] = useState(false); 
  const [isCategoryFocused, setIsCategoryFocused] = useState(false); 
  const [inputItem, setInputItem]=useState('')
  const [inputAmount,setInputAmount] =useState('')
  const [labelCategoria, setLabelCategoria] = useState<string | undefined>('Selecione a categoria');
  const [labelUn, setLabelUn] = useState<string | undefined>('UN.');

  const [list,setList]=useState<Item[]>([
    
  ])

  

  const categoria: Categoria[] = [
    { label: "Padaria", icon: <Sandwich color="#BB9F3A" size="18" /> },
    { label: "Legume", icon: <Carrot color="#8CAD51" size="18" /> },
    { label: "Carne", icon: <Beef color="#DB5BBF" size="18" /> },
    { label: "Fruta", icon: <Apple color="#E07B67" size="18" /> },
    { label: "Bebida", icon: <Milk color="#7B94CB" size="18" /> }
  ];

  const unidades = [
    {label:"Un"},
    {label:"L"},
    {label:"Kg"}
  ];

 const addItem =()=>{
setList([...list,{label:inputItem,
  amount:inputAmount,
  category:labelCategoria,
  units:labelUn,
  checked:false,
  }])


 }
  // Funções separadas para gerenciar o foco de cada DropDown
  const handleQuantityFocusChange = (isFocused: boolean) => {
    setIsQuantityFocused(isFocused); // Foco apenas para quantidade
  };

  const handleCategoryFocusChange = (isFocused: boolean) => {
    setIsCategoryFocused(isFocused); // Foco apenas para categoria
  };

  // Função para selecionar a categoria
  const selectCategory = (key: number) => {
    const categorySelected = categoria.find((item, index) => index === key)?.label;
    setLabelCategoria(categorySelected);

  };
  const selectUnits = (key: number) => {
 
    const unidadesSelected = unidades.find((item, index) => index === key)?.label;
    setLabelUn(unidadesSelected);
  };
  const deleteTodo=(key:number)=>{
   const newList = list.filter((item,index)=>(
    index !== key
 
   ))
   setList(newList)
  }
  return (
    <div className="h-screen w-full flex flex-col items-center bg-background">
      <img src="/assets/Cover.png" alt="imagens-com-frutas" className="w-full object-cover" />

      <div className="fixed w-full max-w-3xl h-full">
        <h1 className="mt-32 text-2xl">Lista de compras</h1>
        
        <div className="mt-8 flex gap-6 items-center">
          {/* Label do Item */}
          <label className="group">
            <span className="text-gray-400 text-sm mb-2 block">Item</span>
            <input
              type="text"
              className="w-60 h-10 px-2 bg-input rounded-md border border-white/30 outline-none focus:border-purple-300"
             value={inputItem}
             onChange={e=>setInputItem(e.target.value)}
            />
          </label>

          {/* Label da Quantidade */}
          <label className="group">
            <span className={`text-sm mb-2 block ${isQuantityFocused ? "text-purple-300" : "text-white/30"}`}>Quantidade</span>
            <div className="flex">
              <input
                type="number"
                className="w-24 h-10 px-2 bg-input rounded-l-md border border-white/30 outline-none focus:border-purple-300"
                value={inputAmount}
                onChange={e=>setInputAmount(e.target.value)}
              />
              {/* DropDown para "UN." */}
              <DropDown
                label={labelUn}
                onFocusChange={handleQuantityFocusChange} // Foco do DropDown de quantidade
                options={unidades}
                Category={selectUnits}
                type={2}
               
              />
            </div>
          </label>

          {/* Label da Categoria */}
          <label className="group">
            <span className={`text-sm mb-2 block ${isCategoryFocused ? "text-purple-300" : "text-white/30"}`}>Categoria</span>
            <DropDown
              label={labelCategoria}
              onFocusChange={handleCategoryFocusChange} // Foco do DropDown de categoria
              options={categoria}
              Category={selectCategory}
              type={1}
            />
          </label>

          {/* Botão de adicionar */}
          <div
          onClick={addItem} 
          className="h-10 w-10 rounded-full bg-purple-500 mt-6 cursor-pointer flex justify-center items-center">
            <Plus color="white" />
          </div>

        </div>
        <ul className='mt-10 flex flex-col gap-4'>
          {list.map((item,index) =>(
            <li 
            key={index}
            className='w-full bg-input p-4 rounded-md flex items-center justify-between'>
              <div className='flex items-center'>
              <input type="checkbox" value="" 
              className='w-5 h-5 mr-4'/>
               <div className='text-sm'>
                <div className='text-md capitalize font-extrabold'>{item.label}</div>
                <div>{item.units === "Un" &&
                      <span className='text-sm text-white/30'>{`${item.amount} unidades `}</span>
                    }
                    {item.units === "L" &&
                      <span  className='text-sm text-white/30'>{`${item.amount} Litros `}</span>
                    }
                    {item.units === "Kg" &&
                      <span  className='text-sm text-white/30'>{`${item.amount} Kilos `}</span>
                    }
                  </div>
              </div>
              </div>
             
            
             <div className='flex gap-4'>
  
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full  ${item.category === "Padaria" && "bg-[#211E12]"}
                              ${item.category === "Legume" && "bg-[#1C2015]"}
                               ${item.category === "Fruta" && "bg-[#261A17]"}
                                ${item.category === "Bebida" && "bg-[#1A1D23]"}
                                ${item.category === "Carne" && "bg-[#251622]"}
              `}>
               {categoria.find(cat => cat.label === item.category)?.icon}
               <span
               className={`${item.category === "Padaria" && "text-[#BB9F3A]"}
                      ${item.category === "Legume" && "text-[#8CAD51]"}
                      ${item.category === "Fruta" && "text-[#E07B67]"}
                       ${item.category === "Bebida" && "text-[#7B94CB]"}
                         ${item.category === "Carne" && "text-[#DB5BBF]"}
                   
               `}
               >{item.category}</span>
              </div>
              <button
               onClick={()=>deleteTodo(index)}
              >
                <EllipsisVertical color="#A881E6"/>
                </button>
             </div>
            </li>
          ))}
        </ul>
      </div>
     
    </div>
   
  );
}
