// from data.js
let tableData = data;
let tableIdSelection = d3.select("#ufo-table");
let submit = d3.select("#filter-btn");

// tableData[0]['datetime']

let dateParser = (createdTime)=>{
    let parseDate = d3.timeParse("%d/%m/%Y");
    let formatTime = d3.timeFormat("%d/%m/%Y");
    let convertedDate = formatTime(parseDate(createdTime));
    return convertedDate
};

inputValue = dateParser('1/1/2010')

submit.on("click", ()=> {
  d3.event.preventDefault();
  let inputElement = d3.select("#datetime");
  // I know scary global var but like, we struggling
  inputValue = inputElement.property("value");
  return inputValue
});

let cleanDate = (k)=>{
	return k.datetime >= inputValue
}

cleanedData = tableData.filter(cleanDate)

cleanedData.forEach((ufo) => {
    let row = tableIdSelection.append("tr");

    // test = ufo.filter(cleanDate)
    // console.log(test)

    Object.entries(ufo).forEach(([key, value]) => {
        let cell = row.append("td");
        cell.text(value);
        // let castedTime = dateParser(ufo['datetime'])
        // if (castedTime >= inputValue){
        //     console.log(castedTime);   }    
        
    });
});