import { AnimalList } from "../cmps/AnimalList.jsx"
import { SeasonClock } from "../cmps/SeasonClock.jsx"
import { CountDown } from "../cmps/CountDown.jsx"
import { WatcherApp } from "../cmps/WatcherApp.jsx"

const { useState, useEffect } = React

export function Home() {
    return (
        <section className="home">
            <h2>Home Sweet Home</h2>
            <AnimalList animalList={[{type:'Malayan Tiger', count:787},{type:'Mountain Gorilla', count:212},{type:'Fin Whale', count:28}]} />
            <SeasonClock />
            <CountDown startFrom={10} toTime={Date.now() + 1000*5} onDone={()=>{console.log('Done!')}}/>
            <WatcherApp />
       </section>
    )
}

