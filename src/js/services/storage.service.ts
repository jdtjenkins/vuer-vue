import { IState } from '../store/LinkStore';

interface IStorageState {
    [name: string]: IState
}

export default class StorageService {
    public static readonly localStorageKey: string = 'VuerStorage';

    public static save(payload: {
        state: IState,
        name: string,
    }) {
        const currentState = StorageService.load();
        console.log(payload);

        const newState = {
            ...currentState,
            [payload.name]: payload.state,
        }

        StorageService.setState(newState);
    }

    public static load(): IStorageState;
    public static load(name: string): IState;
    public static load(name?: string): IState | IStorageState {
        const state = window.localStorage.getItem(StorageService.localStorageKey);

        const parsedState = JSON.parse(state);

        if (!name) {
            return parsedState;
        }

        if (!state || !state[name]) {
            return {
                links: [],
            };
        }

        return parsedState[name];
    }

    public static delete(): void;
    public static delete(name: string): void;
    public static delete(name?: string): void {
        if (!name) {
            StorageService.clear();
            return;
        }

        const state = StorageService.load();

        delete state[name];

        StorageService.setState(state);
    }

    public static setState(state: IStorageState): void {
        window.localStorage.setItem(StorageService.localStorageKey, JSON.stringify(state));
    }

    public static get names(): string[] {
        return Object.keys(StorageService.load());
    }

    public static clear(): void {
        window.localStorage.clear();
    }
}
