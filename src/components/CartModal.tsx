import { useState } from 'react';
import { CheckFat, X } from '@phosphor-icons/react';
import Modal from 'react-modal';
import { CartItem } from './CartItem';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import { ProductDTO } from '../dtos/ProductDTO';
import emptyCartImg from '../assets/empty-cart.png';
import { toast } from 'react-toastify';

type CartModalProps = {
    isOpen: boolean;
    onRequestClose: () => void;
}

type Product = ProductDTO & {
    amount: number;
}

export function CartModal({isOpen, onRequestClose}: CartModalProps) {
    const { cart, cleanCart, updateProductQuantity } = useCart();
    const [address, setAddress] = useState("");
    let emptyCart = true;

    if(cart.length > 0) {
        emptyCart = false;
    }

    const cartFormatted = cart.map(product => ({
        ...product, priceFormatted: formatPrice(product.price), subtotal: formatPrice(product.price * product.amount)
    }))

    const total = formatPrice(
        cart.reduce((sumTotal, product) =>{
            sumTotal += product.price * product.amount

            return sumTotal;
        }, 0)
    )


    function handleProductIncrement(product: Product) {
        const IncrementArguments = {
          productId: product.id,
          amount: product.amount + 1
        };
    
        updateProductQuantity(IncrementArguments);
    }


    function handleProductDecrement(product: Product) {
        const DecrementArguments = {
          productId: product.id,
          amount: product.amount -1
        };
    
        updateProductQuantity(DecrementArguments);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleChangeAddress(event: any) {
        const value = event.target.value
        setAddress(value)
    }


    function sendOrder() {

        const cartItems = cartFormatted.map((item) => {
            return (
                ` ${item.amount} ${item.name}: ${item.subtotal} |`
            )
        }).join("")

        const order = encodeURIComponent(cartItems);
        const storePhone = "86994568903";

        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        if(address === "") {

            const input = document.getElementById('address');
            input?.classList.add('border-red-400');
            input?.classList.add('placeholder:text-red-400');

            toast.error("digite o endereço!")
        } else {

            window.open(`https://wa.me/${storePhone}?text=Pedido feito as ${hours}:${minutes} = ${order} | Endereço: ${address} | total: ${total}`, "_blank");

            cleanCart();
        }
    }


    return(
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className='react-modal-content'
        >
            <div className='w-[653px] max-h-[600px]  md:max-h-[600px]  md:w-[753px] bg-[#F6F7F8] rounded-md p-2'>

                <header className='w-full flex flex-row justify-between columns-3 mb-2 mt-2'>
                    <div></div>
                    <h2 className='text-xl ml-10 md:text-2xl'>Meu carrinho</h2>
                    <button type="button" onClick={onRequestClose} className='rounded-lg p-1'>
                        <X size={24} color="#030101" weight="bold" />
                    </button>
                </header>
                
                {
                    emptyCart ?
                        <div className='flex w-full items-center justify-center h-[200px]'>
                            <img src={emptyCartImg} alt="carrinho vazio" className='w-[70px]'/>
                        </div>
                       :
                        <div>

                            <main className='flex flex-col items-center max-h-[300px] md:max-h-[200px] overflow-auto'>

                  
                                {cartFormatted.map(product => (
                                    <CartItem
                                        key={product.id}
                                        product={product}
                                        subtotal={product.subtotal}
                                        productIncrement={handleProductIncrement}
                                        productDecrement={handleProductDecrement}
                                    />
                                ))} 

                            </main>

                            <div className='w-full md:px-10 flex  items-center justify-between mt-3'>
                                <span className='font-bold text-lg'>total</span>
                                <span className='font-bold'>R$ {total}</span>
                            </div>

                            <div className='w-full md:px-10 items-center mt-5'>
                                <span className='text-base w-full flex items-center'>Endereço de entrega:</span>

                                <input
                                    className='w-full p-1 rounded border-2 border-[#C1C1C1] focus:outline-none'
                                    type="text"
                                    placeholder='Digite seu endereço completo...'
                                    name="address"
                                    id='address'
                                    onChange={handleChangeAddress}
                                    value={address}
                                />
                            </div>

                            <div className='w-full  flex items-center justify-center mt-8 text-white'>

                                <button onClick={() => sendOrder()} className='w-full md:w-[90%] p-2  flex items-center justify-center bg-[#54CC0A] rounded-lg'>
                                    <h3 className='font-bold mr-2'>Finalizar pedido</h3>
                                    <CheckFat size={32} weight="fill" />
                                </button>
                            </div>

                        </div>
                }

            </div>
        </Modal>
    )
}