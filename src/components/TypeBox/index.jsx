import React from "react";
import errorSound from "../Media/errorsound.wav";

export const TypeBox = () => {
    const [started, setStarted] = React.useState(false);
    const [reqText, setInputText] = React.useState("chiru");
    const [timeArray, setTimeArray] = React.useState([]);
    const [currInput, setCurrInput] = React.useState("");
    const [time, setTime] = React.useState();
    const [status, setStatus] = React.useState("incomplete");
    const [playErrSound, setPlayErrSound] = React.useState(0);
    const myRef = React.createRef();
    
    const checkInput = (event) => {
        
        if(event.target.value.slice(-1) === reqText[currInput.length]){
            if( !started ) handleStart(); 
            setCurrInput(currInput+event.target.value.slice(-1));
            const currTime = Date.now();
            const tempTimeArray = timeArray.concat(currTime);
            setTimeArray(tempTimeArray);
            if(reqText === myRef.current.value){
                setStatus("completed");
                // setCurrInput("");
                console.log("success");
                setTime((currTime-time)/1000);
            }
        }
        else{
            const errSound = new Audio(errorSound);
            errSound.play();
            console.log("error")
        }
        
    }
    // const reportCard = () => {

    // }
    const handleReset = (event) => {
        event.preventDefault();
        // setTimeArray([timeArray, Date.now()]);
        setStatus("completed")
        setStarted(false);
        setStatus("incomplete")
        setCurrInput("");
        setTimeArray([]);
        setTime();
        console.log("completed");
        // myRef.current.text = "";
    }
    const handleStart = () => {
        if(started === false && myRef.current.text !== ""){
            setStarted(!started);
            const currTime = Date.now();
            setTime(currTime);
            setTimeArray([currTime]);
        }
    }

    const handleSetText = () => {
        const getText = prompt("Enter Text Here");
        setInputText(getText);
        setStarted(false);
        setStatus("incomplete")
        setCurrInput("");
        setTimeArray([]);
        setTime();
    }
    
    const showTime = () => {
        
        console.log(timeArray);
        if(status === "completed"){
            return(
                <div>
                    <p>Time Taken: {(timeArray[timeArray.length-1]-timeArray[0])/1000} sec</p>
                    <ul>

                        {
                            timeArray.map((eachTime, index)=>{
                                
                                if(index>0)
                                return(
                                    <li>{reqText[index]}: {(timeArray[index] - timeArray[index-1])/1000}</li>
                                )
                                else
                                    return(<li>{reqText[0]} : 0.000</li>)
                            })
                        }
                    </ul>
                </div>
            )
        }
    }
    const mainForm = () => (
        <form   onSubmit={(event) => handleReset(event)}
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off">
            <input ref={myRef} type="text" className="input"  value={currInput}   autoCapitalize="false" autoCorrect="false" autoSave="false" onChange={(event)=>checkInput(event)} placeholder="Type Here" autoFocus></input>
            <input type="submit" value="Reset   "></input>
        </form>
    )
    React.useEffect(() => {
        console.log("use effect running!")
        
    },[status])
    return (
        <div>
            <label>Required Text: {reqText}</label> 
            <br />
            <button onClick={()=>handleSetText()}>Set Required Text</button>
            
            {mainForm()}
            {/* <div>
                <p>Time Taken: {time} sec</p>
            </div> */}
            {showTime()}
        </div>
    )
}