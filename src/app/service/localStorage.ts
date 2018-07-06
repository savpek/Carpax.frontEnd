export class LocalStorage {
    public get(id: string): any {
        return JSON.parse(localStorage.getItem(id));
    }

    public set(id: string, data: any) {
        localStorage.setItem(id, JSON.stringify(data));
    }
}
