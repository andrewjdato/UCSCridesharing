//Driver model used in the driver section
//OF the code. Contains all the information
//for planned drivers 
export class Driver {
    driver_email: string; 
    driver_departure: string;
    driver_destination: string;
    driver_timeofdeparture: string; 
    driver_days: boolean[]; 
}