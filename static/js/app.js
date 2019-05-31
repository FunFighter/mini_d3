const tableData = data;
const tbody = d3.select("#ufo-table");
const submit = d3.select("#filter-btn");

let dateParser =  createdTime => {
    let parseDate = d3.timeParse("%d/%m/%Y");
    let formatTime = d3.timeFormat("%d/%m/%Y");
    let convertedDate = formatTime(parseDate(createdTime));
    return convertedDate
};

// default value clean up global var
inputValue = dateParser('1/1/2010')


let inputChecker = ()=>{
  if (d3.select("#datetime").property('value') != ''){
    return d3.select("#datetime") 

  } else if (d3.select("#city").property('value') != ''){
    return d3.select("#city")

  } else if (d3.select("#state").property('value') !=''){
    return d3.select("#state")

  } else if (d3.select("#country").property('value') != ''){
    return d3.select("#country")

  } else if (d3.select("#shape").property('value') != ''){
    return d3.select("#shape")

  } else {
    return d3.select("#datetime");
  }
};

keyChecker = inputChecker()._groups[0][0].id

submit.on("click", ()=> {
  d3.event.preventDefault();
  let inputElement = inputChecker();
  inputValue = inputElement.property("value");
  pageData();
  return inputValue
});

// idk if it wanted greater than + = or just =
let cleanDate = k => k[keyChecker] >= inputValue 
let other = k => k[keyChecker] == inputValue 

let pageData = () =>{
  clean()
    cleanedData = tableData.filter(cleanDate)

  // this is so it only returns on column
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