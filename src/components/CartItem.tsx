import { Minus, Plus, Trash } from '@phosphor-icons/react';
import { ProductDTO } from '../dtos/ProductDTO';

type Product = ProductDTO & {
    amount: number;
}

type CartItemProps = {
    product: Product;
    subtotal: string;
    productIncrement: (product: Product) => void;
    productDecrement: (product: Product) => void;
}

export function CartItem({product, subtotal, productIncrement, productDecrement}: CartItemProps) {

    let  isRemoveItem = false;

    if(product.amount === 1) {
        isRemoveItem = true;
    }


    return(
        <div className='flex mt-2 p-2 w-full md:w-[90%]  border-b-2'>
            <div className='flex gap-2'>
                <img 
                    src={product.image}
                    alt="burger" 
                    className='w-32 h-24 rounded-md hover:scale-110 hover:-rotate-2 duration-300 bg-cover object-cover'
                />
            </div>

            <div className='ml-3 w-full'>
                <p >{product.name}</p>
              

                <div className='w-full flex items-end  justify-between mt-14'>
                    <div className='flex items-center'>
                        {
                            isRemoveItem ?
                                <button className='flex flex-row rounded' onClick={() => productDecrement(product)}>
                                    <Trash size={16} color="#000000" />
                                </button>
                            :
                                <button className='flex flex-row rounded' onClick={() => productDecrement(product)}>
                                    <Minus size={16} color="#000000"/>
                                </button>
                        }

                        <span className='mx-2 text-sm md:text-lg'>{product.amount}</span>  

                        <button className='flex flex-row rounded' onClick={() => productIncrement(product)}>
                            <Plus size={16} color="#000000"/>
                        </button>

                    </div>

                    <span className='text-sm md:text-lg'>R$ {subtotal}</span>
              
                </div>
            </div>
        </div>
    )
}