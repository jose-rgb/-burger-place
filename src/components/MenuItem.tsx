import burgerImg from '../assets/hamb-1.png';
import { ShoppingCart } from '@phosphor-icons/react';

export function MenuItem() {
    return(
        <div className='flex gap-2 p-2'>
            <img 
                src={burgerImg}
                alt="burger" 
                className='w-28 h-28 rounded-md hover:scale-110 hover:-rotate-2 duration-300'
            />
            <div>
                <p>Hamburguer smash</p>
                <p className='text-sm'>Cheese Burger Duplo
                Pão levinho de fermentação natural da Trigou, burger 160g, queijo prato e maionese da casa.
                </p>

                <div className='flex items-center gap-2 justify-between mt-3'>
                    <p className='font-bold text-lg'>R$ 18.90</p>
                    <button className='bg-green-400 flex flex-row px-3 py-1 rounded'>
                        <ShoppingCart size={20} color="#ffffff" weight="fill" />
                    </button>
                </div>
            </div>
        </div>
    )
}