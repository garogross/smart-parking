export const translateToRussian = (text) => {
    const translationMap = {
        'A': 'А',
        'B': 'В',
        'E': 'Е',
        'K': 'К',
        'M': 'М',
        'H': 'Н',
        'O': 'О',
        'P': 'Р',
        'C': 'С',
        'T': 'Т',
        'Y': 'У',
        'X': 'Х'
    };

    return text.split('').map(char => translationMap[char] || char).join('');
};