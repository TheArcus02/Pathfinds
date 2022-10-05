export interface INode {
  col: number;
  row: number;
  isStart: boolean;
  isFinish: boolean;
  distance: number;
  isVisited: boolean;
  isWall: boolean;
  previousNode: INode | null;
  isPath: boolean;
  hovered: boolean;
}

export interface DraggableNode {
  col: number;
  row: number;
  prevPos: {
    col: number,
    row: number,
  };
}

export type DraggableElements = 'startNode' | 'endNode';
