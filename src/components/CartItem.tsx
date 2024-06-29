import { Minus, Plus } from '@phosphor-icons/react';
import burgerImg from '../assets/hamb-1.png';

export function CartItem() {
    return(
        <div className='flex mt-2 p-2 w-full md:w-[90%]  border-b-2'>
            <div className='flex gap-2'>
                <img 
                    src={burgerImg}
                    alt="burger" 
                    className='w-28 h-28 rounded-md hover:scale-110 hover:-rotate-2 duration-300'
                />
            </div>

            <div className='ml-3 w-full'>
                <p >Hamburguer smash</p>
              

                <div className='w-full flex items-end  justify-between mt-14'>
                    <div className='flex items-center'>
                        <button className='flex flex-row rounded'>
                            <Minus size={18} color="#000000"/>
                        </button>

                        <span className='mx-2 text-lg'>1</span>  

                        <button className='flex flex-row rounded'>
                            <Plus size={18} color="#000000"/>
                        </button>

                    </div>

                    <span className='text-lg'>R$ 18.90</span>
              
                </div>
            </div>
        </div>
    )
}