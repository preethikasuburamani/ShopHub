import { useEffect, useState } from "react";

function useFetch(url){

    //produtcs State
    const[products,setProducts] = useState([])

    //Error State
    const[error,SetError] = useState("")

    //loading
    const[loading,setLoading] = useState(true)


    useEffect(()=>{
        const fetchdata = async ()=>{
            try{
            const res = await fetch(url);
            const data = await res.json()
            setProducts(data)
        }catch(err){
            SetError(err)
        }finally{

            setLoading(false)
        }
        }

        fetchdata()
    },[])

    return {products,error,loading}
}

export default useFetch;