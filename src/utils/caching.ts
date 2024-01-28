//since this application is small enough I will implement some caching.
//normally I could use contextapi

type CacheType = { [key: string]: any };

let cache: CacheType = {};

export function setCache(key: string, data: any): void {
    cache[key] = data;
}

export function getCache(key: string): any {
    return cache[key];
}

export function clearCache(): void {
    cache = {};
}
