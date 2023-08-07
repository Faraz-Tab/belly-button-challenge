// creating a variable with the url to retreive the data with d3
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise Pending and logging the results into the console to see 
// if we have recieved the data
const dataPromise = d3.json(url);
dataPromise.then(data => console.log(data))

function init() {
    dataPromise.then(function(data) {
    
    let values = data.samples[0].sample_values.slice(0, 10).reverse();
    let otu_ids = data.samples[0].otu_ids.slice(0, 10).reverse(); 
    let otu_ids_string = [];
    for (let i=0; i < otu_ids.length; i++){
        let x = "OTU " + String(otu_ids[i]);
        otu_ids_string.push(x);
    }
    let otu_labels = data.samples[0].otu_labels.slice(0, 10).reverse();
    
    let trace = [{
        x: values,
        y: otu_ids_string,
        text: otu_labels,
        type: "bar",
        orientation: "h"
    }]
    let layout = [{
        height: 1000,
        width: 300
    }];
    Plotly.newPlot("bar", trace, layout);
})

dataPromise.then(function(data){
    let x_values = data.samples[0].otu_ids;
    let y_values = data.samples[0].sample_values;
    trace = [{
        x: data.samples[0].otu_ids,
        y: data.samples[0].sample_values,
        text: data.samples[0].otu_labels,
        mode: 'markers',
        marker: {
            color: data.samples[0].otu_ids,
            size: data.samples[0].sample_values
        }
    }];
    Plotly.newPlot('bubble', trace);
})



dataPromise.then(function(data){
//    let panel = d3.select('.panel-body');
let panel = d3.select('#sample-metadata');
   let k = Object.keys(data.metadata[0]);
   let v = Object.values(data.metadata[0]);
   let count = k.length;
   console.log(k);
   console.log(v);

   
   for (let i=0; i < count; i++) {
    let row = panel.append('panel-data');
    row.append('pr').text(`${k[i]}: ${v[i]}`);
    let br = panel.append('br');
    // console.log(22);
    d3.select('.panel panel-primary').style.width;}
})}

init();