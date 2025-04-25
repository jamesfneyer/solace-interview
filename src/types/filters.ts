export type Filters = {
    firstName?: string;
    lastName?: string;
    city?: string;
    specialty?: string;
    degree?: string;
    experience?: string;
};

export type FilterKeys = keyof Filters;
