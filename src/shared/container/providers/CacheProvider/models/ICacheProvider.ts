export default interface ICacheProvider {
	find<T>(key: string): Promise<T | null>
	save(key: string, value: any): Promise<void>
	invalidate(key: string): Promise<void>
	invalidateByPrefix(prefix: string): Promise<void>
}
