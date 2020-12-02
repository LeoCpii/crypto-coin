import { Injectable } from '@angular/core';

type StorageKey = 'token' | 'user';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor() { }

    public has(key: StorageKey): boolean {
        return key in localStorage;
    }

    public get(key: StorageKey): string {
        return localStorage.getItem(key);
    }

    public getJson<T>(key: StorageKey): T {
        return JSON.parse(this.get(key)) as T;
    }

    public set(key: StorageKey, value: string) {
        localStorage.setItem(key, value);
    }

    public setJson(key: StorageKey, value: any) {
        this.set(key, JSON.stringify(value));
    }

    public remove(key: string) {
        localStorage.removeItem(key);
    }

    public clear() {
        localStorage.clear();
    }
}
