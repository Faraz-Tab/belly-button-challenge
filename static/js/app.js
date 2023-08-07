// creating a variable with the url to retreive the data with d3
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise Pending and logging the results into the console to see 
// if we have recieved the data
const dataPromise = d3.json(url);
dataPromise.then(data => console.log(data))

init();

// adding the values of our dataset to our dropdownMenu by creating a division
// named option and giving it our dataset id names with a for loop
dataPromise.then(function (data) {
    let options = d3.selectAll("#selDataset");
    sample_count = data.names.length;
    var sample_number = [];
    for (let i=0; i < sample_count; i++) {
        let value = data.names[i];
        let option = options.append("option");
        option.append("value").text(value);
        let list = [];
        list.push(value,);
        sample_number.push(list);
    }

})

let hhh = dataPromise.then(data => data.Object);

// initializing the init() function which is shown when the
// page is open by giving it the values of our first data 
function init() {
    var number = 0;
    barPlot(number);
    bubblePlot(number);
    dataPanelDisplay(number);
}


// creating our barPlot function that creats a bar chart wiht the data
function barPlot(number) {
    dataPromise.then(function(data) {
        let values = data.samples[number].sample_values.slice(0, 10).reverse();
        let otu_ids = data.samples[number].otu_ids.slice(0, 10).reverse(); 
        let otu_ids_string = [];
        for (let i=0; i < otu_ids.length; i++){
            let x = "OTU " + String(otu_ids[i]);
            otu_ids_string.push(x);
        }
        let otu_labels = data.samples[number].otu_labels.slice(0, 10).reverse();
        
        let trace1 = {
            x: values,
            y: otu_ids_string,
            text: otu_labels,
            type: "bar",
            orientation: "h"
        };
        let trace = [trace1];
        let layout = {
            height: 450,
            width: 500,
            margin: {
                t: 10
            }
        };
        Plotly.newPlot("bar", trace, layout);
        })
};


// creating our bubblePlot function that takes the sample number and creats a bubble chart
function bubblePlot(number) {
    dataPromise.then(function(data){
        let x_values = data.samples[number].otu_ids;
        let y_values = data.samples[number].sample_values;
        let text_values = data.samples[number].otu_labels;
        let trace1 = {
            x: x_values,
            y: y_values,
            text: text_values,
            mode: 'markers',
            marker: {
                color: data.samples[number].otu_ids,
                size: data.samples[number].sample_values,
                colorscale: 'Jet'
            },
        };
        let layout = {
            autosize: true,
            margin: {t: 10}
        };
        let trace = [trace1];
        Plotly.newPlot('bubble', trace, layout);
    })
}

// creating a function that prepares the data of the sample for the number given and displays it on the panel
function dataPanelDisplay(number){
    dataPromise.then(function(data){
        let panel = d3.select('#sample-metadata');
        let k = Object.keys(data.metadata[number]);
        let v = Object.values(data.metadata[number]);
        let count = k.length;

        for (let i=0; i < count; i++) {
         let row = panel.append('panel-data');
         row.append('pr').text(`${k[i]}: ${v[i]}`);
         let br = panel.append('br');
         }
     })
}

// defining the function optionChanged for our html file since on 
// the event change is used there in our starter code
function optionChanged() {
    let dropdownMenu = d3.select("#selDataset");
    let dataset = dropdownMenu.property("value");
    dataPromise.then(function(data) {
        let count = data.names.length;
        data_number = 0;
        for(let i=0; i < count; i++){
            if (data.names[i] == dataset){
                data_number = i;
            }
        }
    updatePlots(data_number);
})
}


// creating a function that updates the plots on the page
function updatePlots(n) {
    // updating all the info on plots and the panel using the function
    // with the sample number chosen by the user
    barPlot(n);
    bubblePlot(n);
 
    dataPromise.then(function(data){
        d3.selectAll('panel-data').remove();
        d3.selectAll('br').remove();
    })
    dataPanelDisplay(n);

    {// Please read!
    // !!!!!!!!!
    // WE CAN ALSO USE Plotly.restyle() TO CHANGE OUR PLOTS
    // I HAVE PUT THE CODE FOR THE BAR PLOT AS AN EXAMPLE 
    // 
    // dataPromise.then(function(data){
    //     let x = data.samples[n].sample_values.slice(0, 10).reverse();
    //     let y_values = data.samples[n].otu_ids.slice(0, 10).reverse();
    //     let y = [];
    //     for (let i=0; i < y_values.length; i++){
    //         let otu = "OTU " + String(y_values[i]);
    //         y.push(otu);
    //     }
    //     Plotly.restyle("bar", "x", [x]);
    //     Plotly.restyle("bar", "y", [y]);
    // });

    // // updating the bubblechart
    // dataPromise.then(function(data){
    //     // let x = 
    // });
    // 
};
}