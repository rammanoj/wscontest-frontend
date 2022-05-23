<template>
    <br>
    <div class="container">
        <div class="form-group">
            <label for="cInput">Contests</label>
            <input type="text" class="form-control" id="cInput" v-model="g">
            <small id="cHelp" class="form-text text-muted">All contests ID sepreated by | eg. 2|3</small>
        </div>
        <button v-on:click="getData()" class="btn btn-primary">Get graph</button>
        <br>
        <div id="graphs">
            <div class="row">
                <div class="col">
                    <canvas id="cIndex"></canvas>
                </div>
                <div class="col">
                    <canvas id="cUser"></canvas>
                </div>
            </div>
            <br/>
            <div class="row">
                <div class="col">
                    <canvas id="cProofreader"></canvas>
                </div>
                <div class="col">
                    <canvas id="cValidator"></canvas>
                </div>
            </div>
        </div>
    </div>
    <div v-if="!dataLoaded">
        <div class="loader"></div>
    </div>
</template>


<script>
    export default {
      data() {
        return {
            g: "",
            dataLoaded: true,
            graphData: []
        };
      },

        methods: {
        async getData() {
        try {
            this.dataLoaded = false
            let response = await fetch("http://127.0.0.1:5000/api/graph?c="+this.g, {
                method: "GET",
            });
            this.graphData = await response.json();
            console.log(this.graphData)
            this.dataLoaded = true
        } catch (error) {
            this.dataLoaded = true
            alert("Error in fetching data... Please try again.")
        }
            this.createCharts();
        },
        convertDate(date) {
            console.log(Date.parse(this.getDate(date)))
            return Date.parse(this.getDate(date))
        },
        getDate(dt) {
            let d = dt.split(", ")[0].split("-"), t = dt.split(", ")[1].split(":")
            return new Date(d[2], d[1], d[0], t[0], t[1])
        },
        createCharts() {
            Chart.defaults.global.plugins.datalabels.anchor = 'end';
            Chart.defaults.global.plugins.datalabels.align = 'end';

            let project = [], index_page = [], total_user = [], user_profread = [], user_validate = [];
            console.log(Object.keys(this.graphData))
            for (let i of Object.keys(this.graphData)) {
                console.log(i)
                project.push(this.graphData[i]["project"]);
                index_page.push(this.graphData[i]["index_page"]);
                total_user.push(this.graphData[i]["total_user"]);
                user_profread.push(this.graphData[i]["user_profread"]);
                user_validate.push(this.graphData[i]["user_validate"]);
            }

            this.createBar(project, $('#cIndex'), index_page, 'Total books (' + index_page.reduce((a, b) => a + b, 0) +')');
            this.createBar(project, $('#cUser'), total_user, 'Total users participated (' + total_user.reduce((a, b) => a + b, 0) +')');
            this.createBar(project, $('#cProofreader'), user_profread, 'Total proofreads (' + user_profread.reduce((a, b) => a + b, 0) +')');
            this.createBar(project, $('#cValidator'), user_validate, 'Total validations (' + user_validate.reduce((a, b) => a + b, 0) +')');
        },
        createBar(project, element, cData, legend) {
            // Prepare color for bars
            var backgroundColor = [];
            var borderColor = [];
            for (var i in project) {
                backgroundColor.push("rgba(50,150,200,0.3)");
                borderColor.push("rgba(50,150,200,1)");
            }
			var myBarChart = new Chart(element, {
				type: 'bar',
				data: {
					labels: project,
					datasets: [
						{
							data: cData,
							backgroundColor: backgroundColor,
							borderColor: borderColor,
						}
					]
				},
				options: {
					responsive: true,
					title: {
						display: true,
						position: "top",
						text: legend,
					},
					scales: {
						yAxes: [{
							display: true,
							stacked: true,
							ticks: {
								min: 0
							}
						}]
					},
					legend: {
						display: false
					}
				}
			});
		}
    }
  };
</script>