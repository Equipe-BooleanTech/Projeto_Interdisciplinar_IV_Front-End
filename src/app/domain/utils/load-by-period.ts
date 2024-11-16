import { ListByPeriodDto } from '@domain/dtos';

export const getCurrentWeek = () => {
    const currentDate = new Date();

    const currentWeekStartDate = new Date(currentDate);
    currentWeekStartDate.setDate(currentDate.getDate() - currentDate.getDay());

    const currentWeekEndDate = new Date(currentDate);

    const currentWeekStartDateString = currentWeekStartDate
        .toISOString()
        .split('T')[0];
    const currentWeekEndDateString = currentWeekEndDate
        .toISOString()
        .split('T')[0];

    return {
        startDate: currentWeekStartDateString,
        endDate: currentWeekEndDateString,
    } as ListByPeriodDto;
};

export const getPastWeek = () => {
    const currentDate = new Date();
    const pastWeekStartDate = new Date(currentDate);
    pastWeekStartDate.setDate(currentDate.getDate() - currentDate.getDay() - 7);
    const pastWeekEndDate = new Date(currentDate);
    pastWeekEndDate.setDate(currentDate.getDate() - currentDate.getDay() - 1);

    return {
        startDate: pastWeekStartDate.toISOString().split('T')[0],
        endDate: pastWeekEndDate.toISOString().split('T')[0],
    } as ListByPeriodDto;
};

export const getCustomInterval = (
    startDate: Date,
    endDate: Date,
): ListByPeriodDto => {
    return {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
    };
};
