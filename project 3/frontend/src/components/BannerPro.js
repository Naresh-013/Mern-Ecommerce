
import React, { useEffect, useState } from 'react'

import image2 from '../asset/banner/image-2.png'
import image3 from '../asset/banner/img-3.jpg'
import image4 from '../asset/banner/image-3.png'
import image5 from '../asset/banner/image-5.png'
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

import image2Mobile from '../asset/banner/mimage-2.png'
import image3Mobile from '../asset/banner/mimage-3.png'
import image4Mobile from '../asset/banner/mimage-4.png'
import image5Mobile from '../asset/banner/mimage-5.png'

const BannerPro = () => {
    const [currentImage,setCurrentImage] = useState(0)

    const desktopImages = [
        image2,
        image3,
        image4,
        image5
    ]

    const mobileImages = [
        image2Mobile,
        image3Mobile,
        image4Mobile,
        image5Mobile
    ]

    const nextImage = () =>{
        if(desktopImages.length - 1 > currentImage){
            setCurrentImage(preve => preve + 1)
        }
    }

    const preveImage = () =>{
        if(currentImage != 0){
            setCurrentImage(preve => preve - 1)
        }
    }


    useEffect(()=>{
        const interval = setInterval(()=>{
            if(desktopImages.length - 1 > currentImage){
                nextImage()
            }else{
                setCurrentImage(0)
            }
        },5000)

        return ()=> clearInterval(interval)
    },[currentImage])

  return (
    
    

    
    <div className='container mx-auto py-12 rounded '>
        
        <div className=' md:h-80 w-full  bg-slate-200 relative'>

                <div className='absolute z-10 h-full w-full md:flex items-center hidden '>
                    <div className=' flex justify-between w-full text-2xl'>
                        <button onClick={preveImage} className='bg-white shadow-md rounded-full p-1'><FaAngleLeft/></button>
                        <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1'><FaAngleRight/></button> 
                    </div>
                </div>

                {/**desktop and tablet version */}
              <div className='hidden md:flex h-full w-full overflow-hidden'>
                {
                        desktopImages.map((imageURl,index)=>{
                            return(
                            <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURl} style={{transform : `translateX(-${currentImage * 100}%)`}}>
                                <img src={imageURl} className='w-full h-full'/>
                            </div>
                            )
                        })
                }
              </div>
              {/**mobile version */}
              <div className='flex h-full w-full overflow-hidden md:hidden'>
                {
                        mobileImages.map((imageURl,index)=>{
                            return(
                            <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURl} style={{transform : `translateX(-${currentImage * 100}%)`}}>
                                <img src={imageURl} className='w-full h-full object-cover'/>
                            </div>
                            )
                        })
                }
              </div>


                


        </div>
    </div>
  )
}

export default BannerPro
