
import { utilService } from "../services/util.service.js"
const { useState, useEffect, useRef} = React

export function SeasonClock (){

    const [isDark, setIsDark] = useState(false)
    const [timer, setTimer] = useState(0)

    const intervalID = useRef()

    const dayName = utilService.getDayName(Date.now())
    const monthName = utilService.getMonthName(Date.now())
    const season = utilService.getSeason(monthName)
    const imgToDisplay = season.toLowerCase() + '.png'


    useEffect( () => {
        intervalID.current = setInterval( () => setTimer( timer => timer + 1 ), 1000)

        return () => clearInterval(intervalID.current)
    }, [])


    function onClick() {
        setIsDark(isDark => !isDark)
    }

    return(
        <div className={"season-clock-section" + (isDark ? ' dark-theme' : '')} onClick={onClick}>
            <h3 className='season-clock-month'>{ monthName + '(' + season + ')'}</h3>
            <img className='season-clock-img' src={'../assets/img/' + imgToDisplay} alt="season-img" />
            <h4 className='season-clock-day'> { dayName }</h4>
        </div>
    )
}