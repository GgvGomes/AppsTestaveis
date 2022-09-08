export interface AppointmentProps {
    customer: string,
    startAt: Date;
    endAt: Date;
}

export class Appointment {
    private props : AppointmentProps;

    get customer(){
        return this.props.customer;
    }
    get startAt(){
        return this.props.startAt;
    }
    get endAt(){
        return this.props.endAt;
    }

    constructor (props: AppointmentProps){
        const { startAt, endAt } = props;

        if(startAt <= new Date()){
            throw new Error('Invalid start date');
        }

        if(endAt < startAt){
            throw new Error('Data de finalização menor do que a inial');
        }

        this.props = props;
    }
}