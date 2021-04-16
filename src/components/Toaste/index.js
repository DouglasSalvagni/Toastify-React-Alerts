import React, { useEffect, useState, createContext } from 'react';
import './toast.css';

export const ToastContext = createContext();

export default function Toate({children}) {

    const [alertList, setAlertList] = useState([]);

    function newAlert(message, alertType, time){
        let alert = {message, alertType, time: time ? time : 2000};
        const newAl = [...alertList, alert];
        setAlertList(newAl);
    }

    return(
        <ToastContext.Provider value={{newAlert}}>
            <div className="toast-container">
                <ul className="alert-wraper">
                    {
                        alertList &&
                        alertList.map((alert, index) => 
                            <AlertItem key={index} data={alert} />
                        )
                    }
                </ul>
            </div>
            {children}
        </ToastContext.Provider>
    )
}

function AlertItem({data}) {

    const [alert, setAlert] = useState(null);
    const [totaltime, setTotaltime] = useState(null);
    const [runTime, setRunTime] = useState(0);
    const [slideOut, setSlideOut] = useState(false)

    useEffect(()=>{

        setAlert(data);
        setTotaltime(data.time);


    },[])

    useEffect(()=>{
    

        if(alert){

            const progress = setInterval(()=>{

                setRunTime(runTime => runTime + 10)
                           
            }, 10)
    
            
            const time = setTimeout(()=>{
                
                setSlideOut(true)

                setTimeout(()=>{

                    setAlert(null);

                }, 500)
                
            }, alert.time )
                    
        }

    },[alert])

    

    function handleCloseBtn(e){
        e.preventDefault();
        setSlideOut(true);

        setTimeout(()=>{

            setAlert(null);

        }, 500)
    }


    return(
        <React.Fragment>

            {
                alert &&
                <li 
                className=
                    {`
                        ${slideOut && "alert-out"}
                        ${alert.alertType === "success" && "success"}
                        ${alert.alertType === "error" && "error"} 
                        alert
                    `}
                >
                    <button onClick={(e) => handleCloseBtn(e)}>x</button>
                    <div className="alert-container">{alert.message}</div>
                    <progress value={runTime} max={totaltime}></progress>
                </li>
    
            }

        </React.Fragment>
    )
}
