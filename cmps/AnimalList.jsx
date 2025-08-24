

export function AnimalList ({animalList}){

    animalList.map((animal) => {console.log('animal.type:', animal.type)})

    return(
        <section className="animal-section">
            <h2>Rare Animals</h2>
            <table className="animal-table">
                {animalList.map( (animal, index) => {
                    return (
                        <tr key={animal.type + 'tr' +index}>
                            <td key={animal.type + "1"}>{animal.type}</td>
                            <td key={animal.type + '2'}>{animal.count}</td>
                            <td key={animal.type + '3'}><a href={"https://www.google.com/search?q=" + animal.type}> Search </a></td>
                        </tr>
                        )
                })}
            </table>
        </section>
    )
}