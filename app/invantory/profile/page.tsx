
"use client"
import { useEffect, useState } from 'react'

const profile = () => {
    const [showProfile, setShowProfile] = useState([])
   
    const handlestatusactive = async () => {
        const res = await fetch("/api/admin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
             body: JSON.stringify({  userStatus: 'active' }),
        })
        const data = await res.json()
        console.log("acceptdata", data);

    }
    const handlestatusfailed = async () => {
        const res = await fetch("/api/adminfailed", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
              body: JSON.stringify({  userStatus: 'failed' }),
        })
        const data = await res.json()
        console.log("faileddata", data);

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
        <div className='flex flex-wrap gap-10 p-10'>
            {showProfile.map((showProfile: any) => {
                return (
                    <div key={showProfile._id} className='w-80 h-95 flex flex-col justify-center items-center gap-5 bg-white shadow-lg ' >
                        <p className=''>FirstName:{showProfile.name}</p>
                        <p className=''>LastName:{showProfile.lastname}</p>
                        <p className=''>Email:{showProfile.email}</p>
                        <p className=''>Password:{showProfile.password}</p>
                        <p className=''>Message:{showProfile.message}</p>
                        <div className='flex gap-3'>
                            <button onClick={handlestatusactive} className='bg-black text-white p-2 h-15 w-30 rounded-4xl '>Accept</button>
                            <button onClick={handlestatusfailed} className='bg-black text-white p-2 h-15 w-30 rounded-4xl '>Reject</button>
                        </div>

                    </div >
                )

            })}
        </div>

    )
}

export default profile