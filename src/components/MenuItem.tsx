import { ShoppingCart } from '@phosphor-icons/react';
import { ProductDTO } from '../dtos/ProductDTO';
import { toast } from 'react-toastify';

type MenuItemProps = ProductDTO & {
    buttonAddProduct: boolean;
    addProductCart: (id: string) => void;
}

export function MenuItem({id, image, name, description, price, buttonAddProduct, addProductCart}: MenuItemProps) {
    function storeClosedMessage() {
        toast.error('Loja fechada!', { autoClose: 2000});
    }

    return(
        <div className='flex gap-2'>
            <img 
                src={image}
                alt="burger" 
                className='w-28 h-28 rounded-md hover:scale-110 hover:-rotate-2 duration-300 bg-cover'
            />
            <div>
                <p>{name}</p>
                <p className='text-sm'>
                    {description}
                </p>

                <div className='flex items-center gap-2 justify-between mt-[10px] md:mt-1'>
                    <p className='font-bold text-lg'>{price}</p>
                    {
                        buttonAddProduct ?
                            <button className='bg-green-400 flex flex-row px-3 py-1 rounded' onClick={() => addProductCart(id)}>
                                <ShoppingCart size={20} color="#ffffff" weight="fill" />
                            </button>
                        :
                            <button className='bg-red-400 flex flex-row px-3 py-1 rounded' onClick={() => storeClosedMessage()}>
                                <ShoppingCart size={20} color="#ffffff" weight="fill" />
                            </button>
                    }
                </div>
            </div>
        </div>
    )
}