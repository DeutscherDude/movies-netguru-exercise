/**
 * @returns object containing current year and month
 */
 export function getCurrentMonth() {
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    return { year, month };
}

/**
 * @desc Get the first day of the current month
 * @returns first day of the month
 */
export function getFirstDayOfMonth() {
    let { year, month } = getCurrentMonth();
    return new Date(year, month, 1);
}

/**
 * @desc Get the last day of the current month
 * @returns last day of the month
 */
export function getLastDayOfMonth() {
    let { year, month } = getCurrentMonth();
    return new Date(year, month + 1, 0);
}
