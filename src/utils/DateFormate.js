// date formatting function
export const formateDate = (dateString) => {
    if(!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    });
}