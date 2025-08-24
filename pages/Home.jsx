import { AnimalList } from "../cmps/AnimalList.jsx"
import { SeasonClock } from "../cmps/SeasonClock.jsx"

const { useState, useEffect } = React

export function Home() {
    return (
        <section className="home">
            <h2>Home Sweet Home</h2>
            <AnimalList animalList={[{type:'Malayan Tiger', count:787},{type:'Mountain Gorilla', count:212},{type:'Fin Whale', count:28}]} />
            <SeasonClock />
       </section>
    )
}

