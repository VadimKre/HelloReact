

export function AnimalList ({animalList}){

    return(
        <section className="animal-section">
            <h2>Rare Animals</h2>
            <table className="animal-table">
                {animalList.map( (animal, index) => {
                    return (
                        <thead key={animal.type + 'thead' + index}>
                            <tr key={animal.type + 'tr' +index}>
                                <td key={animal.type + "1"}>{animal.type}</td>
                                <td key={animal.type + '2'}>{animal.count}</td>
                                <td key={animal.type + '3'}><a href={"https://www.google.com/search?q=" + animal.type}> Search </a></td>
                            </tr>
                        </thead>
                        )
                })}
            </table>
        </section>
    )
}