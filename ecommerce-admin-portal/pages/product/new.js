import Layout from '@/components/Layout'
import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import Loader, { BounceSpinLoader } from '@/components/Loader';
import { ReactSortable } from 'react-sortablejs';
import { useRouter } from 'next/router';

const NewProducts = () => {
   const [title,setTitle] = useState('');
   const [isUploading,setIsUploading] = useState(false);
   const [description,setDescription] =useState('');
   const [category,setCategory] =useState('');
   const [price,setPrice] =useState('');
   const [images,setImages] =useState([]);
   const [categories,setCategories]=useState([]);
   const [isLoading,setIsLoading]=useState(false);
   
   const router =useRouter();

    useEffect(()=>{
      getCategories();
    },[])

    const getCategories =async()=>{
         const cate = await axios.get('/api/categories');
         setCategories(cate.data);
    }
    const saveHandler=async(e)=>{
      e.preventDefault();
      const data ={
         title,
         category,
         description,
         images,
         price,
      }
      
      console.log(data);
      await axios.post('api/products',data);
      router.push('/products');
      
    }
    const uploadImages=async(e)=>{
      console.log(e.target.files);
      const {files} = e.target;
      if (files.length >0){
         setIsUploading(true);
         setIsLoading(true);
         const data= new FormData();

         for(let file of files){
            data.append('file',file);
         }
         const res= await axios.post('/api/upload',data);

         setImages((oldImages)=>{
            return[...oldImages,...res.data.links]
         })
         setIsLoading(false);
         setIsUploading(false);
      }
    }
    const setImagesOrder=()=>{
      setImages(images);
    }
   
   return (
      <Layout>
         <h1>Add products</h1>
         <form>
            <label>Product name</label>
            <input type='text' placeholder='Product name' onChange={(e)=>setTitle(e.target.value)} />

            <label>Category</label>
            <select onChange={(e)=>setCategory(e.target.value)}>
               <option value="">Uncategorized</option>
               {
                  categories.length > 0 && categories.map((category)=>{
                     return(
                        <option key={category._id} value={category._id}>{category.name}</option>
                     )
                  })
               }

            </select>

            <label>Photos</label>
            <div className='mb-2 flex flex-wrap'>
               <ReactSortable 
               list={images}
               className='flex flex-wrap gap-1'
               setList={setImagesOrder}
               >
                     {
                        images.length > 0 && images.map((image)=>{
                           return (
                              <div key={image}>
                                 <img  className = 'h-20 mx-1' src={image} alt='image'/>

                              </div>
                           )
                        })
                     }
               </ReactSortable>
               {
                  isUploading && (
                     <div className='h-20 items-center'>
                        <BounceSpinLoader/>
                        </div>
                  )
               }
               <label className='w-20 h-20 cursor-pointer  flex justify-center items-center bg-gray-300'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                  </svg>
                  <input type='file' className='hidden' onChange={uploadImages}/>
               </label>
            </div>

            <label>Description</label>
            <textarea placeholder='Product description' onChange={(e)=> setDescription(e.target.value)} />

            <label>Price</label>
            <input type='number' placeholder='Product price' onChange={(e)=> setPrice(e.target.value)}/>

            <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' onClick={saveHandler}>Save</button>
         </form>
      </Layout >
   )
}

export default NewProducts