import { utilService } from "../services/util.service.js"

const { useState, useRef, useEffect} = React

export function MouseMonitor() {

    const [isOn, setIsOn] = useState(true)
    const [pos, setPos] = useState({ x:0, y:0 })

    
    
    useEffect( () => {
        addMouseListener()
        
        return ( () => document.removeEventListener('mousemove'))
    }, [])


    function addMouseListener() {
        document.addEventListener('mousemove', (c) => setPos({x : c.clientX, y : c.clientY}))
    }

    function onButtonClick() {
        setIsOn( prev => !prev )
    }

    return(
        <div className='mouse-monitor-container'>
            <h3>Mouse Position</h3>
            {isOn && <h3>{'x: ' + pos.x + ' ' + 'y: ' + pos.y}</h3>}
            <button onClick={onButtonClick}>{isOn ? 'Pause' : 'Resume'}</button>
        </div>
    )
}