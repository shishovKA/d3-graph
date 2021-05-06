<template>
  <div id="app">
    <Graph :dataNodes="nodes" :dataEdges="edges"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Graph from './components/Graph.vue';
import { tutorial } from './testdata/startdata';

@Component({
  components: {
    Graph,
  },
})
export default class App extends Vue {
  private nodes = tutorial.nodes;
  private edges = tutorial.links;
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
