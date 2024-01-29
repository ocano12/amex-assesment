//since this application is small enough I will implement some caching.
//normally I could use contextapi but project scope was to limit everything to the server.
//this has some limitation in where if the server refreshes the current users are wiped out.

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
