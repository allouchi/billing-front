import Client from "../domains/Client";
import Consultant from "../domains/Consultant";


export const clientIdentity = (client: Client): string => {
    return upperFirstCase(client.socialReason);
}

export const consultantIdentity = (consultant: Consultant): string => {
    return `${upperFirstCase(consultant.firstName)} ${consultant.lastName.toUpperCase()}`;
}

export const isEmptyString = (value: string | undefined | null): boolean => {
    return value === undefined || value === null || value.trim() === '';
}

export const isNotEmptyString = (value: string | undefined | null): boolean => {
    return !isEmptyString(value);
}

const upperFirstCase = (value: string): string => {
    return `${value.charAt(0).toUpperCase()}${value.substring(1, value.length).toLowerCase()}`;
}

export const initial = (value: string): string => {
    return value.charAt(0).toUpperCase();
}
