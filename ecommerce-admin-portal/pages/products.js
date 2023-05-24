import Layout from '@/components/Layout'
import { getProducts } from '@/services/axios.service';
import Link from 'next/link'
import React,{useState,useEffect} from 'react'
import axios from 'axios';

const Products = () => {
    const [products,setProducts]=useState();

    useEffect(()=>{
        getPros();

    },[])
    const getPros=async()=>{
        const response = await getProducts();
        setProducts(response.data);
    }
    const deleteProducts=async(e,product)=>{
        e.preventDefault();
        await axios.delete('/api/products?id=' + product._id);
        const data = products.filter((prod)=>{
            return prod._id !==product._id;
        })
        setProducts(data);
    }
   return (
    <Layout>
        <Link  href="product/new" className="bg-primary bg-blue-500 hover:bg-blue-700">Add new  product</Link>
        <table className="mt-10 table-auto">
            <thead>
                <tr>
                    <td>Product name</td>
                    <td>Product price</td>
                </tr>
            </thead>
            <tbody>
                {
                    products && products.map((product)=>{
                        return <tr key={product._id}>
                            <td>{product.title}</td>
                            <td>{product.price}</td>
                            <td>
                                    <button onClick={(e)=>deleteProducts(e,product)} class="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-full">
                                     Button
                                    </button>

                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table>

    </Layout>
      
   )
}

export default Products