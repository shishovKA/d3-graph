<template>
<div class="main">

  <!-- Nodes -->
  <div class="panel__container">
    <p class="panel__title">Nodes</p>
    <p class="panel__subtitle">Create new node:</p>
    <div class="panel__row">
      <input placeholder="enter node caption" v-model="newNodeName" v-on:keyup.enter="adNode">
      <img class="button button_add" @click="adNode"  src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxMnB0IiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjUxMnB0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im0yNTYgNTEyYy0xNDEuMTY0MDYyIDAtMjU2LTExNC44MzU5MzgtMjU2LTI1NnMxMTQuODM1OTM4LTI1NiAyNTYtMjU2IDI1NiAxMTQuODM1OTM4IDI1NiAyNTYtMTE0LjgzNTkzOCAyNTYtMjU2IDI1NnptMC00ODBjLTEyMy41MTk1MzEgMC0yMjQgMTAwLjQ4MDQ2OS0yMjQgMjI0czEwMC40ODA0NjkgMjI0IDIyNCAyMjQgMjI0LTEwMC40ODA0NjkgMjI0LTIyNC0xMDAuNDgwNDY5LTIyNC0yMjQtMjI0em0wIDAiLz48cGF0aCBkPSJtMzY4IDI3MmgtMjI0Yy04LjgzMjAzMSAwLTE2LTcuMTY3OTY5LTE2LTE2czcuMTY3OTY5LTE2IDE2LTE2aDIyNGM4LjgzMjAzMSAwIDE2IDcuMTY3OTY5IDE2IDE2cy03LjE2Nzk2OSAxNi0xNiAxNnptMCAwIi8+PHBhdGggZD0ibTI1NiAzODRjLTguODMyMDMxIDAtMTYtNy4xNjc5NjktMTYtMTZ2LTIyNGMwLTguODMyMDMxIDcuMTY3OTY5LTE2IDE2LTE2czE2IDcuMTY3OTY5IDE2IDE2djIyNGMwIDguODMyMDMxLTcuMTY3OTY5IDE2LTE2IDE2em0wIDAiLz48L3N2Zz4=" />
    </div>

    <p class="panel__subtitle">Node list:</p>
    <div class="list__container">
      <div v-for="node in this.nodes"
        :key = node.index
        class="node__item"
      >
        <p class="node__index">#{{node.index}}</p>
        <p class="node__id">{{node.id}}</p>
        <img class="button button_delete" @click="delNode(node.index)" src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNTEyIDUxMiIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB3aWR0aD0iNTEyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnPjxwYXRoIGQ9Im00MjQgNjRoLTg4di0xNmMwLTI2LjQ2Ny0yMS41MzMtNDgtNDgtNDhoLTY0Yy0yNi40NjcgMC00OCAyMS41MzMtNDggNDh2MTZoLTg4Yy0yMi4wNTYgMC00MCAxNy45NDQtNDAgNDB2NTZjMCA4LjgzNiA3LjE2NCAxNiAxNiAxNmg4Ljc0NGwxMy44MjMgMjkwLjI4M2MxLjIyMSAyNS42MzYgMjIuMjgxIDQ1LjcxNyA0Ny45NDUgNDUuNzE3aDI0Mi45NzZjMjUuNjY1IDAgNDYuNzI1LTIwLjA4MSA0Ny45NDUtNDUuNzE3bDEzLjgyMy0yOTAuMjgzaDguNzQ0YzguODM2IDAgMTYtNy4xNjQgMTYtMTZ2LTU2YzAtMjIuMDU2LTE3Ljk0NC00MC00MC00MHptLTIxNi0xNmMwLTguODIyIDcuMTc4LTE2IDE2LTE2aDY0YzguODIyIDAgMTYgNy4xNzggMTYgMTZ2MTZoLTk2em0tMTI4IDU2YzAtNC40MTEgMy41ODktOCA4LThoMzM2YzQuNDExIDAgOCAzLjU4OSA4IDh2NDBjLTQuOTMxIDAtMzMxLjU2NyAwLTM1MiAwem0zMTMuNDY5IDM2MC43NjFjLS40MDcgOC41NDUtNy40MjcgMTUuMjM5LTE1Ljk4MSAxNS4yMzloLTI0Mi45NzZjLTguNTU1IDAtMTUuNTc1LTYuNjk0LTE1Ljk4MS0xNS4yMzlsLTEzLjc1MS0yODguNzYxaDMwMi40NHoiLz48cGF0aCBkPSJtMjU2IDQ0OGM4LjgzNiAwIDE2LTcuMTY0IDE2LTE2di0yMDhjMC04LjgzNi03LjE2NC0xNi0xNi0xNnMtMTYgNy4xNjQtMTYgMTZ2MjA4YzAgOC44MzYgNy4xNjMgMTYgMTYgMTZ6Ii8+PHBhdGggZD0ibTMzNiA0NDhjOC44MzYgMCAxNi03LjE2NCAxNi0xNnYtMjA4YzAtOC44MzYtNy4xNjQtMTYtMTYtMTZzLTE2IDcuMTY0LTE2IDE2djIwOGMwIDguODM2IDcuMTYzIDE2IDE2IDE2eiIvPjxwYXRoIGQ9Im0xNzYgNDQ4YzguODM2IDAgMTYtNy4xNjQgMTYtMTZ2LTIwOGMwLTguODM2LTcuMTY0LTE2LTE2LTE2cy0xNiA3LjE2NC0xNiAxNnYyMDhjMCA4LjgzNiA3LjE2MyAxNiAxNiAxNnoiLz48L2c+PC9zdmc+" />
      </div>
    </div>   
  </div>

  <!-- Edges -->
  <div class="panel__container panel__container_edges">
    <p class="panel__title">Edges</p>    
    <p class="panel__subtitle">Create new edge:</p>
    <div class="panel__row">
      <select v-model="sourceId">
        <option :value="node.index" v-for="node in this.nodes" :key="node.index">{{(node.id === '') ? `#${node.index}` : node.id}}</option>
      </select>
      <p class="arrow">→</p>
      <select v-model="targetId">
        <option :value="node.index" v-for="node in this.nodes" :key="node.index">{{(node.id === '') ? `#${node.index}` : node.id}}</option>
      </select>
      <img class="button button_add" @click="adLink"  src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxMnB0IiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjUxMnB0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im0yNTYgNTEyYy0xNDEuMTY0MDYyIDAtMjU2LTExNC44MzU5MzgtMjU2LTI1NnMxMTQuODM1OTM4LTI1NiAyNTYtMjU2IDI1NiAxMTQuODM1OTM4IDI1NiAyNTYtMTE0LjgzNTkzOCAyNTYtMjU2IDI1NnptMC00ODBjLTEyMy41MTk1MzEgMC0yMjQgMTAwLjQ4MDQ2OS0yMjQgMjI0czEwMC40ODA0NjkgMjI0IDIyNCAyMjQgMjI0LTEwMC40ODA0NjkgMjI0LTIyNC0xMDAuNDgwNDY5LTIyNC0yMjQtMjI0em0wIDAiLz48cGF0aCBkPSJtMzY4IDI3MmgtMjI0Yy04LjgzMjAzMSAwLTE2LTcuMTY3OTY5LTE2LTE2czcuMTY3OTY5LTE2IDE2LTE2aDIyNGM4LjgzMjAzMSAwIDE2IDcuMTY3OTY5IDE2IDE2cy03LjE2Nzk2OSAxNi0xNiAxNnptMCAwIi8+PHBhdGggZD0ibTI1NiAzODRjLTguODMyMDMxIDAtMTYtNy4xNjc5NjktMTYtMTZ2LTIyNGMwLTguODMyMDMxIDcuMTY3OTY5LTE2IDE2LTE2czE2IDcuMTY3OTY5IDE2IDE2djIyNGMwIDguODMyMDMxLTcuMTY3OTY5IDE2LTE2IDE2em0wIDAiLz48L3N2Zz4=" />
    </div>

    <p class="panel__subtitle">Edge list:</p>
    <div class="list__container">
      <div v-for="edge in this.links"
        :key = edge.index
        class="node__item"
      >
        <p class="node__index">#{{edge.index}}</p>
        <p class="edge__id">
          <span class="edge__source">{{(edge.source.id === '') ? `#${edge.source.index}` : edge.source.id}}</span> 
          → 
          <span class="edge__source">{{(edge.target.id === '') ? `#${edge.target.index}` : edge.target.id}}</span>
        </p>
        <img class="button button_delete" @click="delLink(edge.index)" src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNTEyIDUxMiIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB3aWR0aD0iNTEyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnPjxwYXRoIGQ9Im00MjQgNjRoLTg4di0xNmMwLTI2LjQ2Ny0yMS41MzMtNDgtNDgtNDhoLTY0Yy0yNi40NjcgMC00OCAyMS41MzMtNDggNDh2MTZoLTg4Yy0yMi4wNTYgMC00MCAxNy45NDQtNDAgNDB2NTZjMCA4LjgzNiA3LjE2NCAxNiAxNiAxNmg4Ljc0NGwxMy44MjMgMjkwLjI4M2MxLjIyMSAyNS42MzYgMjIuMjgxIDQ1LjcxNyA0Ny45NDUgNDUuNzE3aDI0Mi45NzZjMjUuNjY1IDAgNDYuNzI1LTIwLjA4MSA0Ny45NDUtNDUuNzE3bDEzLjgyMy0yOTAuMjgzaDguNzQ0YzguODM2IDAgMTYtNy4xNjQgMTYtMTZ2LTU2YzAtMjIuMDU2LTE3Ljk0NC00MC00MC00MHptLTIxNi0xNmMwLTguODIyIDcuMTc4LTE2IDE2LTE2aDY0YzguODIyIDAgMTYgNy4xNzggMTYgMTZ2MTZoLTk2em0tMTI4IDU2YzAtNC40MTEgMy41ODktOCA4LThoMzM2YzQuNDExIDAgOCAzLjU4OSA4IDh2NDBjLTQuOTMxIDAtMzMxLjU2NyAwLTM1MiAwem0zMTMuNDY5IDM2MC43NjFjLS40MDcgOC41NDUtNy40MjcgMTUuMjM5LTE1Ljk4MSAxNS4yMzloLTI0Mi45NzZjLTguNTU1IDAtMTUuNTc1LTYuNjk0LTE1Ljk4MS0xNS4yMzlsLTEzLjc1MS0yODguNzYxaDMwMi40NHoiLz48cGF0aCBkPSJtMjU2IDQ0OGM4LjgzNiAwIDE2LTcuMTY0IDE2LTE2di0yMDhjMC04LjgzNi03LjE2NC0xNi0xNi0xNnMtMTYgNy4xNjQtMTYgMTZ2MjA4YzAgOC44MzYgNy4xNjMgMTYgMTYgMTZ6Ii8+PHBhdGggZD0ibTMzNiA0NDhjOC44MzYgMCAxNi03LjE2NCAxNi0xNnYtMjA4YzAtOC44MzYtNy4xNjQtMTYtMTYtMTZzLTE2IDcuMTY0LTE2IDE2djIwOGMwIDguODM2IDcuMTYzIDE2IDE2IDE2eiIvPjxwYXRoIGQ9Im0xNzYgNDQ4YzguODM2IDAgMTYtNy4xNjQgMTYtMTZ2LTIwOGMwLTguODM2LTcuMTY0LTE2LTE2LTE2cy0xNiA3LjE2NC0xNiAxNnYyMDhjMCA4LjgzNiA3LjE2MyAxNiAxNiAxNnoiLz48L2c+PC9zdmc+" />
      </div>
    </div> 
      
  </div>

  <!-- graph -->
  <div class="graph__container">
    <p class="panel__subtitle">use mouse wheel or touchpad to zoom in/out</p>
    <svg :viewBox="viewBox" :width="this.width" :height="this.height">
        <!-- arrow marker -->
        <defs>
          <marker id="triangle" viewBox="0 0 10 10"
            refX="15" refY="5"
            markerUnits="strokeWidth"
            markerWidth="10" markerHeight="5"
            orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#c4c4c4"/>
        </marker>
        </defs>
      
      <g class="graph__group">
        <!-- edges group -->
        <g class="graph__edges" />
        <!-- nodes group -->
        <g class="graph__nodes" />
      </g>

    </svg>

  <!-- path -->
  <div class="panel__container panel__container_paths">
    <p class="panel__title">Paths:</p>
    <div class="panel__row">
      <select v-model="pathSourceId" @change="findAllPathes">
        <option :value="node.index" v-for="node in this.nodes" :key="node.index">{{(node.id === '') ? `#${node.index}` : node.id}}</option>
      </select>
      <p class="arrow">→</p>
      <select v-model="pathTargetId" @change="findAllPathes">
        <option :value="node.index" v-for="node in this.nodes" :key="node.index">{{(node.id === '') ? `#${node.index}` : node.id}}</option>
      </select>
    </div>

    <div class="list__container" style="margin-top: 10px">
      <div v-for="(path, index) in this.pathes"
        :key = index
        class="node__item"
      >
      <input type="radio" :id="index" :value="index" v-model="pathIndex">
      <label :for="index">{{path}}</label>
      </div>
    </div>
  
  </div>
  </div>

