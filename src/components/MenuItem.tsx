import { ShoppingCart } from '@phosphor-icons/react';
import { ProductDTO } from '../dtos/ProductDTO';


export function MenuItem({image, name, description, price}: ProductDTO) {
    return(
        <div className='flex gap-2'>
            <img 
                src={image}
                alt="burger" 
                className='w-28 h-28 rounded-md hover:scale-110 hover:-rotate-2 duration-300'
            />
            <div>
                <p>{name}</p>
                <p className='text-sm'>
                    {description}
                </p>

                <div className='flex items-center gap-2 justify-between mt-[10px] md:mt-1'>
                    <p className='font-bold text-lg'>R$ {price}</p>
                    <button className='bg-green-400 flex flex-row px-3 py-1 rounded'>
                        <ShoppingCart size={20} color="#ffffff" weight="fill" />
                    </button>
                </div>
            </div>
        </div>
    )
}