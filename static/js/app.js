let tableData = data;
let tbody = d3.select("#ufo-table");
let submit = d3.select("#filter-btn");

let dateParser =  createdTime => {
    let parseDate = d3.timeParse("%d/%m/%Y");
    let formatTime = d3.timeFormat("%d/%m/%Y");
    let convertedDate = formatTime(parseDate(createdTime));
    return convertedDate
};

// default value clean up global var
inputValue = dateParser('1/1/2010')

submit.on("click", ()=> {
  d3.event.preventDefault();
  let inputElement = d3.select("#datetime");
  inputValue = inputElement.property("value");
  pageData();
  return inputValue
});

let cleanDate = k => k.datetime >= inputValue 

let pageData = () =>{

  clean()
    cleanedData = tableData.filter(cleanDate)
    
  // [1] for property indexing of the dictory keys.
  keyValues = Object.keys(cleanedData[1])
    keyValues.forEach((value) => 
      tbody.append('td').text(value)
    );

    cleanedData.forEach(ufo => {
        let row = tbody.append("tr");
        Object.entries(ufo).forEach(([key, value]) => {
            let cell = row.append("td");
            cell.text(value);
        });
    });
};

let clean = () => tbody.text(' ');


pageData();