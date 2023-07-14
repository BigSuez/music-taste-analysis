const url = "https://raw.githubusercontent.com/BigSuez/project-3/main/Extraction/Outputs/period_stats.json";

d3.json(url).then(function(data) {
  console.log(data);
  const dates = data.map(entry => entry.date);
  const variables = Object.keys(data[0].stats);
  
  // Exclude 'top_genres' from variables list
  const index = variables.indexOf('top_genres');
  if (index !== -1) {
    variables.splice(index, 1);
  }
  
  // Define the values for the y-axis of the bar chart
  values = []
  function getAverage(list){
    let sum = 0
    for (i=0; i<list.length;i++){
      sum+=list[i]
    }
    return sum/list.length
  }
 values.push(getAverage(data.map(entry => entry.stats.avg_danceability)));
 values.push(getAverage(data.map(entry => entry.stats.avg_energy)));
 values.push(getAverage(data.map(entry => entry.stats.avg_mode)));
 values.push(getAverage(data.map(entry => entry.stats.avg_speechiness)));
 values.push(getAverage(data.map(entry => entry.stats.avg_acousticness)));
 values.push(getAverage(data.map(entry => entry.stats.avg_instrumentalness)));
 values.push(getAverage(data.map(entry => entry.stats.avg_liveness)));
 values.push(getAverage(data.map(entry => entry.stats.avg_valence)));
  // Create the trace for the bar chart
  const trace = {
    x: variables,
    y: values,
    type: 'bar'
  };
  
  // Create the bar chart
  const barData = [trace];
  var barLayout = {
    title: "Bar Chart Showing Averages of Top 100 Songs with Date and Features",
    xaxis: {
    tickmode: "array", 
    // If "array", the placement of the ticks is set via `tickvals` and the tick text is `ticktext`.

    tickvals: [0, 1, 2, 3, 4, 5, 6, 7],

    ticktext: ['Avg Danceability', 'Avg Energy', 'Avg Mode', 'Avg Speechiness', 'Avg Acousticness', 'Avg Instrumentalness', 'Avg Liveness', 'Avg Valence']
    }
  }

  Plotly.newPlot("bar", barData, barLayout);
});



// Creating the line chart
d3.json(url).then(function(data){
  console.log(data)
  let x = [];
  let dance = [];
  let valence = [];
  let energy = [];
  let speech = [];
  let acoustic = [];
  let instrument = [];
  let live = [];
  let tempo = [];
  let duration = []
  for (i = 0; i < data.length; i++){
    dance.push(data[i].stats.avg_danceability);
    valence.push(data[i].stats.avg_valence);
    energy.push(data[i].stats.avg_energy);
    speech.push(data[i].stats.avg_speechiness);
    acoustic.push(data[i].stats.avg_acousticness);
    instrument.push(data[i].stats.avg_instrumentalness);
    live.push(data[i].stats.avg_liveness);
    tempo.push(data[i].stats.avg_tempo);
    duration.push(data[i].stats.avg_duration/10000);
    x.push(data[i].date)
  };
  makeChart(x, dance, valence, energy, speech, acoustic, instrument, live, tempo, duration);
});

function makeChart(x, dance, valence, energy, speech, acoustic, instrument, live, tempo, duration){
    var trace1 = {
        x: x,
        y: dance,
        type: 'line',
        name: 'Danceability'
    };

    var trace2 = {
        x: x,
        y: valence,
        type: 'line',
        name: 'Valence'
    };

    var trace3 = {
        x: x,
        y: energy,
        type: 'line',
        name: 'Energy'
    };

    var trace4 = {
        x: x,
        y: speech,
        type: 'line',
        name: 'Speechiness'
    };

    var trace5 = {
        x: x,
        y: acoustic,
        type: 'line',
        name: 'Acousticness'
    };

    var trace6 = {
        x: x,
        y: instrument,
        type: 'line',
        name: 'Instrumentalness'
    };

    var trace7 = {
        x: x,
        y: live,
        type: 'line',
        name: 'Liveness'
    };

    var trace8 = {
        x: x,
        y: tempo,
        type: 'line'
    };

    var trace9 = {
        x: x,
        y: duration,
        type: 'line'
    };

    var data = [trace1, trace2, trace3, trace4, trace5, trace6, trace7];
    var layout = {
      title: "Average Features of Top 100 Songs by Date"

    }


    Plotly.newPlot('line', data, layout);
    
}