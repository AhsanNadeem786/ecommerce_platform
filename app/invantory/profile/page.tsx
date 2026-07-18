
"use client"
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

const profile = () => {
    const [showProfile, setShowProfile] = useState([])
   const [acceptLoading,setAcceptLoading] = useState(false)
   const [failedLoading,setFailedLoading] = useState(false)
    const handlestatusactive = async () => { 
        setAcceptLoading(true)
        try {
           
             const res = await fetch("/api/admin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
             body: JSON.stringify({  userStatus: 'active' }),
        })
        const data = await res.json()

        } catch (error) {
            console.log(error);
            
        }finally {
            setAcceptLoading(false)
        }
       

    }
    const handlestatusfailed = async() => {
        setFailedLoading(true)
        try {
             const res = await fetch("/api/adminfailed", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
              body: JSON.stringify({  userStatus: 'failed' }),
        })
        const data = await res.json()
        } catch (error) {
            
        }finally {
            setFailedLoading(false)
        }
       

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
        <div className='flex flex-wrap gap-10 md:p-10'>
            {showProfile.map((showProfile: any) => {
                return (
                    <div key={showProfile._id} className='w-80 h-95 flex flex-col justify-center items-center gap-5 bg-white shadow-lg ' >
                        <p className=''>FirstName:{showProfile.name}</p>
                        <p className=''>LastName:{showProfile.lastname}</p>
                        <p className=''>Email:{showProfile.email}</p>
                        <p className=''>Password:{showProfile.password}</p>
                        <p className=''>Message:{showProfile.message}</p>
                        <div className='flex gap-3'>
                            <Button onClick={handlestatusactive} disabled={acceptLoading} className='bg-black text-white p-2 h-15 w-30 rounded-4xl '>{acceptLoading?"Accepting...":"Accept"}</Button>
                            <Button onClick={handlestatusfailed} disabled={failedLoading} className='bg-black text-white p-2 h-15 w-30 rounded-4xl '>{failedLoading?"failing....":"Failed"}</Button>
                        </div>

                    </div >
                )

            })}
        </div>

    )
}

export default profile