</div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import * as d3 from "d3";
// @ts-ignore
import Graph from 'node-all-paths';
//import createGraph from 'ngraph.graph';
//import path from 'ngraph.path';

@Component
export default class GraphDirected extends Vue {
  @Prop() private dataNodes!: any;
  @Prop() private dataEdges!: any;

  newNodeName = '';
  source = '';
  target = '';
  sourceId = 0;
  targetId = 1;
  pathSourceId = 0;
  pathTargetId = 1;
  pathIndex = -1;
  currentPathLines: any[] = [];

  width = 500;
  height = 500;
  nodes:any = [];
  links:any = [];
  simulation: any;
  pathes = [];
  link!: any;
  node!: any;
  svg!: any;
  g!: any;

  mounted() {  
    this.initLayout();  
    this.initForce();
    this.restart();
    this.findAllPathes();
  }

  initLayout() {
    this.nodes = this.dataNodes.slice();
    this.links = this.dataEdges.slice();
    this.svg = d3.select("svg");
    this.g = d3.select(".graph__group");

    const zoomed = ({transform}:any) => {
      this.g.attr("transform", transform);
    }

    this.svg.call(d3.zoom()
      .extent([[0, 0], [this.width, this.height]])
      .scaleExtent([0.5, 8])
      .on("zoom", zoomed));
    // link
    this.link = d3.select(".graph__edges").selectAll("line")
    // node
    this.node = d3.select(".graph__nodes").selectAll(".node");
  }

