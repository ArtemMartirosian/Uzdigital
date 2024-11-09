export function getFormattedTime(timestamp : string) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // Use 24-hour format
    });
}