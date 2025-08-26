import { watcherService } from "../services/watchers.service.js"
import { utilService } from "../services/util.service.js"

const { useState, useRef, useEffect} = React


export function WatcherApp() {

    const [watchers, setWatchers] = useState([])
    const [selectedWatcher, setSelectedWatcher] = useState(false)
    const [isShowAddWatcherModal, setShowAddWatcherModal] = useState(false)
    const [form, setForm] = useState({ name: "", movies: "" })

    useEffect( () => {
        watcherService.query().then( watchers => setWatchers(watchers) )

    }, [isShowAddWatcherModal])



    function onSelect(watcher) {
        setSelectedWatcher(watcher)
    }

    function onCloseModal() {
        setSelectedWatcher(false)
    }

    function showAddWatcherModal() {
        setShowAddWatcherModal(true)
    }

    function addNewWatcher(e){
        e.preventDefault()

        watcherService.save({name: form.name, movies: form.movies.split(",").map(s => s.trim())})   
            .then( (watcher) => {
                setWatchers( w => [...w, watcher])
                closeAdd()
            })
    }

    function onChange(e) {
        e.preventDefault()
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }))
    }

    function closeAdd() {
        setForm({name: "", movies: "" })
        setShowAddWatcherModal(false)
    }

    function onRemove(e, watcherToRemove) {

        watcherService.remove(watcherToRemove.id).then((w) => {
            setWatchers( w => w.filter( (watcher) => watcher.id !== watcherToRemove.id))
        })

    }

    return( watchers ? 
        <div className='watcher-app-section'>
            <button className='watcher-add-button' onClick={() => showAddWatcherModal()}>Add a Watcher</button>
            <div className='watcher-container-outer'>
                { watchers.map( (watcher, i) => {
                    return(
                        <div key={watcher + i + 'div'} className='watcher-container'>
                            <img key={watcher + i + 'img'} className='watcher-app-img' src="./assets/img/avatar.png" alt="" />
                            <h3 key={watcher + i + 'name'} className='watcher-app-name'>{watcher.name}</h3>
                            <div key={watcher + i + 'container'} className='watcher-app-buttons-container'>
                                <button key={watcher + i + 'button1'} onClick={(e) => onRemove(e,watcher)} className='watcher-app-close-button'>x</button>
                                <button key={watcher + i + 'button2'} onClick={() => onSelect(watcher)} className='watcher-app-select-button'>Select</button>
                            </div>
                        </div>
                    )
                })
                }
            </div>
            {
                selectedWatcher ? 
                    <div className='watcher-app-select-modal'>
                        <h3>{selectedWatcher.name}</h3>
                        <ul>
                            {selectedWatcher.movies.map( (movie, i) => {
                                return <li key={movie+i}>{movie}</li>
                            })}
                        </ul>
                        <button onClick={() => onCloseModal()}>Close</button>
                    </div>
                : []
            }
            {
                isShowAddWatcherModal ? 
                    <div className="watcher-app-add-modal">
                        <form onSubmit={addNewWatcher}>
                            <input type="text" name="name" placeholder="Name" required value={form.name} onChange={onChange} />
                            
                            <input type="text" name="movies" placeholder="Movies (comma separated)" required value={form.movies} onChange={onChange} />
                            <div className="buttons">
                                <button type="button" onClick={closeAdd}>Cancel</button>
                                <button type="submit">Save</button>
                            </div>
                        </form>
                    </div>
                : []
            }
                
            
        </div>
    : []
    )
}