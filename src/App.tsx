import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import logoImg from './assets/hamb-1.png';
import { OpeningHours } from './components/OpeningHours';
import { MenuItem } from './components/MenuItem';
import { ShoppingCart } from '@phosphor-icons/react';
import { CartModal } from './components/CartModal';
import { Cart } from './components/Cart';

import { api } from './services/api';

import { ProductDTO } from './dtos/ProductDTO';
import { formatPrice } from './utils/formatPrice';


Modal.setAppElement('#root');

interface ProductFormatted extends ProductDTO {
  priceFormatted: string;
}

export function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isOpenStore, setIsOpenStore] = useState(false);
  const [burgers, setBurgers] = useState<ProductFormatted[]>([]);
  const [drinks, setDrinks] = useState<ProductFormatted[]>([]);


  async function getProducts() {
    const response = await api.get('/products');

    const productsFormated = response.data.map(function(product: ProductDTO) {
      return {...product, price: formatPrice(product.price)}
    })

    const burgers = productsFormated.filter((product: ProductDTO) => product.type === "burger");
    setBurgers(burgers)

    const drinks = productsFormated.filter((product: ProductDTO) => product.type === "drink");
    setDrinks(drinks)
  }


  function handleOpenCartModal() {
    setModalIsOpen(true);
  }


  function handleCloseCartModal() {
    setModalIsOpen(false);
  }


  function getIsOpenStore() {
    const date = new Date();
    const hours = date.getHours();
    const day = date.getDay();

    if(hours >= 18 && hours < 22) {
      setIsOpenStore(true);
    } else {
      setIsOpenStore(false);
    }

    if( day === 1 || day === 2  ) {
      setIsOpenStore(false);
    }
  }


  useEffect(()=> {
    getProducts();
    getIsOpenStore();
  },[])


  return (
    <>
      <header className='w-full h-[420px] bg-zinc-900 bg-home bg-cover bg-center'>
        <div className='w-full h-full flex flex-col justify-center items-center'>
          <img 
            src={logoImg} 
            alt='burger'
            className='w-32 h-32 rounded-full shadow-lg'
          />

          <h1 className='text-3xl mt-4 mb-2 font-bold text-white'>Dev burguer</h1>
          <span className='text-white font-medium'>rua dev 10, Centro, Teresina - PI</span>

          <OpeningHours isOpenStore={isOpenStore}/>
        </div>
      </header>

      <Cart handleOpenCartModal={handleOpenCartModal}/>
      
      <h2 className='text-2xl md:text-3xl font-bold text-center mt-9 mb-6'>Conheça nosso menu</h2>

      <div className='max-w-7xl mx-10 md:mx-40 mb-20'>
        <h2 className='mb-4 text-xl border-b-2'>hambúrgueres</h2>
        <main className='grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-12 mx-auto  mb-10'>
        
        {burgers.map(product => (     
          <MenuItem
            key={product.id}
            id={product.id}
            type={product.type}
            image={product.image}
            name={product.name}
            description={product.description}
            price={product.price}
          />
        ))}

        </main>
        <h2 className='mb-4 text-xl border-b-2'>bebidas</h2>
        <main className='grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-12 mx-auto  mb-10'>

        {drinks.map(product => (     
          <MenuItem 
            key={product.id}
            id={product.id}
            type={product.type}
            image={product.image}
            name={product.name}
            description={product.description}
            price={product.price}
          />
        ))}

        </main>
      </div>

      <CartModal isOpen={modalIsOpen} onRequestClose={handleCloseCartModal}/>

      <footer className='md:hidden  flex items-center justify-center w-full bg-red-500 py-3 fixed bottom-0 z-40'>
        <button onClick={handleOpenCartModal} className='flex items-center gap-2 text-white font-bold'>
          (<span>0</span>)
          Ver carrinho
          <ShoppingCart size={23} color="#ffffff" weight="fill" />
        </button>
      </footer>
    </>
  )
}
