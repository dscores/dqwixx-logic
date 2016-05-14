import CachedBoard from './logics/CachedBoard';
import classic from './themes/classic';
import bigPoints from './themes/bigPoints';
import mixedColors from './themes/mixedColors';
import mixedNumbers from './themes/mixedNumbers';

let Dqwixx = { Board: CachedBoard, themes: { classic, bigPoints, mixedColors, mixedNumbers } };
(<any>window).Dqwixx = Dqwixx;
