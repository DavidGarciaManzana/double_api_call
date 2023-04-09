import React from 'react';
import {isNode} from "detect-node-es";


function useValidation(currentIp:string) {


    function incrementTries(){
        const ip = localStorage.getItem('ipAddress')
        const date = localStorage.getItem('date')
        const tries = localStorage.getItem('x')

        if (!tries || date !== new Date().toLocaleDateString("en-US") || ip !== currentIp) {
            localStorage.setItem('x', '1')
            localStorage.setItem('ipAddress', currentIp)
            localStorage.setItem('date', new Date().toLocaleDateString("en-US"))
        } else if (tries === '1') {
            localStorage.setItem('x', '2')
        } else if (tries === '2') {
            localStorage.setItem('x', '3')
        }

    }

    const isValid = ()=>{
        if(currentIp){
            const ip = localStorage.getItem('ipAddress')
            const date = localStorage.getItem('date')
            const tries = parseInt(localStorage.getItem('x') ?? '0')
            if(!ip || !date) {
                localStorage.setItem('ipAddress', currentIp)
                localStorage.setItem('date', new Date().toLocaleDateString("en-US"))
                return true
            } else {

                return (ip !== currentIp || date !== new Date().toLocaleDateString("en-US")) || (!isNaN(tries) && tries < 3);
            }
        } else {
            console.warn("No.")
            return false

        }
    }

    return {isValid,incrementTries};
}

export default useValidation;