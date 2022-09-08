import { expect, test } from 'vitest'
import { getFutureDate } from '../tests/utils/get-future-date';
import { Appointment } from './appointment'

test('create an appointement', () => {
    const startAt = getFutureDate('2022-09-08');
    const endAt = getFutureDate('2022-09-09');

    const appointement = new Appointment({
        customer: 'Jhon Doe',
        startAt,
        endAt,
    })

    expect(appointement).toBeInstanceOf(Appointment);
    expect(appointement.customer).toEqual('Jhon Doe');
})

test('cannot create an appointement with end date before start date', () => {
    const startAt = new Date();
    const endAt = new Date();

    startAt.setDate(startAt.getDate() + 2);
    endAt.setDate(endAt.getDate() + 1);

    expect(() => {
        return new Appointment({
            customer: 'Jhon Doe',
            startAt,
            endAt,
        })
    }).toThrow();   
})