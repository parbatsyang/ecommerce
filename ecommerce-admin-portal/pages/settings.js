import Layout from "@/components/Layout";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();

  return (
    <Layout>
      
       
        
        <div className="w-screen h-screen flex justify-center">
          <div className="flex flex-col justify-center h-3/4 w-1/3 border border-gray-400 pb-20">
            <div className=" flex justify-center items-center flex-col">
                <h2 className="text-4xl mb-3">Profile</h2>
               <img src={session?.user?.image} className="rounded-full me-5 mb-4 w-20"/>
            </div>
        
        <div className="pl-4 pr-4">
            <label className="text-lg">Name</label><br/>
            <input type="text" disabled  value={session?.user?.name} className="text-gray-400 pr-8"/><br/>
            <label>Email</label><br/>
            <input type="text" disabled  value={session?.user?.email} className="text-gray-400"/>

        </div>
        
        
     

        </div>
     
      </div>
    </Layout>
  )
}