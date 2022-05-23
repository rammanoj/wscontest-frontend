<template>
    <div class="container" v-if="dataLoaded">
        <br>
        <h2>Contest List</h2>
        <p>Total Contest:- {{ contestKeys.length }} </p>
        <table
            id="contestlist"
            class="table table-hover table-bordered"
            data-toggle="table"
            data-search="true"
            data-sort-name="createdon"
            data-sort-order="desc"
            data-sortable="true"
            data-show-fullscreen="true"
            data-show-toggle="true"
            >
        <thead>
            <tr>
                <th scope="col" data-sortable="true">Name</th>
                <th scope="col" data-sortable="true">Project</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col" data-sortable="true" data-field="createdon" data-sorter="sort">Created on</th>
            </tr>
        </thead>
        <tbody>
                    <tr v-for="k in contestKeys" :key="k">
                        <th scope="row">
                            <a href="aasd">
                                {{ contests[k].name }}
                            </a>
                        </th>
                        <td>{{ contests[k].project }}</td>
                        <td>{{ contests[k].start_date }} IST</td>
                        <td>{{ contests[k].end_date }} IST</td>
                        <td><span style="display: none;">{{ convertDate(contests[k].createdon) }}</span>&nbsp;{{ contests[k].createdon }} IST</td>
                    </tr>
        </tbody>
        </table>
    </div>
    <div v-if="!dataLoaded">
        <div class="loader"></div>
    </div>
</template>


<script>
    export default {
      data() {
        return {
            contests: [],
            contestKeys: [],
            dataLoaded: false
        };
      },

        methods: {
        async getData() {
        try {
            let response = await fetch("http://127.0.0.1:5000/contest/", {
                method: "GET",
            });
            this.contests = await response.json();
            this.contestKeys = Object.keys(this.contests);
            let ind = this.contestKeys.indexOf("number_of_con");
            if(ind > -1)
                this.contestKeys.splice(ind, 1)
            this.dataLoaded = true
        } catch (error) {
            console.log(error);
            alert("Error in fetching data... Please try again.")
        }
        },
        convertDate(date) {
            console.log(Date.parse(new Date(date)))
            return Date.parse(new Date(date))
        }
    },
    created() {
        this.getData();
    },
    updated() {
        $("#contestlist").bootstrapTable();
    }
  };
</script>

<style>

.th-inner {
    font-weight: bold !important;
}

.loader {
    display:    block;
    position:   fixed;
    z-index:    1000;
    top:        0;
    left:       0;
    height:     100%;
    width:      100%;
    background: rgba( 255, 255, 255, .8 ) 
                url('./icons/loader.gif') 
                50% 50% 
                no-repeat;
}

/* When the body has the loading class, we turn
   the scrollbar off with overflow:hidden */
/* body.loading .loader {
    overflow: hidden;   
} */

/* Anytime the body has the loading class, our
   modal element will be visible */
/* body.loading .loader {
    display: block;
} */
</style>