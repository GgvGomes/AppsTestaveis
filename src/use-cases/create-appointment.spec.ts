import { describe, expect, it } from "vitest";
import { Appointment } from "../entities/appointment";
import { InMemoryAppointmentsRepository } from "../repositories/in-memory/in-memory-appointements-repository";
import { getFutureDate } from "../tests/utils/get-future-date";
import { CreateAppointement } from "./create-appointment";

describe('Create appointement', () => {
    it('shold be able to create an appointement', () => {

        const appointmentsRepository = new InMemoryAppointmentsRepository()
        const createAppointement = new CreateAppointement(appointmentsRepository)

        const startAt = getFutureDate('2022-09-08');
        const endAt = getFutureDate('2022-09-09');


        expect(createAppointement.execute({
            customer: "Jhon Doe",
            startAt,
            endAt 
        })).resolves.toBeInstanceOf(Appointment )
    })
})


describe('Create appointement', () => {
    it('shold be not able to create an appointement', async () => {

        const appointmentsRepository = new InMemoryAppointmentsRepository()
        const createAppointement = new CreateAppointement(appointmentsRepository)

        const startAt = getFutureDate('2022-09-08');
        const endAt = getFutureDate('2022-09-09');

        await createAppointement.execute({
            customer: "Jhon Doe",
            startAt,
            endAt 
        })

        expect(createAppointement.execute({
            customer: "Jhon Doe",
            startAt: getFutureDate('2022-09-09'),
            endAt: getFutureDate('2022-09-09') 
        })).rejects.toBeInstanceOf(Error)
    })
})