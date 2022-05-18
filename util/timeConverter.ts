
/**
 * @desc Converts a date string to a UTC timestamp
 * @param {string} timeStamp 
 * @returns 
 */
export function timeConverter(timeStamp: Date) {
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'        
    } as const
    const formattedDate = timeStamp.toLocaleDateString('en-US', options);
    return formattedDate;
}
