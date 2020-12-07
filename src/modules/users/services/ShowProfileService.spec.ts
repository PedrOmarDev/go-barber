import AppError from '@shared/errors/AppError'

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import ShowProfileService from './ShowProfileService'

let fakeUsersRepository: FakeUsersRepository
let showProfile: ShowProfileService

describe('ShowUserProfile', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository()
		showProfile = new ShowProfileService(fakeUsersRepository)
	})

	it('should be able to show user profile', async () => {
		const user = await fakeUsersRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
		})

		const findUser = await showProfile.execute({
			user_id: user.id,
		})

		expect(findUser.name).toBe('John Doe')
		expect(findUser.email).toBe('johndoe@example.com')
	})

	it('should not be able to show user profile from non-existing user', async () => {
		await expect(
			showProfile.execute({
				user_id: 'non-existing-user-id',
			}),
		).rejects.toBeInstanceOf(AppError)
	})
})
