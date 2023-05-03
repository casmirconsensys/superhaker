import React from 'react';
//This is the iFrame React code:
// import { HuddleIframe, IframeConfig } from "@huddle01/huddle01-iframe";
 
// const iframeConfig: IframeConfig = {
//     roomUrl: "https://iframe.huddle01.com/123",
//     height: "600px",
//     width: "80%",
//     noBorder: false, // false by default
// };
 
// function App() {
//     return (
//         <div>
//             <HuddleIframe config={iframeConfig} />
//         </div>
//     );
// }
 
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
    //This is the iFrame Vanilla JS code:
//     <iframe
//   id="huddle01-iframe"
//   src="https://iframe.huddle01.com/some-room"
//   name="myiFrame"
//   scrolling="no"
//   height="90%"
//   width="90%"
//   allowFullScreen
//   allow="camera; microphone; clipboard-read; clipboard-write; display-capture"
// ></iframe>
  )
}

export default huddleModal