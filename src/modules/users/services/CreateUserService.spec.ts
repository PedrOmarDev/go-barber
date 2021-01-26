import AppError from '@shared/errors/AppError'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import CreateUserService from './CreateUserService'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let fakeCacheProvider: FakeCacheProvider
let createUser: CreateUserService

describe('CreateUser', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository()
		fakeHashProvider = new FakeHashProvider()
		createUser = new CreateUserService(
			fakeUsersRepository,
			fakeHashProvider,
			fakeCacheProvider,
		)
	})

	it('should be able to create new user', async () => {
		const user = await createUser.execute({
			email: 'pedro.omar@introduce.com.br',
			name: 'Pedro Omar',
			password: '123456',
		})

		expect(user).toHaveProperty('id')
	})

	it('should not be able to create new user with an email already used', async () => {
		await createUser.execute({
			email: 'pedro.omar@introduce.com.br',
			name: 'Pedro Omar',
			password: '123456',
		})

		await expect(
			createUser.execute({
				email: 'pedro.omar@introduce.com.br',
				name: 'Pedro Omar',
				password: '123456',
			}),
		).rejects.toBeInstanceOf(AppError)
	})
})
