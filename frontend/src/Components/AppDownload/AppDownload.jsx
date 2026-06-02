import React from 'react'
import './AppDownload.css'

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
        <p>For Better Experience Download <br /> Tomato App</p>
        <div className="app-download-platform">
            <img src={assets.play_store} alt="" />
            <img src={assets.app_store} alt="" />
        </div>
      
    </div>
  )
}
import './AppDownload.css'
import { assets } from '../../assets/assets/frontend_assets/assets'

export default AppDownload
