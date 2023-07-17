//Git JSON URL for Testing
const url = "https://raw.githubusercontent.com/BigSuez/project-3/main/Extraction/Outputs/features.json";

//Flask URL for Prod
//const url = 'http://127.0.0.1:5000/features';

d3.json(url).then(function(data) {
  console.log(data);

  // Get the unique dates from the data
  var dates = data.map(function(obj) {
    return obj.date;
  });

  // Populate the dropdown with the dates
  var dropdown = d3.select("#periodDropdown");
  dropdown.selectAll("option")
    .data(dates)
    .enter()
    .append("option")
    .text(function(d) {
      return d;
    });

  // Define a custom color mapping for specific features
  var colorMap = {
    danceability: "blue",
    energy: "orange",
    speechiness: "green",
    acousticness: "red",
    liveness: "purple",
    valence: "pink"
  };

  // Function to update the chart based on the selected date
  function updateChart(selectedDate) {
    // Find the data object for the selected date
    var selectedData = data.find(function(obj) {
      return obj.date === selectedDate;
    });

    // Get the top 5 tracks for the selected date
    var topTracks = selectedData.top_tracks.slice(0, 5);

    // Define the legend data for each feature
    var legendData = Object.keys(topTracks[0].features).filter(function(feature) {
      return feature !== "duration_ms" && feature !== "time_signature" && feature !== "mode" && feature !== "key" && feature !== "tempo" && feature !== "loudness" && feature !== "instrumentalness" && feature !== "type" && feature !== "id" && feature !== "uri" && feature !== "track_href" && feature !== "analysis_url";
    });

    // Update the data traces and legend for the dot plot
    var traces = [];
    var legendItems = [];

    topTracks.forEach(function(track) {
      var trackTitle = track.track_title;
      var features = track.features;

      Object.keys(features).forEach(function(feature, index) {
        if (feature !== "duration_ms" && feature !== "time_signature" && feature !== "mode" && feature !== "key" && feature !== "tempo" && feature !== "loudness" && feature !== "instrumentalness" && feature !== "type" && feature !== "id" && feature !== "uri" && feature !== "track_href" && feature !== "analysis_url") {
          var value = features[feature];

          var trace = {
            x: [value],
            y: [trackTitle],
            mode: "markers",
            marker: {
              size: 10,
              color: colorMap[feature] || colorScale(index)
            },
            text: feature + ": " + value,
            type: "scatter",
            orientation: "h",
            showlegend: false
          };

          traces.push(trace);
        }
      });
    });

    legendData.forEach(function(feature, index) {
      var legendItem = {
        name: feature,
        marker: {
          color: colorMap[feature] || colorScale(index),
          symbol: "circle"
        }
      };

      legendItems.push(legendItem);
    });

    var layout = {
      title: "Top 5 Tracks Per 6 months",
      xaxis: {
        title: "Feature Value",
        range: [0, 1]
      },
      yaxis: {
        title: "Track Title"
      },
      showlegend: false,
      height: 400,
      width: 1000,
      margin: {
        l: 300,
        r: 50,
        t: 200,
        b: 50
      }
    };

    Plotly.newPlot("chart", traces, layout);

    // Create custom legend
    var legendHtml = "";
    legendItems.forEach(function(item) {
      var color = item.marker.color;
      var name = item.name;

      // Check for specific features and update the text color accordingly
      var textColor;
      if (name === "danceability") {
        textColor = "blue";
      } else if (name === "energy") {
        textColor = "orange";
      } else if (name === "speechiness") {
        textColor = "green";
      } else if (name === "acousticness") {
        textColor = "red";
      } else if (name === "liveness") {
        textColor = "purple";
      } else if (name === "valence") {
        textColor = "pink";
      }

      legendHtml += `<div class="legend-item"><span class="legend-marker" style="background-color:${color};"></span><span class="legend-label" style="color:${textColor};">${name}</span></div>`;
    });

    var legendContainer = document.getElementById("legend");
    legendContainer.innerHTML = legendHtml;
  }

  // Initial chart update with the first date in the data
  updateChart(data[0].date);

  // Event listener for dropdown change
  dropdown.on("change", function() {
    var selectedDate = d3.select(this).property("value");
    updateChart(selectedDate);
  });
});