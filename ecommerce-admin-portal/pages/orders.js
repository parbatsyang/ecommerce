import Layout from '@/components/Layout'
import axios from 'axios'
import React,{useState,useEffect} from 'react'

const orders = () => {
  const [orders,setOrders]=useState();
const getOrders=async()=>{
  const resp = await axios.get('/api/orders');
  setOrders(resp.data);
}
  useEffect(()=>{
    getOrders();
  },[]);
  return (
    <Layout>
      <h1>Orders</h1>
              <table className="basic">
                
                <thead>
                      <td>Order name</td>
                      <td>Order price</td>
                      <td>Order Time</td>
                </thead>
                <tbody>
                  <tr>
                  {/* <td>Order name</td>
                      <td>Order price</td> */}
                  </tr>

                </tbody>
              </table>
</Layout>
  )  
}

export default orders
