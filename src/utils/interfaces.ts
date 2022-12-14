export interface INode {
  col: number;
  row: number;
  isStart: boolean;
  isFinish: boolean;
  distance: number;
  heuristic: number;
  isVisited: boolean;
  whenVisited: number;
  isWall: boolean;
  previousNode: INode | null;
  isPath: boolean;
}

export interface DraggableNode {
  col: number;
  row: number;
  prevPos: {
    col: number,
    row: number,
  };
}

export type ColAndRow = Pick<INode, 'col' | 'row'>;
export interface NodesState {
  nodes: INode[][];
  startNode: ColAndRow;
  endNode: ColAndRow;
}

export type DraggableElements = 'startNode' | 'endNode';

export type Algorithms = 'dijkstra' | 'bfs' | 'astar' | 'dfs';
export type Tools = 'Walls' | 'Weight' | 'Eraser';

