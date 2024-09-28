"use client"

import { Apple, Beef, Carrot, Milk, Plus, Sandwich,  } from 'lucide-react'; 
import { useState } from 'react';
import { DropDown } from './components/DropDown';
import { Categoria } from '@/types/Categoria';

export default function Page() {
  // Estados separados para o foco de cada DropDown
  const [isQuantityFocused, setIsQuantityFocused] = useState(false); 
  const [isCategoryFocused, setIsCategoryFocused] = useState(false); 

  const [labelCategoria, setLabelCategoria] = useState<string | undefined>('Selecione a categoria');
  const [labelUn, setLabelUn] = useState<string | undefined>('UN.');

  const categoria: Categoria[] = [
    { label: "Padaria", icon: <Sandwich color="#BB9F3A" size="18" /> },
    { label: "Legumes", icon: <Carrot color="#8CAD51" size="18" /> },
    { label: "Carne", icon: <Beef color="#DB5BBF" size="18" /> },
    { label: "Fruta", icon: <Apple color="#E07B67" size="18" /> },
    { label: "Bebida", icon: <Milk color="#7B94CB" size="18" /> }
  ];

  const unidades = ["Un", "L", "Kg"];

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
  const selectCategory2 = (key: number) => {
 
    const unidadesSelected = unidades.find((item, index) => index === key);
    setLabelUn(unidadesSelected);
  };
  return (
    <div className="h-screen w-full flex flex-col items-center bg-background">
      <img src="/assets/Cover.png" alt="imagens-com-frutas" className="w-full object-cover" />
      <div className="fixed w-full max-w-3xl h-full">
        <h1 className="mt-20 text-2xl">Lista de compras</h1>

        <div className="mt-10 flex gap-4 items-center">
          {/* Label do Item */}
          <label className="group">
            <span className="text-gray-400 text-sm mb-2 block">Item</span>
            <input
              type="text"
              className="w-60 h-10 px-2 bg-input rounded-md border border-white/30 outline-none focus:border-purple-300"
            />
          </label>

          {/* Label da Quantidade */}
          <label className="group">
            <span className={`text-sm mb-2 block ${isQuantityFocused ? "text-purple-300" : "text-white/30"}`}>Quantidade</span>
            <div className="flex">
              <input
                type="number"
                className="w-24 h-10 px-2 bg-input rounded-l-md border border-white/30 outline-none focus:border-purple-300"
              />
              {/* DropDown para "UN." */}
              <DropDown
                label={labelUn}
                onFocusChange={handleQuantityFocusChange} // Foco do DropDown de quantidade
                options={unidades}
                Category={selectCategory2}
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
          <div className="h-10 w-10 rounded-full bg-purple-500 mt-6 cursor-pointer flex justify-center items-center">
            <Plus color="white" />
          </div>
        </div>
      </div>
    </div>
  );
}
