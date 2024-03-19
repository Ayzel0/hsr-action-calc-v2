import traceData from '../../../data/traces.json';
import { ITrace, ITraceData } from '.';

interface ITraceNode {
  unlocked: boolean;
  id: string;
  unlockRequirement: string;
  traceLevel: string;
  effect?: string;
  scalingStat?: string;
  scalingValue?: string;
  nextObjects?: ITraceNode[];
}

// constructs a trace tree based on character ID, which can then be used by that character
class TraceNode implements ITraceNode {
  public id: string;
  public unlockRequirement: string;
  public traceLevel: string;
  public effect?: string | undefined;
  public scalingStat?: string | undefined;
  public scalingValue?: string | undefined;
  public nextObjects?: ITraceNode[] | undefined;
  constructor (
    public unlocked: boolean = true,
  ) {
    const typedtraceData: ITraceData = traceData as ITraceData;
  }
}

export { TraceNode };