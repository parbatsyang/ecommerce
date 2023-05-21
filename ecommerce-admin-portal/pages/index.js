import Layout from '@/components/Layout'
import React from 'react'
import { LineChart } from 'recharts'
import { XAxis,YAxis,CartesianGrid,Line } from 'recharts'
import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();
  return (
    <Layout>
       <div className="text-blue-900 flex justify-between">
        <h2>Hello, <b>{session?.user?.name}</b></h2>
        <div className="flex bg-gray-300 rounded-lg gap-1">
          <img src={session?.user?.image} className="w-6 h-6" />
          <span className="px-2">
            {session?.user?.email}
          </span>
        </div>
      </div>
      <h1>Hello Charts</h1>
       <LineChart width={500} height={300}>
    <XAxis dataKey="name"/>
    <YAxis/>
    <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
  </LineChart>
    </Layout>
  )
}
