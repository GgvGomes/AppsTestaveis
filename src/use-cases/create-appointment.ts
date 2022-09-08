import { Appointment } from "../entities/appointment";
import { AppointmentRepository } from "../repositories/appointments-repository";

interface Request {
    customer: string,
    startAt: Date,
    endAt: Date,
}

type Response = Appointment;

export class CreateAppointement {
    constructor (private appointmentsRepository: AppointmentRepository) {
        
    }

    async execute ({
        customer, 
        startAt, 
        endAt
    }: Request) : Promise<Response> {

        const overLappingAppointment = await this.appointmentsRepository.findOverLappingAppointment(
            startAt,
            endAt
        )

        if(overLappingAppointment){
            throw new Error('Já tem um agendamento no horario')
        }

        const appointement = new Appointment({
            customer,
            startAt,
            endAt
        });

        await this.appointmentsRepository.create(appointement)
        
        return appointement;
    }
}