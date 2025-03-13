import React from 'react'
import Overlay from './Overlay'

export default function ConfirmDetails() {
  return (
    <>
    <Overlay/>
    <div className="modal">
        <div className="">
          <h2>Confirm Details</h2>
          <p>Double-Check your details before proceeding</p>
        </div>
        <div className="content">
          <div className="converter">
            <div className="title">Summary</div>
            <div>
              <div>Points to be converted: 300 points</div>
              <div>Data Reward: 1.5GB</div>
              <div>Phone number: 08037238415</div>
            </div>
            

          </div>
          <button className="button-main redeem-button">Redeem Data Reward</button>
          <button className="button-tertiary cancel-button">Cancel</button>
        </div>
      </div> 
      </>
  )
}
