import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import ListProviderAppointmentsService from './ListProviderAppointmentsService'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let listProviderAppointments: ListProviderAppointmentsService

describe('ListProviderAppointments', () => {
	beforeEach(() => {
		fakeAppointmentsRepository = new FakeAppointmentsRepository()
		listProviderAppointments = new ListProviderAppointmentsService(
			fakeAppointmentsRepository,
		)
	})

	it('should be able list the daily appointments from provider', async () => {
		const appointment1 = await fakeAppointmentsRepository.create({
			provider_id: 'provider-id',
			user_id: 'customer-id-1',
			date: new Date(2020, 4, 20, 14, 0, 0),
		})

		const appointment2 = await fakeAppointmentsRepository.create({
			provider_id: 'provider-id',
			user_id: 'customer-id-2',
			date: new Date(2020, 4, 20, 15, 0, 0),
		})

		const appointments = await listProviderAppointments.execute({
			provider_id: 'provider-id',
			day: 20,
			month: 5,
			year: 2020,
		})

		expect(appointments).toEqual([appointment1, appointment2])
	})
})