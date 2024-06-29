import { CheckFat, X } from '@phosphor-icons/react';
import Modal from 'react-modal';
import { CartItem } from './CartItem';

type CartModalProps = {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function CartModal({isOpen, onRequestClose}: CartModalProps) {
    return(
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className='react-modal-content'
        >
            <div className='w-[653px] h-[555px] md:w-[753px] bg-[#F6F7F8] rounded-md p-2'>

                <header className='w-full flex flex-row justify-between columns-3 mb-2'>
                    <span></span>
                    <h2 className='text-xl md:text-2xl'>Meu carrinho</h2>
                    <button type="button" onClick={onRequestClose} className='rounded-lg p-1'>
                        <X size={24} color="#030101" weight="bold" />
                    </button>
                </header>

                <main className='flex flex-col items-center justify-center'>
                    <CartItem />
                    <CartItem />
                </main>

                <div className='w-full md:px-10 flex  items-center justify-between mt-3'>
                    <span className='font-bold text-lg'>total</span>
                    <span className='font-bold'>R$ 37.80</span>
                </div>

                <div className='w-full md:px-10 items-center mt-5'>
                    <span className='text-lg'>Endereço de entrega:</span>

                    <input
                        className='w-full p-1 rounded border-2 border-[#C1C1C1] focus:outline-none'
                        type="text"
                        placeholder='Digite seu endereço completo...'
                        name="address"
                    />
                </div>

                <div className='w-full  flex items-center justify-center mt-8 text-white'>

                   <button className='w-full md:w-[90%] p-2  flex items-center justify-center bg-[#54CC0A] rounded-lg'>
                        <h3 className='font-bold mr-2'>Finalizar pedido</h3>
                        <CheckFat size={32} weight="fill" />
                   </button>
                </div>
                
            </div>
        </Modal>
    )
}