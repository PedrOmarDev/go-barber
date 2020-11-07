import { Request, Response } from 'express'
import { container } from 'tsyringe'

import UserMap from '@modules/users/mappers/UserMap'

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'

export default class UserAvatarsController {
	public async update(
		request: Request,
		response: Response,
	): Promise<Response> {
		const updateUserAvatar = container.resolve(UpdateUserAvatarService)

		const user = await updateUserAvatar.execute({
			user_id: request.user.id,
			avatar_filename: request.file.filename,
		})

		const mappedUser = UserMap.toDTO(user)

		return response.json(mappedUser)
	}
}
