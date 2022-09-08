import { areIntervalsOverlapping } from "date-fns";

import { Appointment } from "../../entities/appointment";
import { AppointmentRepository } from "../appointments-repository";

export class InMemoryAppointmentsRepository implements AppointmentRepository {
    public items : Appointment[] = []
    
    async create(appointement: Appointment): Promise<void> {
        this.items.push(appointement)
    }

    async findOverLappingAppointment(startAt: Date, endAt: Date): Promise<Appointment | null> {
        const overLappingAppointment = this.items.find(appointment => {
            return areIntervalsOverlapping({
                start: startAt,
                end: endAt
            },
            {
                start: appointment.startAt,
                end: appointment.endAt
            },
            { inclusive: true }) // inclui o igual
        })
        
        if(!overLappingAppointment){
            return null
        }

        return overLappingAppointment;
    }
}