  initForce() {
    this.simulation = d3.forceSimulation(this.nodes)
      .force("charge", d3.forceManyBody().strength(-1000))
      .force("link", d3.forceLink(this.links).distance(100))
      .force("x", d3.forceX(this.width/2))
      .force("y", d3.forceY(this.height/2))
      //.force("center", d3.forceCenter(this.width/2, this.height/2))
      .alphaTarget(0)
      .on("tick", this.ticked);
  }

  ticked() {
    this.node.attr("transform", (d: any) => { return "translate(" + d.x + "," + d.y + ")"; });
    this.link.attr("x1", (d:any) => { return d.source.x; })
        .attr("y1", (d:any) => { return d.source.y; })
        .attr("x2", (d:any) => { return d.target.x; })
        .attr("y2", (d:any) => { return d.target.y; });
  }

  restart() {
    // Apply the general update pattern to the nodes.
    this.node = this.node.data(this.nodes, (d: any) => { return d.id;});
    this.node.exit().remove();

    this.node = this.node.enter().append("g")
      .attr("class", "node")
      .merge(this.node);

    this.node.append("circle")
      .attr("r", 5)
      .merge(this.node);

    this.node.append("text")
      .attr("dy", "-0.8em")
      .text((d: any) => { return d.id; })
      .merge(this.node);

    // Apply the general update pattern to the links.
    this.link = this.link.data(this.links, (d: any) => { return d.source.id + "-" + d.target.id; });
    this.link.exit().remove();
    this.link = this.link.enter().append("line")
      .attr("marker-end", "url(#triangle)")
      .merge(this.link);

    // Update and restart the simulation.
    this.simulation.nodes(this.nodes);
    this.simulation.force("link").links(this.links);
    this.simulation.alpha(1).restart();
  }

