
"use client"
import { Button } from '@/components/ui/button'
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


    }
    const handlestatusfailed = async() => {
        const res = await fetch("/api/adminfailed", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
              body: JSON.stringify({  userStatus: 'failed' }),
        })
        const data = await res.json()

    }
    const fetchProfile = async () => {

        const res = await fetch("/api/profile")
        const data = await res.json()

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
                            <Button onClick={handlestatusactive} className='bg-black text-white p-2 h-15 w-30 rounded-4xl '>Accept</Button>
                            <Button onClick={handlestatusfailed} className='bg-black text-white p-2 h-15 w-30 rounded-4xl '>Reject</Button>
                        </div>

                    </div >
                )

            })}
        </div>

    )
}

export default profile