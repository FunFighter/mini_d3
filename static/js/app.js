const tableData = data;
const tbody = d3.select("tbody");
const submit = d3.select("#filter-btn");
const reset = d3.select('#reset-btn')


classes = ['#datetime','#country', '#city', '#state', '#shape']

// This takes the data and appends it to a list of objects.
// To then use as filters
let pullInputValues = ()=>{
  filteringObjsArr = []
  for (let HTMLClass of classes){
    (d3.select(HTMLClass).property('value') != '' ) 
      ?
      filteringObjsArr.push({
        key : d3.select(HTMLClass)._groups[0][0].id,
        value : d3.select(HTMLClass).property('value')
        })
      : 
      null
  }
} 

// This is so gross, but some times you gotta do what you gotta do
let cleanData = k => {
  if (filteringObjsArr.length == 0){
   return initPage();

 } else if (filteringObjsArr.length == 1){
   return k[filteringObjsArr[0].key] == filteringObjsArr[0].value 

 }else if (filteringObjsArr.length == 2){
   return k[filteringObjsArr[0].key] == filteringObjsArr[0].value && 
   k[filteringObjsArr[1].key] == filteringObjsArr[1].value 

 }else if (filteringObjsArr.length == 3){
   return k[filteringObjsArr[0].key] == filteringObjsArr[0].value && 
   k[filteringObjsArr[1].key] == filteringObjsArr[1].value &&
   k[filteringObjsArr[2].key] == filteringObjsArr[2].value 

 }else if (filteringObjsArr.length == 4){
   return k[filteringObjsArr[0].key] == filteringObjsArr[0].value && 
   k[filteringObjsArr[1].key] == filteringObjsArr[1].value &&
   k[filteringObjsArr[2].key] == filteringObjsArr[2].value &&
   k[filteringObjsArr[3].key] == filteringObjsArr[3].value 

 }else if (filteringObjsArr.length == 5){
  return k[filteringObjsArr[0].key] == filteringObjsArr[0].value && 
  k[filteringObjsArr[1].key] == filteringObjsArr[1].value &&
  k[filteringObjsArr[2].key] == filteringObjsArr[2].value &&
  k[filteringObjsArr[3].key] == filteringObjsArr[3].value &&
  k[filteringObjsArr[4].key] == filteringObjsArr[4].value 

 } else {
  return initPage();
 }
}; 

submit.on("click", ()=> {
  d3.event.preventDefault();
  pullInputValues();
  pageData();
});

reset.on("click", ()=> {
  d3.event.preventDefault();
  initPage();
});


let pageData = () =>{
  clean()
    cleanedData = tableData.filter(cleanData)
    cleanedData.forEach(ufo => {
        let row = tbody.append("tr");
        Object.entries(ufo).forEach(([key, value]) => {
            let cell = row.append("td");
            cell.text(value);
        });
    });
};

// loads the page, added to a reset
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


//----------- Hall of too much work to flesh out these but worth keeping -----------
// This function lets you do more custom date filtering
// This worked great, until the mutli filtering and trying to 
let dateParser =  createdTime => {
  let parseDate = d3.timeParse("%d/%m/%Y");
  let formatTime = d3.timeFormat("%d/%m/%Y");
  let convertedDate = formatTime(parseDate(createdTime));
  return convertedDate
};

// If you want to use custom data and not hard code column names.
// This is so it only returns on column
let customColumns = () => {
  // [1] for proper indexing of the dictory keys.
  keyValues = Object.keys(tableData[1])
  
  keyValues.forEach((value) => 
    tbody.append('td').text(value)
);
};

//------------------------------------------------------------------------------------
