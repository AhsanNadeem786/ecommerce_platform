
"use client"
import { useEffect, useState } from 'react'

const profile = () => {
    const [showProfile, setShowProfile] = useState([])

    const handlestatusactive = async () => {
        const res = await fetch("/api/admin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }

        })
        const data = await res.json()
        console.log("acceptdata",data);
        
    }
    const handlestatusfailed = async() =>{
        const res = await fetch("/api/adminfailed",{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            }
        })
        const data = await res.json()
        console.log("faileddata",data);
        
    }
    const fetchProfile = async () => {

        const res = await fetch("/api/profile")
        const data = await res.json()
        console.log("data", data);
        setShowProfile(data.data)
    }
    useEffect(() => {
        fetchProfile();
    }, []);
    return (

        showProfile.map((showProfile: any) => {
            return (
                <div key={showProfile._id} className='ml-60 -mt-150 w-100 h-100 bg-white shadow-lg' >
                    <p className='ml-15 mt-10'>FirstName:{showProfile.name}</p>
                    <p className='ml-15 mt-10'>LastName:{showProfile.lastname}</p>
                    <p className='ml-15 mt-10'>Email:{showProfile.email}</p>
                    <p className='ml-15 mt-10'>Password:{showProfile.password}</p>
                    <p className='ml-15 mt-10'>Message:{showProfile.message}</p>
                    <button onClick={handlestatusactive} className='bg-black text-white p-2 h-15 w-30 rounded-4xl ml-15 mt-13 '>Accept</button>
                    <button onClick={handlestatusfailed} className='bg-black text-white p-2 h-15 w-30 rounded-4xl ml-15 mt-13 '>Reject</button>
                </div >
            )

        })


    )
}

export default profile