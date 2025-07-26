function formatDateDDMMYYY(input) {
    let date;
    
    if (typeof input === 'string') {
        date = new Date(input);
    } else if (input instanceof Date) {
        date = input;
    } else {
        throw new Error('Invalid input: input must be a string or a Date object');
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}

export default formatDateDDMMYYY;