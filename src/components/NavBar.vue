<script setup>

</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #FFC107;">
        <router-link class="navbar-brand" to="/">Wikisource Contest</router-link>
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navb" aria-expanded="true">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div id="navb" class="navbar-collapse collapse hide">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item">
                <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/contests/">Contest</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/graph">Graph</router-link>
            </li>
        </ul>
        <!-- {% if logged %}
            <ul class="nav navbar-nav">
                <span class="navbar-text">
                You're logged in as <b> {{username}}! </b> &nbsp;
                </span>
                <li>
                    <a class="btn btn-outline-danger my-2 my-sm-0" href="{{ url_for('logout') }}">
                        <i class="fa fa-user"></i> Logout
                    </a>
                </li>
            </ul>
        {% else %}
                <a class="btn btn-outline-success my-2 my-sm-0" href="{{ url_for('login') }}">
                    <i class="fa fa-sign-in"></i> Login
                </a>
        {% endif %} -->
        </div>
    </nav>
</template>