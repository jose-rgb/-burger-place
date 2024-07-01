import { ReactNode, createContext, useState } from "react";
import { ProductDTO } from "../dtos/ProductDTO";
import { toast } from "react-toastify";
import { api } from "../services/api";

type CartProviderProps = {
    children: ReactNode;
}

type Product = ProductDTO & {
    amount: number;
}

type UpdateProductQuantity = {
    productId: string;
    amount: number;
  }

export type CartContextData = {
    cart: Product[];
    cleanCart: () => void;
    addProduct: (productId: string) => Promise<void>;
    removeProduct: (productId: string) => void;
    updateProductQuantity: ({productId, amount}: UpdateProductQuantity) => void;
}

export const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps){
    const [cart, setCart] = useState<Product[]>([]);


    async function addProduct(productId: string) {
        try {
    
            const productAlreadyInCard = cart.find((product: { id: string; }) => product.id === productId);

            if(!productAlreadyInCard) {
                const {data:product} = await api.get<ProductDTO>(`products/${productId}`);
                setCart([...cart, {...product, amount: 1}]);
                toast.success('Item adicionado');
            }

            if(productAlreadyInCard) {
                const updateCart = cart.map(cartItem => cartItem.id === productId ? {
                    ...cartItem,
                    amount: Number(cartItem.amount) + 1
                } : cartItem);

                setCart(updateCart);
                toast.success('Item adicionado');
            }

        } catch (error) {
            toast.error('Erro na adição do item');
        }
    }


    async function removeProduct(productId: string){
        try {

            const productExists = cart.some(cartProduct => cartProduct.id === productId);

            if(!productExists) {
                toast.error('Erro na remoção do item');
                return;
            }

            const updatedCart = cart.filter(cartItem => cartItem.id !== productId);
            setCart(updatedCart);

        } catch  {
            toast.error('Erro na remoção do item');
        }
    }


    async function updateProductQuantity({productId, amount}: UpdateProductQuantity) {
        try {
            if(amount < 1) {
                removeProduct(productId);
                toast.error('Item removido');
                return;
            }

            const productExists = cart.some(cartProduct => cartProduct.id === productId);

            if(!productExists) {
                toast.error('Erro na alteração de quantidade do produto');
                return;
            }

            const updateCart = cart.map(cartItem => cartItem.id === productId ? {
                ...cartItem,
                amount: amount,
            }: cartItem)

            setCart(updateCart);

        } catch  {
            toast.error('Erro na alteração de quantidade do produto');
        }
    }

    async function cleanCart() {
        setCart([])
    }


    return(
        <CartContext.Provider value={{cart, addProduct, removeProduct, updateProductQuantity, cleanCart}}>
            {children}
        </CartContext.Provider>
    );
}