import CachedBoard from '../logics/CachedBoard';
import classic from '../themes/classic';
import mixed from '../themes/mixed';

const Dqwixx = { Board: CachedBoard, classic, mixed };
(<any>window).Dqwixx = Dqwixx;
