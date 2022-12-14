function overviewBarChart() {
    fetch("https://raw.githubusercontent.com/rrrrrrockpang/rrrrrrockpang.github.io/main/overview.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        let [year, chiCount, neuripsCount] = [[], [], []];

        for (let i = 0; i < data.length; i++) {
            if (data[i].conference === "CHI") {
                chiCount.push(data[i].number);
                year.push(data[i].year);
            }

            if (data[i].conference === "NeurIPS") {
                neuripsCount.push(data[i].number);
            }

        }

        var dataChi = {
            x: year,
            y: chiCount,
            name: '# of CHI Papers',
            type: 'bar'
        };
        var dataNeurips = {
            x: year,
            y: neuripsCount,
            name: '# of NeurIPS Papers',
            type: 'bar'
        };
        var data = [dataChi, dataNeurips];
        var layout = {
            barmode: 'group',
            xaxis: {autotick: false, title: "Year"},
            yaxis: {title: "# of Papers"},
            legend: {"orientation": "h", bgcolor: 'transparent', y: -0.2},
            title: {text: "Publication Output in CHI and NeurIPS, 2001-2021"}
        };

        Plotly.newPlot('overviewBarChart', data, layout);
    })
}

// function heatmapSpecter() {
//     fetch("https://raw.githubusercontent.com/rrrrrrockpang/rrrrrrockpang.github.io/main/heatmapSpecter.json")
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {

//         let [z, cYears, nYears] = [[], [], []];

//         for (let i = 0; i < data.length; i+=21) {
//             zRow = [];
//             for (let j = 0; j < 21; j++) {
//                 zRow.push(data[i+j].Score);
//             }
//             z.push(zRow);

//         }
//         for (let i = 2001; i < 2022; i++) {
//             cYears.push(i);
//             nYears.push(i);
//         }

//         var data = [{
//             z: z,
//             x: nYears,
//             y: cYears,
//             type: 'heatmap',
//             hoverongaps: false,
//             colorscale: 'YlGnBu',
//         }];
       
//         var layout = {
//             title: {text: "Cosine Similarity Between CHI and NeurIPS Paper Abstracts, 2001-2021"},
//             xaxis: {autotick: false, title: "NeurIPS Year"},
//             yaxis: {autotick: false, title: "CHI Year"},
//             autosize: false,
//             height: 600,
//         };

//         Plotly.newPlot('heatmapSpecter', data, layout);
        
//     })
// }

function heatmapAbstracts() {
    fetch("https://raw.githubusercontent.com/rrrrrrockpang/rrrrrrockpang.github.io/main/heatmapAbstracts.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {

        let [z, cYears, nYears] = [[], [], []];

        for (let i = 0; i < data.length; i+=21) {
            zRow = [];
            for (let j = 0; j < 21; j++) {
                zRow.push(data[i+j].Score);
            }
            z.push(zRow);

        }
        for (let i = 2001; i < 2022; i++) {
            cYears.push(i);
            nYears.push(i);
        }

        var data = [{
            z: z,
            x: nYears,
            y: cYears,
            type: 'heatmap',
            hoverongaps: false,
            colorscale: 'YlGnBu',
        }];
       
        var layout = {
            title: {text: "Cosine Similarity Between CHI and NeurIPS Paper Abstracts, 2001-2021"},
            xaxis: {autotick: false, title: "NeurIPS Year"},
            yaxis: {autotick: false, title: "CHI Year"},
            autosize: false,
            height: 600,
        };

        Plotly.newPlot('heatmapAbstracts', data, layout);


        for (let i = 2021; i > 2000; i--) {
            var year_opt = document.createElement('option');
            year_opt.innerHTML = i;
            $('#abstractYear').append(year_opt);

            var chi_opt = document.createElement('option');
            chi_opt.innerHTML = i;

            var neurips_opt = document.createElement('option');
            neurips_opt.innerHTML = i;
            $('#formNeuripsYear').append(neurips_opt);

            $('#formChiYear').append(chi_opt);
            if (i > 2016) {
                var chi_opt_g = document.createElement('option');
                chi_opt_g.innerHTML = i;
                $('#formChiYearG').append(chi_opt_g);

                var neurips_opt_g = document.createElement('option');
                neurips_opt_g.innerHTML = i;
                $('#formNeuripsYearG').append(neurips_opt_g);
            }

        }
    })
}

