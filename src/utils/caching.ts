//since this application is small enough I will implement some caching.
//normally I could use contextapi but project scope was to limit everything to the server.
//this has some limitation in where if the server refreshes the current users are wiped out.

type CacheType = { [key: string]: any };

declare global {
	var cache: CacheType;
}

global.cache = global.cache || {};

export const setCache = (key: string, data: any): void => {
	global.cache[key] = data;
};

export const getCache = <T = any>(key: string): T | undefined => {
	return global.cache[key] as T;
};

export const clearCache = (): void => {
	global.cache = {};
};
