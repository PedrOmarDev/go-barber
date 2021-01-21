export default interface ICacheProvider {
	find(key: string): Promise<string | null>
	save(key: string, value: string): Promise<void>
	invalidate(key: string): Promise<void>
}
