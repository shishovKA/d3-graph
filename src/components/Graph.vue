<template>
<div class="main">
  <div class="node__list">
    Nodes:
    <div>
      <input placeholder="enter node name" v-model="newNodeName" v-on:keyup.enter="adNode">
      <button @click="adNode">Add node</button>
    </div>

    <div>
      <div v-for="node in this.nodes"
        :key = node.index
        class="node__item"
      >
        <p class="node__id">id: {{node.id}}</p>
        <p class="node__id">index: {{node.index}}</p>
        <button @click="delNode(node.index)" style="color: red;">Del node</button>
      </div>
    </div>  
      
  </div>

  <div class="node__list">
    Edges:
    <div>
      source:
      <select v-model="source">
        <option v-for="node in this.nodes" :key="node.id">{{node.id}}</option>
      </select>
      target:
      <select v-model="target">
        <option v-for="node in this.nodes" :key="node.id">{{node.id}}</option>
      </select>
      <button @click="adLink">Add edge</button>
    </div>

    <div >
      <div v-for="edge in this.links"
        :key = edge.index
        class="node__item"
      >
        <p class="node__id">index: {{edge.index}}</p>
        <p class="node__id">{{edge.source.id}} → {{edge.target.id}}</p>
        <button @click="delLink(edge.index)" style="color: red;">Del edge</button>
      </div>
    </div> 

    paths:
    <div>
      source:
      <select v-model="pathSource">
        <option v-for="node in this.nodes" :key="node.id">{{node.id}}</option>
      </select>
      target:
      <select v-model="pathTarget">
        <option v-for="node in this.nodes" :key="node.id">{{node.id}}</option>
      </select>
      <button @click="findAllPathes">Find pathes</button>
    </div> 

    <div >
      <div v-for="(path, index) in this.pathes"
        :key = index
        class="node__item"
      >
        <p class="node__id">path: {{path}}</p>
        <button @click="highLightPath(index)" style="color: green;">show</button>
      </div>
    </div> 
      
  </div>

  <div class="graph__container">
    <svg :viewBox="viewBox" :width="this.width" :height="this.height">
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
        <g class="graph__edges" />
        <g class="graph__nodes" />
      </g>
    </svg>
  </div>

</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import * as d3 from "d3";
//import createGraph, { NodeId } from 'ngraph.graph';
//import path from 'ngraph.path';
// @ts-ignore
import Graph from 'node-all-paths';

@Component
export default class GraphDirected extends Vue {
  @Prop() private dataNodes!: any;
  @Prop() private dataEdges!: any;

  newNodeName = '';
  source = '';
  target = '';
  pathSource = '';
  pathTarget = '';
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

  get viewBox() {
    return `0 0 ${this.width} ${this.height}`;
  }

  getNodeById(id: string): number {
    return this.nodes.findIndex((node: any)=> node.id === id);
  }

  mounted() {
    // start data
    this.nodes = this.dataNodes.slice();
    this.links = this.dataEdges.slice();
    // layout
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
    this.link = d3.select(".graph__edges").selectAll(".link")
    // node
    this.node = d3.select(".graph__nodes").selectAll(".node");
    
    this.initForce();
    this.restart();
  }

  initForce() {
    this.simulation = d3.forceSimulation(this.nodes)
        .force("charge", d3.forceManyBody().strength(-200))
        .force("link", d3.forceLink(this.links).id((d: any) => { return d.id; }).distance(100))
        .force("x", d3.forceX(this.width/2))
        .force("y", d3.forceY(this.height/2))
        //.force("center", d3.forceCenter(this.width/2, this.height/2))
        .alphaTarget(1)
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
      .attr("dy", "-0.5em")
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
        source: this.source,
        target: this.target,
      }
      this.links.push(newLink);
      this.newNodeName = '';
      this.restart();
  }

  delNode(index: number) {
    this.nodes.splice(index, 1);
    this.restart();
  }

  delLink(index: number) {
    this.links.splice(index, 1);
    this.restart();
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
    console.log('nodes', this.nodes);
    console.log('links', this.links);
    const graph = new Graph()

    this.nodes.forEach( (node: any) => {
      const name = node.id;
      console.log(name)
      const targets = this.links.filter( (link: any) => {
        return (link.source.id === name)
      });
      console.log('targets', targets)
      const neighbours = targets.reduce((obj: any, link: any) => {
        obj[link.target.id] = 1;
       return obj
      }, {})
      console.log('neighbours',neighbours)
      graph.addNode(name, neighbours);
    })

    this.pathes = graph.path(this.pathSource, this.pathTarget);
    console.log('pathes', this.pathes);
  }

  highLightPath(index: number) {
    this.setCurPath(this.pathes[index]);
    const all = d3.selectAll("line")
    .attr('stroke', (d: any) => { 
      if (this.inPath(d)) return 'green'
      return '#c4c4c4'
    })
  }

  setCurPath(foundPath: any) {
    const lineArr = []
    for (let i=0; i<foundPath.length-1; i++) {
      const line = {
        source: this.getNodeById(foundPath[i]),
        target: this.getNodeById(foundPath[i+1]),
      }
      lineArr.push(line);
    }
    this.currentPathLines = lineArr;
  }

  inPath(line:any) {
    return this.currentPathLines.find((pathline:any) => {
      console.log('pathline',pathline,'line',line)
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
    justify-content: space-around;
  }

 svg {
   background-color: rgb(248, 248, 248);
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

.node__list {
  border: solid 1px grey;
  padding: 5px;
}
.node__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 300px;
}

.node__id {
  margin: 2px 0;
}

button {
  margin: 0px 10px;
}

select {
  max-width: 70px;
  width: 70px;
}

</style>
