export interface ITask {
    id: number,
    deviceType: deviceType,
    model: string,
    date: string,
    taskState: taskState,
    price: number,
    phoneNumber: number,
    description: string
}

export class Task implements ITask {
    id!: number;
    deviceType!: deviceType;
    model!: string;
    date!: string;
    taskState!: taskState;
    price!: number;
    phoneNumber!: number;
    description!: string;
}

export enum deviceType {
    phone = 'Telefon',
    tablet = 'Tablet',
    other = 'Inne'
}

export enum taskState {
    new = 'Nowe',
    working = 'W realizacji',
    ready = 'Do odbioru',
    archive = 'Zakończone',
}