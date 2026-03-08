import { useEffect, useState } from "react";

function useFetch(url){

    //produtcs State
    const[products,setProducts] = useState([])

    //Error State
    const[error,SetError] = useState("")


    useEffect(()=>{
        const fetchdata = async ()=>{
            try{
            const res = await fetch(url);
            const data = await res.json()
            setProducts(data)
        }catch(err){
            SetError(err)
        }finally{

        }
        }

        fetchdata()
    },[])

    return {products,error}
}

export default useFetch;