  get viewBox() {
    return `0 0 ${this.width} ${this.height}`;
  }

  getNodeById(id: string): number {
    return this.nodes.findIndex((node: any)=> node.id === id);
  }

  adNode() {
      const newNode = {
        id: this.newNodeName,
      }
      this.nodes.push(newNode);
      this.newNodeName = '';
      this.restart();
  }

  adLink() {
    const newLink = {
      source: this.sourceId,
      target: this.targetId,
    }
    
    this.links.push(newLink);
    this.restart(); 
    this.findAllPathes();
  }

  delNode(index: number) {
    this.nodes.splice(index, 1);
    this.restart();
    this.findAllPathes();
  }

  delLink(index: number) {
    this.links.splice(index, 1);
    this.restart();
    this.findAllPathes();
  }

  /* shortest
  findpath() {
    const graph = createGraph();
    this.nodes.forEach((node: any) => {
      graph.addNode(node.index);
    })
    this.links.forEach((link: any) => {
      graph.addLink(link.source.index, link.target.index);
    })

    let pathFinder = path.aStar(graph, { oriented: true });
    let fromNodeId = this.getNodeById(this.pathSource);
    let toNodeId = this.getNodeById(this.pathTarget);
    let foundPath = pathFinder.find(fromNodeId, toNodeId);
    this.setCurPath(foundPath);
    
    this.highLightPath(0);
  }
  */

