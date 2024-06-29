import { ShoppingCart } from "@phosphor-icons/react";

type CartProps = {
    handleOpenCartModal: () => void;
}

export function Cart({handleOpenCartModal}: CartProps) {
    return(
        <div className='hidden md:flex fixed top-10 right-12'>
            <button onClick={handleOpenCartModal} className='bg-[#FF3131] flex p-2 rounded-lg  group focus:outline-none'>
                <ShoppingCart size={23} color="#ffffff" weight="fill" />

                <span className="max-w-0 h-6 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear text-white">
                    <span className="pl-2"></span>
                    Ver carrinho
                </span>
            </button>
        </div>
    )
}