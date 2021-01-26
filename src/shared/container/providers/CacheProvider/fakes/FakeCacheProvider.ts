import ICacheProvider from '../models/ICacheProvider'

interface ICacheData {
	[key: string]: string
}

export default class FakeCacheProvider implements ICacheProvider {
	private cache: ICacheData = {}

	public async find<T>(key: string): Promise<T | null> {
		const data = this.cache[key]

		if (!data) return null

		const parsed_data = JSON.parse(data) as T

		return parsed_data
	}

	public async save(key: string, value: any): Promise<void> {
		this.cache[key] = JSON.stringify(value)
	}

	public async invalidate(key: string): Promise<void> {
		delete this.cache[key]
	}

	public async invalidateByPrefix(prefix: string): Promise<void> {
		Object.keys(this.cache).forEach(key => {
			if (key.startsWith(`${prefix}:`)) delete this.cache[key]
		})
	}
}
