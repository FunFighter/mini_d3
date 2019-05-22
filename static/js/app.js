// from data.js
let tableData = data;
let tbody = d3.select("#ufo-table");
let submit = d3.select("#filter-btn");

// tableData[0]['datetime']

let dateParser = (createdTime)=>{
    let parseDate = d3.timeParse("%d/%m/%Y");
    let formatTime = d3.timeFormat("%d/%m/%Y");
    let convertedDate = formatTime(parseDate(createdTime));
    return convertedDate
};

// default value
inputValue = dateParser('1/1/2010')

submit.on("click", ()=> {
  d3.event.preventDefault();
  let inputElement = d3.select("#datetime");
  inputValue = inputElement.property("value");
  pageData();
  return inputValue
});

let cleanDate = (k)=>{
	return k.datetime >= inputValue
}

let pageData = ()=>{
    tbody.text('')

    cleanedData = tableData.filter(cleanDate)
    cleanedData.forEach((ufo) => {
        let row = tbody.append("tr");
        Object.entries(ufo).forEach(([key, value]) => {
            let cell = row.append("td");
            cell.text(value);
        });
    });
};
let clean = ()=>{
    tbody.text('')
    // tbody.remove("td")
}




pageData();