function lineChartAbstracts() {
    fetch("https://raw.githubusercontent.com/rrrrrrockpang/rrrrrrockpang.github.io/main/heatmapAbstracts.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {

        let [x, y] = [[], []];
        let [x_axis, y_axis] = ['', ''];
        let selected_conf = $('#abstractConf').val();
        let selected_year = $('#abstractYear').val(); 

        if (selected_conf == 'CHI') {
            x_axis = "NeurIPS Year";
            y_axis = "Cosine Similarity with " + selected_year + " " + selected_conf;
            for (let i = 0; i < data.length; i+=1) {
                if (data[i].CHI == selected_year) {
                    x.push(data[i].NeurIPS);
                    y.push(data[i].Score);
                }
            }
        }
        else {
            x_axis = "CHI Year";
            y_axis = "Cosine Similarity with " + selected_year + " " + selected_conf;
            for (let i = 0; i < data.length; i+=1) {
                if (data[i].NeurIPS == selected_year) {
                    x.push(data[i].CHI);
                    y.push(data[i].Score);
                }
            }
        }
        
        var data = [{
            x: x,
            y: y,
            type: 'scatter',
            mode: 'lines',
            hoverongaps: false,
        }];
       
        var layout = {
            title: {text: "Cosine Similarity Between CHI and NeurIPS Paper Abstracts"},
            xaxis: {autotick: false, title: x_axis},
            yaxis: {range: [0.85, 1], title: y_axis},
            // autosize: false,
            // height: 400,
        };

        Plotly.newPlot('lineChartAbstracts', data, layout);
    })
}

function tfidfTopics() {
    fetch("https://raw.githubusercontent.com/rrrrrrockpang/rrrrrrockpang.github.io/main/abstract_topics_tfidf.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        $('#topicsTable tbody').empty();
        var selected_chi_year = $('#formChiYear').val();
        var selected_neurips_year = $('#formNeuripsYear').val()
        for (let i = 0; i < data.length; i+=1) {
            var chi_year = data[i]["chi_year"]
            var neurips_year = data[i]["neurips_year"]

            if (chi_year == selected_chi_year && neurips_year == selected_neurips_year) {
                for (let j = 0; j < 4; j+=1) {
                    var chi_cluster_data = data[i]["chi_clusters_topics"][j];
                    var chi_row = document.createElement('tr');
                    chi_row.innerHTML = "<td>CHI</td><td>"+chi_year+"</td><td>"+chi_cluster_data["feat"]+"</td><td>"+chi_cluster_data["n"]+"</td>"
                    $('#topicsTable tbody').append(chi_row)
                }
                for (let j = 0; j < 4; j+=1) {
                    var neurips_cluster_data = data[i]["neurips_clusters_topics"][j];
                    var neurips_row = document.createElement('tr');
                    neurips_row.innerHTML = "<td>NeurIPS</td><td>"+neurips_year+"</td><td>"+neurips_cluster_data["feat"]+"</td><td>"+neurips_cluster_data["n"]+"</td>"
                    $('#topicsTable tbody').append(neurips_row)
                }
            }
        }
    })
}

function gptTopics() {
    fetch("https://raw.githubusercontent.com/rrrrrrockpang/rrrrrrockpang.github.io/main/gpt-topics.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        $('#topicsTableG tbody').empty();
        var selected_chi_year = $('#formChiYearG').val();
        var selected_neurips_year = $('#formNeuripsYearG').val()
        for (let i = 0; i < data.length; i+=1) {
            var chi_year = data[i]["chi_year"]
            var neurips_year = data[i]["neurips_year"]
            
            if (chi_year == selected_chi_year && neurips_year == selected_neurips_year) {
                console.log(chi_year);
                if (data[i]["conference"] === "chi_clusters") {
                    console.log(data[i]["topic"]);
                    var chi_row = document.createElement('tr');
                    chi_row.innerHTML = "<td>CHI</td><td>"+chi_year+"</td><td>"+data[i]["topic"]+"</td>"
                    $('#topicsTableG tbody').append(chi_row)
                    // for (let j = 0; j < 4; j+=1) {
                    //     var chi_cluster_data = data[i]["chi_clusters_topics"][j];
                    //     var chi_row = document.createElement('tr');
                    //     chi_row.innerHTML = "<td>CHI</td><td>"+chi_year+"</td><td>"+chi_cluster_data["feat"]+"</td><td>"+chi_cluster_data["n"]+"</td>"
                    //     $('#topicsTable tbody').append(chi_row)
                    // }
                }

                if (data[i]["conference"] === "neurips_clusters") {
                    var neurips_row = document.createElement('tr');
                    neurips_row.innerHTML = "<td>NeurIPS</td><td>"+neurips_year+"</td><td>"+data[i]["topic"]+"</td>"
                    $('#topicsTableG tbody').append(neurips_row)
                }

            }
        }
    })
}



$(document).ready(function() {
    $(".citation").each(function() {
        let id = $(this).attr("id");
        $(this).append(`
            [<a class="bib" data-trigger="hover" data-toggle="popover" data-placement="top" href="#bib` + id + `" data-original-title="" title="">` + id + `</a>]`);
    });

    overviewBarChart();
    // heatmapSpecter();
    heatmapAbstracts();
    lineChartAbstracts();
    tfidfTopics();
    gptTopics();

});