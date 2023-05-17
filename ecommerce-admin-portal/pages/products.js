import Layout from '@/components/Layout'
import { getProducts } from '@/services/axios.service';
import Link from 'next/link'
import React,{useState,useEffect} from 'react'

const Products = () => {
    const [products,setProducts]=useState();

    useEffect(()=>{
        const response =getProducts();
        setProducts(response.data);

    },[])
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
                        </tr>
                    })
                }
            </tbody>
        </table>

    </Layout>
      
   )
}

export default Products