import React from 'react';
import Button from "@/pages/Button/Button";
import styles from "@/pages/ResetButton/ResetButton.module.css";

// -----------------------------------------ERROR API


export default function Pruebas() {
    const [array, setArray] = React.useState<string[]>([]);

    let palabra1 = "A"
    let palabra2 = "B";
    let palabra3 = "C"

    function funcion1(palabra:string) {
        setArray([...array, palabra])
    }



    // funcion1()
    return (
        <>
            <button onClick={()=>{funcion1(palabra1)}}>Click aqui: {array}</button>
            <button onClick={()=>{funcion1(palabra2)}}>Click aqui: {array}</button>
            <button onClick={()=>{funcion1(palabra3)}}>Click aqui: {array}</button>
        </>
    )

}