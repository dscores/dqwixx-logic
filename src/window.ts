import CachedBoard from './logics/CachedBoard';
import classic from './themes/classic';
import mixedColors from './themes/mixedColors';
import mixedNumbers from './themes/mixedNumbers';

let Dqwixx = { Board: CachedBoard, themes: { classic, mixedColors, mixedNumbers } };
(<any>window).Dqwixx = Dqwixx;
