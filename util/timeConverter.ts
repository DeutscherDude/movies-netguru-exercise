
class TimeConversionError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "TimeConversionError";
    }
}

/**
 * @desc Converts a date string to a UTC timestamp
 * @param {string} timeStamp 
 * @returns 
 */
export function timeConverter(timeStamp: Date) {
    try{
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
    catch (err) {
        throw new TimeConversionError("Time conversion error, are you passing a correct timeStamp?");
    }
}
