import Layout from '@/components/Layout'
import React from 'react'

const AddProduct = () => {
  return (
   <Layout>
    <form>
      <h1>Add Product</h1>
    <input type="text" placeholder="enter the product title"/>
    <label>Category</label>
    <select>
      <option value="">Uncategorized</option>
      <option value="">Electronics</option>
    </select>

    <label>Photos</label>
    <div className="mb-2 flex flex-wrap">
        <label className='w-20 h-20 cursur-pointer flex justify-center items-center bg-gray-300'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
        
      </svg>
      </label>
    <input type='file' className="hidden"/>
    </div>
    <label>Description</label>
    <textarea placeholder="Product description"/>

    <label>Price</label>
    <input type='number' placeholder='Product price'/>
    <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Save</button>
    </form>
    </Layout>
  )
}

export default AddProduct
