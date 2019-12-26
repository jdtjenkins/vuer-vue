export default class {
    public static saveState(state) {
        window.localStorage.setItem('VuerSession', JSON.stringify(state));
    }

    public static loadState() {
        const newState = window.localStorage.getItem('VuerSession');
        console.log('b', newState)
        return JSON.parse(newState);
    }
}
