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
            refX="22" refY="5"
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
      <select v-model="pathSourceId" @change="findPaths">
        <option :value="node.index" v-for="node in this.nodes" :key="node.index">{{(node.id === '') ? `#${node.index}` : node.id}}</option>
      </select>
      <p class="arrow">→</p>
      <select v-model="pathTargetId" @change="findPaths">
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
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';

import * as d3 from 'd3';

type Path = number[];
interface SimpleLine { source: number; target: number; }

@Component
export default class GraphDirected extends Vue {
  @Prop() private dataNodes!: any;
  @Prop() private dataEdges!: any;

  // interface
  private newNodeName = '';
  private sourceId = 0;
  private targetId = 1;
  private pathSourceId = 0;
  private pathTargetId = 1;
  private pathIndex = -1;
  // layout
  private width = 500;
  private height = 500;
  private nodeStyle = {
    r: 10,
    fill: '#fff',
    stroke: '#000',
    dy: '-1.0em',
  };
  // d3
  private nodes: any = [];
  private links: any = [];
  private simulation: any;
  private link!: any;
  private node!: any;
  // path finder
  private currentPathLines: SimpleLine[] = [];
  private pathes: Path[] = [];

  private mounted() {
    this.initLayout();
    this.initForce();
    this.restart();
    this.findPaths();
  }

  private initLayout() {
    this.nodes = this.dataNodes.slice();
    this.links = this.dataEdges.slice();
    const svg: any = d3.select('svg');
    const g = d3.select('.graph__group');

    const zoomed = ({transform}: any) => {
      g.attr('transform', transform);
    };

    svg.call(d3.zoom()
      .extent([[0, 0], [this.width, this.height]])
      .scaleExtent([0.5, 8])
      .on('zoom', zoomed));

    this.link = d3.select('.graph__edges').selectAll('line');
    this.node = d3.select('.graph__nodes').selectAll('.node');
  }

  private initForce() {
    this.simulation = d3.forceSimulation(this.nodes)
      .force('charge', d3.forceManyBody().strength(-900))
      .force('link', d3.forceLink(this.links).distance(100))
      .force('x', d3.forceX(this.width / 2))
      .force('y', d3.forceY(this.height / 2))
      // .force("center", d3.forceCenter(this.width/2, this.height/2))
      .alphaTarget(0)
      .on('tick', this.ticked);
  }

  private ticked() {
    this.node.attr('transform', (d: any) => 'translate(' + d.x + ',' + d.y + ')' );
    this.link.attr('x1', (d: any) => d.source.x )
      .attr('y1', (d: any) =>  d.source.y )
      .attr('x2', (d: any) =>  d.target.x )
      .attr('y2', (d: any) =>  d.target.y );
  }

  private restart() {
    // Apply the general update pattern to the nodes.
    this.node = this.node.data(this.nodes, (d: any) => d.id );
    this.node.exit().remove();

    this.node = this.node.enter().append('g')
      .attr('class', 'node')
      .merge(this.node);

    this.node.append('circle')
      .attr('r', this.nodeStyle.r)
      .attr('fill', this.nodeStyle.fill)
      .attr('stroke', this.nodeStyle.stroke)
      .merge(this.node);

    this.node.append('text')
      // .attr('dominant-baseline', 'middle')
      .attr('dy', this.nodeStyle.dy)
      .text((d: any) => d.id)
      .merge(this.node);
    
    this.node.append('text')
      .attr('dy', '0.3em')
      .text((d: any) => {
        if (d.hasOwnProperty('index')) { return d.index; }
        return this.nodes.length - 1;
      })
      .merge(this.node);

    // Apply the general update pattern to the links.
    this.link = this.link.data(this.links, (d: any) => {
      return d.source.id + '-' + d.target.id;
      });
    this.link.exit().remove();
    this.link = this.link.enter().append('line')
      .attr('marker-end', 'url(#triangle)')
      .merge(this.link);

    this.updateSimulation();
  }

  private updateSimulation() {
    this.simulation.nodes(this.nodes);
    this.simulation.force('link').links(this.links);
    this.simulation.alpha(1).restart();
  }

  get viewBox() {
    return `0 0 ${this.width} ${this.height}`;
  }

  private adNode() {
    const newNode = {
      id: this.newNodeName,
    };
    this.nodes.push(newNode);
    this.newNodeName = '';
    this.restart();
  }

  private adLink() {
    const newLink = {
      source: this.sourceId,
      target: this.targetId,
    };
    this.links.push(newLink);
    this.restart();
    this.findPaths();
  }

  private delNode(index: number) {
    const actualLinks = this.links.filter((link: any) => {
      return (link.source.index !== index) && (link.target.index !== index);
    });
    this.links = actualLinks;
    this.nodes.splice(index, 1);
    this.nodes.forEach( (node: any, ind: number) => {
      node.index = ind;
    });
    this.restart();
    this.findPaths();
  }

  private delLink(index: number) {
    this.links.splice(index, 1);
    this.restart();
    this.findPaths();
  }

  // my custom func
  private findPaths() {
    this.pathIndex = -1;
    const graph: number[][] = [];

    this.nodes.forEach( (node: any, index: number) => {
      const neighbours: number[] = [];
      this.links.filter( (link: any) => (link.source.index === index))
        .forEach( (link: any) => {
          neighbours.push(link.target.index);
        });
      graph.push(neighbours);
    });

    const pathes: Path[] = [];
    const pathFinder = (source: number, target: number, path: Path) => {
      const hasSource = path.findIndex((node: number) => node === source);
      if (hasSource !== -1) { return; }
      path.push(source);
      if ( source === target ) {
        pathes.push(path);
        return;
      }
      if (graph[source].length === 0) { return; }
      graph[source].forEach ( (newTarget: number) => {
        pathFinder(newTarget, target, path.slice());
      });
    };
    pathFinder(this.pathSourceId, this.pathTargetId, []);
    this.pathes = pathes;
  }

  @Watch('pathIndex')
  private onPathChanged(val: number) {
    if (val !== -1) {
      this.highLightPath(val);
    } else {
      this.highLightPath(-1);
    }
  }

  private highLightPath(index: number) {
    if ( index === -1) {
      const all = d3.selectAll('line')
      .attr('stroke', '#c4c4c4');
    } else {
      this.setCurPath(this.pathes[index]);
      const all = d3.selectAll('line')
      .attr('stroke', (d: any) => {
        if (this.inPath(d)) { return 'green'; }
        return '#c4c4c4';
      });
    }
  }

  private setCurPath(foundPath: Path) {
    const lineArr = [];
    for (let i = 0; i < foundPath.length - 1; i++) {
      const line = {
        source: +foundPath[i],
        target: +foundPath[i + 1],
      };
      lineArr.push(line);
    }
    this.currentPathLines = lineArr;
  }

  private inPath(line: any) {
    return this.currentPathLines.find((pathline: any) => {
        return (pathline.source === line.source.index) && (pathline.target === line.target.index);
      },
    );
  }

}
</script>


<style scoped>

@import './graph.css';

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

</style>
