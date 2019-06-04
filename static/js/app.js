const tableData = data;
const tbody = d3.select("tbody");
const submit = d3.select("#filter-btn");
const reset = d3.select('#reset-btn')

// This function lets you do more custom date filtering
let dateParser =  createdTime => {
    let parseDate = d3.timeParse("%d/%m/%Y");
    let formatTime = d3.timeFormat("%d/%m/%Y");
    let convertedDate = formatTime(parseDate(createdTime));
    return convertedDate
};

let customColumns = ()=>{
  // If you want to use custom data and not hard code column names.
  // This is so it only returns on column
  // [1] for property indexing of the dictory keys.
  keyValues = Object.keys(tableData[1])
  keyValues.forEach((value) => 
  tbody.append('td').text(value)
  );
};

// default value to load the page on the init
inputValue = dateParser('1/1/2010')




//-------------------------- test zone ------------------------------

filterDictArr2 = []
classes = ['#datetime','#country', '#city', '#state', '#shape']

let test3 = ()=>{
  filterDictArr2 = []
  for (let HTMLClass of classes){
    (d3.select(HTMLClass).property('value') != '' ) 
      ?
      filterDictArr2.push({
        key : d3.select(HTMLClass)._groups[0][0].id,
        value : d3.select(HTMLClass).property('value')
        })
      : 
      null
  }
} 
let filteredData = () =>{
  return Object.keys(this).every((key)=> tableData[key] === this[key])
}
// maybe map
filterDictArr2.forEach(keyValue => keyValue.key)
usedValues = filterDictArr2.map(keyValue => keyValue.key)
usedKeys = filterDictArr2.map(keyValue => keyValue.key)

//-------------------------- test zone ------------------------------

// This works for one item, not many
let inputChecker = () =>{
  filterDictArr = []
  if (d3.select("#datetime").property('value') != ''){
    filterDictArr.push({
      key : d3.select("#datetime")._groups[0][0].id ,
      value : d3.select("#datetime").property('value')
    });
    return d3.select("#datetime")

  } if (d3.select("#city").property('value') != ''){
    filterDictArr.push({
      key : d3.select("#city")._groups[0][0].id ,
      value : d3.select("#city").property('value')
    });
    return d3.select("#city")

  } if (d3.select("#state").property('value') !=''){
    filterDictArr.push({
      key : d3.select("#state")._groups[0][0].id ,
      value : d3.select("#state").property('value')
    });
    return d3.select("#state")

  } if (d3.select("#country").property('value') != ''){
    filterDictArr.push({
      key : d3.select("#country")._groups[0][0].id ,
      value : d3.select("#country").property('value')
    });
    return d3.select("#country")

  } if (d3.select("#shape").property('value') != ''){
    filterDictArr.push({
      key : d3.select("#shape")._groups[0][0].id ,
      value : d3.select("#shape").property('value')
    });
    return d3.select("#shape")
  } if (1 == 1) {
    return d3.select("#datetime");
  } return filterDictArr
};

submit.on("click", ()=> {
  d3.event.preventDefault();
  let inputElement = inputChecker();
  keyChecker = inputChecker()._groups[0][0].id
  inputValue = inputElement.property("value");

  pageData();
  return inputValue
});

reset.on("click", ()=> {
  d3.event.preventDefault();
  initPage();
});


let pageData = () =>{
  clean()
  let cleanDate = k => k[keyChecker] == inputValue 
    cleanedData = tableData.filter(cleanDate)
    cleanedData.forEach(ufo => {
        let row = tbody.append("tr");
        Object.entries(ufo).forEach(([key, value]) => {
            let cell = row.append("td");
            cell.text(value);
        });
    });
};

// loads the page, add to reset button
let initPage = () =>{
  clean()
    tableData.forEach(ufo => {
        let row = tbody.append("tr");
        Object.entries(ufo).forEach(([key, value]) => {
            let cell = row.append("td");
            cell.text(value);
        });
    });
};

let clean = () => tbody.text(' ');


initPage();