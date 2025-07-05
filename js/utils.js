export function setFilteredData(data, columnName, value) {
    if (value === "all") {
        return data;
    }
    else{
        return data.filter(row => row[columnName] === value);
    }
}