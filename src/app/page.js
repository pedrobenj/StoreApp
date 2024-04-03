"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import cartImage from "../assets/cartImage.png"
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function Home() {
 const [products, setProducts] = useState([])
 const [cart, setCart] = useState([])
 const [modal, setModal] = useState(false)
 const [classe, setClasse] = useState("hidden")



 useEffect(() => {
  if (modal) {
    setClasse("")
  }else {
    setClasse("hidden")
  }
 }, [modal])
  

 function abrirModal() {
    setModal(!modal)
 }

 
 function fecharModal() {
  setModal(!modal)
 }
 
 function addTocart(product) {
   setCart([...cart, product])
   
   window.localStorage.setItem("cart", JSON.stringify([...cart, product]))
 }

 useEffect(() => {
  const dados = window.localStorage.getItem("cart")

  if (dados) {
    const dadosConvertidos = JSON.parse(dados)

    setCart(dadosConvertidos)
  }


  getDados()
 },[])



 async function getDados(){
  const data = await fetch("https://fakestoreapi.com/products")
  const prod = await data.json()

  setProducts(prod)
 }

  return (
    <>
      <main className="flex min-h-screen max-w-screen flex-wrap gap-6 items-center justify-center p-24 relative">
        <div className="min-w-full flex justify-end px-6">
          <div  onClick={abrirModal} className="cursor-pointer relative">
            <Image src={cartImage} width={35} height={35} alt="cart"/>
            <p className="absolute bottom-1 flex justify-center items-center bg-red-500 rounded-full text-[18px] w-[20px] h-[20px] text-white font-bold">{cart.length}</p>
          </div>
        </div>
        {products.map((p) => {
          return (
          <div key={p.id} className=" rounded-md border-2 border-black p-6 flex justify-center flex-col items-center gap-4 max-w-48 min-h-[400px]">
            <Image className="max-h-20 object-contain" src={p.image} width={100} height={100} alt={p.title} priority />
            <div className="text-center">
              {p.title.slice(0,15)}...
            </div>
            <div className="text-xl font-bold">
              R$ {p.price}
            </div>
            <div className="flex-grow"></div>
            <button className="hover:bg-blue-700 transition-all rounded-md border-2 bg-blue-400 p-2 min-w-full">COMPRAR</button>
            <button onClick={() => {
              addTocart(p)
            }} className="hover:bg-green-700 transition-all rounded-md border-2 bg-green-400 p-2 min-w-full">ADICIONAR AO CARRINHO</button>
          </div>)
        })}
        
           <div className={`rounded-md border-2 border-black p-52 absolute top-48 bg-slate-700 text-white ${classe}`}>
              <div className="flex flex-col ">
              <IoIosCloseCircleOutline onClick={() =>{
                fecharModal()
              }} className="size-10 cursor-pointer" />
                <p>Carrinho:</p>
                {cart.map((p) => {
                  console.log(p)
                  return (
                    <>
                      <Image className="max-h-20 object-contain" src={p.image} width={50} height={50} alt={p.title} priority />
                      <div key={p.title}>
                          <div className="">
                            {p.title}
                          </div>
                          <div className="text-xl font-bold">
                            R$ {p.price}
                          </div>
                          
                      </div>
                    </>
                  )
                })}
                <button className="rounded-md border-none p-3 bg-red-500">Comprar</button>
              </div>
          </div>
      </main>
      
    </>
  );
}
