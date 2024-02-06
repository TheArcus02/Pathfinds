export interface INode {
  col: number;
  row: number;
  distance: number;
  weight: number;
  heuristic: number;
  isVisited: boolean;
  whenVisited: number;
  previousNode: INode | null;
  isFinish: boolean;
  isStart: boolean;
  isWall: boolean;
  isPath: boolean;
  foundBy?: ColAndRow;
}

export type ColAndRow = Pick<INode, 'col' | 'row'>;

export interface DraggableNode {
  col: number;
  row: number;
  prevPos: {
    col: number,
    row: number,
  };
}

export interface NodesState {
  nodes: INode[][];
  startNode: ColAndRow;
  endNode: ColAndRow;
}

export type DraggableElements = 'startNode' | 'endNode';
export type Algorithms = 'dijkstra' | 'bfs' | 'astar' | 'dfs';
export type Tools = 'Walls' | 'Weight' | 'Eraser';
