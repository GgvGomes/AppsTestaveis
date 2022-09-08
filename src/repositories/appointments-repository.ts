import { Appointment } from "../entities/appointment";

export interface AppointmentRepository {
    create(appointement: Appointment) : Promise<void>;

    findOverLappingAppointment(startAt: Date, endAt: Date) : Promise<Appointment | null>
}