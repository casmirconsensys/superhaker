import React from 'react';

function huddleModal() {
  return (
    <div className='modalBackground'>
        <div className='modalContainer'>
            <div className='title'>
                <h1>Join Lobby</h1>
                <div className='Body'>
                    <p>Enter the Lobby...</p>
                    <div className='footer'>
                        <button>Close</button>
                        <button>Join</button>
                    </div>                    
                </div>
            </div>
        </div>
    </div>
    // <div className='modalBackground'>
    //     <div className='modalContainer'>
    //         <div className='title'>
    //             <h1>Join Lobby</h1>
    //         </div>
    //         <div className='footer'>
    //             <button>Close</button>
    //         </div>
    //             <div className='body'>
    //                 <p>Are you sure you want to join this lobby?</p>
    //         </div>
    //     </div>

    

    // </div>
  )
}

export default huddleModal