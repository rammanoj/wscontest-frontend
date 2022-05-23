<template>
    <div class="container" v-if="dataLoaded">
        <br />
        <h1>Contest Info</h1>
        <hr>
        <ul>
            <li>
                Name: {{ data.data["name"] }}
            </li>
            <li>
                Project: {{ data.data["project"] }}
            </li>
            <li>
                Started from: {{ data.data["start_date"] }} IST
            </li>
            <li>
                End on: {{ data.data["end_date"] }} IST
            </li>
            <li>
                Created by: {{ data.data["createdby"] }}
            </li>
            <li>
                Created on: {{ data.data["createdon"] }} IST
            </li>
            <li>
                Last Update: {{ data.data['lastUpdate'] }}
            </li>
            <li>
                Contest running status: <span v-if="data.data.status">On</span><span v-if="!data.data.status">Off</span>
            </li>
        </ul>
        <h2>Administrators</h2>
        <hr>
        <ol>
                <li  v-for="k in data.data.admin">
                    <a :href="'https://' + data.data.project + '.wikisource.org/wiki/User:' + k">
                        {{ k }}
                    </a>
                </li>
        </ol>

        <h2>Index Page</h2>
        <hr>
        <ol>
                <li v-for="u in data.data.index">
                    <a :href="'https://' + data.data.project + '.wikisource.org/wiki/' + u">
                        {{ u }}
                    </a>
                </li>
        </ol>

    <h2>Scores</h2>
    <h5>Proofread</h5>
    <hr>
    <table id="proofreadtable" class="statsTable table table-hover table-bordered"
        data-toggle="table"
        data-sort-name="user"
        data-sort-order="asc"
        data-sortable="true"
    >
        <thead>
            <tr>
                <th style="width: 35%" data-field="user" data-sortable="true">User</th>
                <th style="width: 50%" data-sortable="true">Pages</th>
                <th style="width: 15%" data-sortable="true">No of Pages</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(pages, user) in data.proofread" :key="user">
                <td>
                    <a :href="'https://' + data.data.project + '.wikisource.org/wiki/User:' + user">
                        {{ user }}
                    </a>
                </td>
                <td>
                    <p class="user-pages" @click="show_hide"> Show/Hide Pages </p>
                    <div style="display:none;">
                        <table>
                            <tr>
                                <th>Page</th>
                                <th>Rev ID</th>
                            </tr>
                                <tr v-for="page in pages">
                                    <td>
                                        <a :href="'https://' + data.data.project + '.wikisource.org/wiki/' + page.page">{{ page["page"] }}</a>
                                    </td>
                                    <td>
                                        <span v-if="page.rev"><a :href="'https://' + data.data.project + '.wikisource.org/w/index.php?oldid=' + page.rev + '&diff=prev'"> {{ page["rev"] }}</a></span>
                                        <span v-if="!page.rev">n/a</span>
                                    </td>
                                </tr>
                        </table>
                    </div>
                </td>
                <td>{{ pages.length }}</td>
            </tr>
        </tbody>
    </table>

        <br>
    <h5>Validate</h5>
    <hr>
    <table  id="validatetable" class="statsTable table table-hover table-bordered"
        data-toggle="table"
        data-sort-name="user"
        data-sort-order="asc"
        data-sortable="true"
    >
        <thead>
            <tr>
                <th style="width: 35%" data-field="user" data-sortable="true">User</th>
                <th style="width: 50%" data-sortable="true">Pages</th>
                <th style="width: 15%" data-sortable="true">No of Pages</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(pages, user) in data.validate">
                <td>
                    <a :href="'https://' + data.data.project + '.wikisource.org/wiki/User:' + user">
                        {{ user }}
                    </a>
                </td>
                <td>
                    <p class="user-pages" @click="show_hide"> Show/Hide Pages </p>
                    <div style="display:none;">
                        <table>
                            <tr>
                                <th>Page</th>
                                <th>Rev ID</th>
                            </tr>
                                <tr v-for="page in pages">
                                    <td>
                                        <a :href="'https://' + data.data.project + '.wikisource.org/wiki/' + page.page">{{ page["page"] }}</a>
                                    </td>
                                    <td>
                                        <span v-if="page.rev"><a :href="'https://' + data.data.project + '.wikisource.org/w/index.php?oldid=' + page.rev + '&diff=prev'"> {{ page["rev"] }}</a></span>
                                        <span v-if="!page.rev">n/a</span>
                                    </td>
                                </tr>
                        </table>
                    </div>
                </td>
                <td>{{ pages.length }}</td>
            </tr>
        </tbody>
    </table>

    <br>
    <h5>Points table</h5>
    <hr>
    <div>
        <small>Proofread: <b>{{ data.point["p"] }}</b> points</small>
        <small>Validate: <b>{{ data.point["v"] }}</b> points</small>
    </div>
    <table id="scoretable" class="table table-hover table-bordered"
        data-toggle="table"
        data-sort-name="points"
        data-sort-order="desc"
        data-sortable="true"
    >
    <thead>
        <tr>
        <th scope="col" data-sortable="true">User</th>
        <th scope="col" data-sortable="true">Proofread</th>
        <th scope="col" data-sortable="true">Validate</th>
        <th scope="col" data-field="points" data-sortable="true">Total Points</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(score, user) in data.score">
            <td>
                <a :href="'https://' + data.data.project + '.wikisource.org/wiki/User:' + user">{{ user }} </a>
            </td>
            <td>{{ score["proofread"] }}</td>
            <td>{{ score["validate"] }}</td>
            <td>{{ total_score(score["proofread"], data.point["p"]) + total_score(score["validate"], data.point["v"]) }}</td>
        </tr>
    </tbody>
    </table>
    <br>
    <button id="wikitableBtn" @click="wikiTableClick" class="btn btn-warning">Show/Hide wikitable</button>
    <br/>
    <br/>
    <div id="wikitableDiv" style="display: none">
        <button class="btn btn-info btn-sm" @click="wikiTableCopy">Copy table</button>
        <textarea rows="20" style="min-width: 100%">{{ data.wikitable }}</textarea>
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
            data: {},
            dataLoaded: false
        };
      },

        methods: {
        wikiTableClick() {
            $('#wikitableDiv').toggle();
            window.scrollBy(0, 300);
        },
        wikiTableCopy() {
            var text = $("textarea");
            text.select();
            navigator.clipboard.writeText( text.val() );
        },
        total_score(a, b) {
            return a*b
        },
        show_hide(e) {
            console.log($(e.target).next().toggle())
        },
        async getData() {
        try {
            let response = await fetch("http://127.0.0.1:5000/api/contest/" + this.$route.params.id, {
                method: "GET",
            });
            this.data = await response.json();
            this.dataLoaded = true
        } catch (error) {
            console.log(error);
            alert("Error in fetching data... Please try again.")
        }
        },
    },
    created() {
        this.getData();
    },
    updated() {
        $("#proofreadtable").bootstrapTable();
        $("#validatetable").bootstrapTable();
        $("#scoretable").bootstrapTable();
    }
  };
</script>