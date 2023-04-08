import React from 'react';
import {StatusContext} from "@/pages/StatusProvider/StatusProvider";
export interface IngredientInterface {
    id: string;
    text: string;
    quantity: string;

}
interface IngredientsContextType {
    plainIngredients:Function;
    foodIngredients:Array<IngredientInterface>;
    removeItem:Function;
    hardReset:Function;
    addIngredient:Function;
}
export const IngredientsContext = React.createContext<IngredientsContextType>({} as IngredientsContextType);

function IngredientsProvider({children}: { children: React.ReactNode }) {
    const {setStatus} = React.useContext(StatusContext)


    const [foodIngredients, setFoodIngredients] = React.useState<IngredientInterface[]>([])

    function plainIngredients() {
        let ingredientsList: string = '';
        foodIngredients.map((item: IngredientInterface) => {
            ingredientsList += `${item.quantity} ${item.text}, `
        })
        return ingredientsList;
    }
    function hardReset() {
        setStatus('idle')
        setFoodIngredients([])
    }
    function removeItem(id: string) {
        const nextFoodIngredients = foodIngredients.filter(item => {
            return item.id !== id
        })
        setFoodIngredients(nextFoodIngredients)
    }

    function addIngredient(ingredientName:string,ingredientQuantity:string) {
        let newIngredient = {id: crypto.randomUUID(), text: ingredientName, quantity: ingredientQuantity}
        setFoodIngredients([...foodIngredients, newIngredient])

    }
    return (
        <IngredientsContext.Provider value={{plainIngredients,foodIngredients,removeItem,hardReset,addIngredient}}>
            {children}
        </IngredientsContext.Provider>
    )
}

export default IngredientsProvider