  //all pathes
  findAllPathes() {
    this.pathIndex = -1;
    const graph = new Graph()

    this.nodes.forEach( (node: any, index: number) => {
      const name = index;
      const targets = this.links.filter( (link: any) => {
        return (link.source.index === index)
      });
      const neighbours = targets.reduce((obj: any, link: any) => {
        obj[link.target.index.toString()] = 1;
       return obj
      }, {})
      graph.addNode(name.toString(), neighbours);
    })

    this.pathes = graph.path(this.pathSourceId.toString(), this.pathTargetId.toString());
  }

  @Watch('pathIndex')
  onPathChanged(val: number) {
    if (val !== -1) {
      this.highLightPath(val)
    } else {
      this.highLightPath(-1);
    }
  }

  highLightPath(index: number) {
    if ( index == -1) {
      const all = d3.selectAll("line")
      .attr('stroke', '#c4c4c4')
    } else {
      this.setCurPath(this.pathes[index]);
      const all = d3.selectAll("line")
      .attr('stroke', (d: any) => { 
        if (this.inPath(d)) return 'green'
        return '#c4c4c4'
      })
    }
  }

  setCurPath(foundPath: any) {
    const lineArr = []
    for (let i=0; i<foundPath.length-1; i++) {
      const line = {
        source: +foundPath[i],
        target: +foundPath[i+1],
      }
      lineArr.push(line);
    }
    this.currentPathLines = lineArr;
  }

  inPath(line:any) {
    return this.currentPathLines.find((pathline:any) => {
      return (pathline.source === line.source.index) && (pathline.target === line.target.index)
      }
    )
  }

}
</script>

<style scoped>

  .main {
    display: flex;
    width: 100%;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: start;
    align-items: flex-start;
  }

 svg {
   background-color: rgb(248, 248, 248);
 }

 .graph__container {
   margin: 0 auto;
   display: flex;
   flex-direction: column;
   align-items: center;
 }
 
 .graph__nodes { 
    font: 14px sans-serif;
    pointer-events: none;
    text-anchor: middle; 
  }

.graph__edges {
  fill: none;
  stroke: #c4c4c4;
  stroke-width: 1.5px;
}

.panel__container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: solid 1px grey;
  padding: 10px;
  border-radius: 20px;
  width: 200px;
  margin: 0px 10px;
}

.panel__container_edges {
  width: 300px;
}

.panel__container_paths {
  width: 300px;
  margin: 0;
  margin-top: 10px;
}

.panel__title {
  margin: 5px 0px;
  font-weight: 700;
  border-bottom: 1px solid black;
  width: 100%;
  text-align: left;
}

.panel__subtitle {
  margin: 2px 0px;
  font-size: 14px;
}

.panel__row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin: 2px 0px;
}

.list__container {
  width: 100%;
}

.node__item {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: start;
  width: 100%;
  font-size: 14px;
}

.node__index {
  margin: 0;
  font-weight: bold;
  width: 25px;
}

.node__id {
  margin: 0px 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 150px;
}

.edge__id {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-between;
  margin: 0px 5px;
}

.edge__source {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100px;
  max-width: 90px;
  border: solid 1px black;
  border-radius: 5px;
  padding: 0 5px;
  margin: 0px 4px;
}

.button {
  cursor: pointer;
  padding: 3px;
  margin: 2px 0px;
  margin-left: auto;
  width: 20px;
  height: 20px;
  border-radius: 5px;
}

.arrow {
  margin: 0 5px;
  font-size: 16px;
  line-height: 30px;
}

.button_delete:hover {
  background-color: rgb(255, 140, 140);
}

.button_add:hover {
  background-color: rgb(155, 218, 153);
}

.button_find:hover {
  background-color: rgb(255, 232, 169);
}

select {
  max-width: 120px;
  width: 120px;
}

</style>
