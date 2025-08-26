import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'


const WATCHER_KEY = 'watchers'

_createWatchers()

export const watcherService = {
    query,
    remove,
    save
}

function query() {
    return storageService.query(WATCHER_KEY)
        .then( watchers => { 
            return watchers 
        })
}

function remove(watcherId) {
    return storageService.remove(WATCHER_KEY, watcherId)
}

function save(watcher) {
    if (watcher.id) {
        return storageService.put(WATCHER_KEY, watcher)
    } else {
        return storageService.post(WATCHER_KEY, watcher)
    }
}

function getEmptyWaycher(name = '', movies = [], ) {
    return { name, movies }
}

function _createWatchers() {
    let watchers = utilService.loadFromStorage(WATCHER_KEY)
    if (!watchers || !watchers.length) {
        watchers = []
        const names = ['Puki Ba', 'Muki Da', 'Shuki Sa']
        const movies = ['The Matrix', 'Lord of the Rings', 'Rambo', 'Rocky', 'The Godfather', 'The Dark Knight', 'Pulp Fiction', 'Fight Club', 'Inception', 'Interstellar']
        for (let i = 0; i < 3; i++) {
            const name = names[utilService.getRandomIntInclusive(0, watchers.length - 1)]
            watchers.push(_createWatcher(name, utilService.getRandomSubset(movies, utilService.getRandomIntInclusive(4, watchers.length - 1))))
        }
        utilService.saveToStorage(WATCHER_KEY, watchers)
    }
}

function _createWatcher(name, movies) {
    const watcher = getEmptyWaycher(name, movies)
    watcher.id = utilService.makeId()
    return watcher
}