function separaDataHora(dateTimeString: string): [ date: string, time: string ] | null {
    const dateTimeRegex = /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})\:\d{2}.\d{3}Z$/;
    const match = dateTimeRegex.exec(dateTimeString);
    
    if (!match) {
        console.error("Invalid dateTime string format");
        return null;
    }

    const [, date, time] = match;
    return [ date, time ];
}

export default separaDataHora;
