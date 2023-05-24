import Layout from '@/components/Layout'
import Loader from '@/components/Loader'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ToastifySuccess } from '@/services/toastify.service';


const Categories = () => {
   const [name, setName] = useState('');
   const [parentCategory, setParentCategory] = useState('');
   const [editedCategory, setEditedCategory] = useState(null);
   const [categories, setCategories] = useState([]);
   const [isLoading, setIsLoading] =useState(false);

   useEffect(() => {
      getCategories();
   }, [])

   const getCategories = async () => {
      const resp = await axios.get('/api/categories');
      setCategories(resp.data);
   }

   const saveCategory = async (e) => {
      e.preventDefault();
      const data = {
         name,
         parentCategory
      }
      let resp;
      if (editedCategory) {
         data._id = editedCategory._id;
         resp = await axios.put('/api/categories', data);
         setEditedCategory(null);
         setName('');
         setParentCategory('');
      } else {
         resp = await axios.post('/api/categories', data);
      }
      if (resp.status === 200) {
         getCategories();
         //toaster success service implement
      } else {
         //toaster error service implement
      }

   }

   const editCategory = (category) => {
      setEditedCategory(category);
      setName(category.name);
      setParentCategory(category?.parent?._id);
      ToastifySuccess("product edited sucessfully");
   }

   const deleteCategory = async(category) => {
       setIsLoading(true);
       const {_id} =category;
       await axios.delete('/api/categories?_id=' + category._id); 
       getCategories();
       setIsLoading(false);
       ToastifySuccess("product deleted sucessfully");

   }
    

   return (
      <Layout>
         <h1>Categories</h1>
         <form onSubmit={saveCategory}>
            <div className='flex gap-1'>
               <input type='text' placeholder='Category name' value={name} onChange={(e) => setName(e.target.value)} />
               <select value={parentCategory} onChange={(e) => setParentCategory(e.target.value)} >
                  <option value="">No parent category</option>
                  {categories.length > 0 &&
                     categories.map((category) => {
                        return <option key={category._id} value={category._id}>{category.name}</option>
                     })}

               </select>
               <button type='submit' className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>Save</button>
            </div>
         </form>

         {!editedCategory && 
         isLoading ? <Loader /> :
            <table className='basic mt-4'>
               <thead>
                  <tr>
                     <td>Category name</td>
                     <td>Parent  Category</td>
                     <td></td>
                  </tr>
               </thead>
               <tbody>
                  {
                     categories.length > 0 &&
                     categories.map((category) => {
                        return <tr key={category._id}>
                           <td>{category.name}</td>
                           <td>{category?.parent?.name}</td>
                           <td>
                              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded' onClick={(e) => {
                                 editCategory(category);
                              }}>Edit</button>
                              <button className='bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded' onClick={(e) => deleteCategory(category)}>Delete</button>
                           </td>
                        </tr>
                     })
                  }
               </tbody>
            </table>
         }
      </Layout>
   )
 }

export default Categories