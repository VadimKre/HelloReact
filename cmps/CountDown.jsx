import { utilService } from "../services/util.service.js"
const { useState, useEffect, useRef} = React

export function CountDown({ startFrom, onDone, toTime }) {

    const [timeLeft, setTimeLeft] = useState(toTime ? Math.round(((toTime - Date.now()) / 1000)) : startFrom)
    const intervalID = useRef()
    const elCounter = useRef()

    useEffect( () => {
        intervalID.current = setInterval( () => setTimeLeft( timeLeft => timeLeft - 1 ), 1000)
    }, [])

    useEffect( () => {
        if (timeLeft <= 6) {
            elCounter.current.style.color = 'red'
        }

        if (timeLeft <= 0) {
            onCounterDone()
        }
    }, [timeLeft])

    function onCounterDone() {
        utilService.animateCSS(elCounter.current)
        clearInterval(intervalID.current)
        onDone()
    }

    return (
        <div className='count-down-section'>
            <div ref={elCounter} className='count-down-counter'>{timeLeft}</div>
        </div>  
    )
}