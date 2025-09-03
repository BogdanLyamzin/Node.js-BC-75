const parseString = str => {
    if(typeof str !== "string") return;

    return str;
};

const parseNumber = value => {
    if(typeof value !== "string") return;

    const parsedValue = parseInt(value);
    if(Number.isNaN(parsedValue)) return;

    return parsedValue;
}

export const parseMovieFilters = ({type, minReleaseYear, maxReleaseYear})=> {
    const parsedType = parseString(type);
    const parsedMinReleaseYear = parseNumber(minReleaseYear);
    const parsedMaxReleaseYear = parseNumber(maxReleaseYear);

    return {
        type: parsedType,
        minReleaseYear: parsedMinReleaseYear,
        maxReleaseYear: parsedMaxReleaseYear,
    };
};