import {Observable,pipe,of,from,fromEvent,fromEventPattern,empty,never,throwError,interval,timer, concat} from 'rxjs';
import { map,take,takeLast,last,startWith,merge,combineLatest,zip,withLatestFrom,scan, buffer, bufferTime,bufferCount,delay, delayWhen} from 'rxjs/operators';
import producter from './Producter';
const observer = {
  next: function(value) {
    console.log(value);
  },
  complete: function() {
    console.log('complete!');
  },
  error: function(error) {
    console.log(`throw error ${error}`);
  }
};
const observable1 = Observable.create(function(observer) {
  observer.next('create1');
  observable.next('create2');
});

const observable2 = of(11, 22, 33);

const observable3 = from(['string', 22, '30', 'abc']); //String、Array、Set、WeakSet、Iterator、Promise

/* 
const observable4 = from(new Promise((resolve,reject)=>{
  setTimeout(() => {
    console.log("from")
  }, 1000);
})); 
*/

/* const observable5 = fromEvent(document.body,"click"); */

/* 
const observable6 = fromEventPattern(
  producter.addListener.bind(producter), 
  producter.removeListener.bind(producter)
);
observable6.subscribe(console.log)
producter.notify('fromEventPattern1');
*/

const observable7 = empty();
const observable8 = never();
const observable9 = throwError();
const observable10 = interval(1000).pipe(
  map(val => val + 2),
  take(2)
);

const observable11 = interval(1000).pipe(
  take(5),
  takeLast(2)
)

const observable12 = interval(300).pipe(
  take(5),
  last()
)

const observable13 = interval(300).pipe(
  take(5),
  takeLast(1)
)
const observable14 = concat(observable12,observable13);

const observable15 = interval(1000).pipe(
  take(3),
  startWith(1,2,3)
)

/**
 * -----0-----1-----2-----3-----4
 * ----------0----------1
 * 按照弹珠图的顺序输出 0012134
 */
const observable16 = interval(500).pipe(
  take(5),
  merge(interval(1000).pipe(take(2)))
)


/**
 * ---0---1---2  (300 3)
 * -----0-----1-----2-----3-----4 (500,6)
 */
/**
 *   第一个送出了0，但此时第二个并没有送出，所以不会执行callback
 *   第二个送出了0，此时第一个值为0，所以x+y = 0
 *   此时第一个送出了1，第二个值为0，所以x+y = 1
 *   此时第二个送出了1，第一个值为1，所以x+y = 2
 *   此时第一个送出了2，第二个值为1，所以x+y = 3
 *   此时第二个送出了2，第一个值为2，所以x+y = 4
 *   此时第二个送出了3，第一个值为2，所以x+y = 5
 *   此时第二个送出了4，第一个值为2，所以x+y = 6
 */
const observable17 = interval(300).pipe(
  take(2),
  combineLatest(interval(500).pipe(take(5)),function(x,y){
    return x+y;
  })
)

/**
 * --0--1--2
 * ----0----1----2----3----4----5
 */
/**
 * 第一个送出0，第二个没有值，不执行callback
 * 第二个送出1，第一个送出0，x+y = 0
 * 第一个送出1，第二个没有值，不执行callback
 * 第一个送出2，第二个没有值，不执行callback
 * 第二个送出1，第二个送出1，x+y = 2
 * 
 */
const observable18 = interval(300).pipe(
  take(3),
  zip(interval(500).pipe(
    take(6)
  ),(x,y)=>{
    return x+y;
  })
)
/**
 * --0--1--2--3--4
 * ----0----1----2
 */
/**
 * 第一个 0 ，第二个没有送出值，不执行callback
 * 第一个 1 ，第二个 0，x+y = 1
 * 第一个 2 ，第二个 0，x+y = 2
 * 第一个 3 ，第二个 1，x+y = 4
 * 第一个 4， 第二个 2，x+y = 6
 */
const observable19 = interval(300).pipe(
  take(5),
  withLatestFrom(interval(500).pipe(
    take(3)
  ),function(x,y){
    return x+y;
  })
)
/**
 * ---0---1---2---3
 * x + y = value
 * 0   0    0
 * 0   1    1
 * 1   2    3
 * 3   3    6
 */
const observable20 = interval(300).pipe(
  take(4),
  scan((x,y)=>{
    return x+y;
  },0)
)
/**
 * -0-1-2-3-4-5-6-7-8-9-10-11-12-13-14-15-16-17-18
 * ----0----1----2----3----4----5----6----7
 * 
 *[0,1]
 *[2,3]
 *[4,5,6]
 *[7,8,9]
 */
const observable21 = interval(200).pipe(
  buffer(interval(500))
)

/**
 * --0--1--2--4--5--6--7--8
 * ---------0---------1---------2
 */
const observable22 = interval(300).pipe(
  bufferTime(1000)
)

/**
 * --0--1--2--4--5--6--7--8
 * [0,1]
 * [2,3]
 * [4,5]
 */
const observable23 = interval(300).pipe(
  bufferCount(2)
)

/**
 * --0--1--2--3--4 转换前
 * -----------0--1--2--3--4 转换后
 */
const observable24 = interval(300).pipe(
  take(5),
  delay(1000)
)
/**
 * --0--1--2--3--4
 * --0---1----2-----3------4
 */
const observable25 = interval(300).pipe(
  take(5)
)


observable25.subscribe(observer);



/**
 * ---------0---------1---------2
 * -------------------0---------1---------2
 */






















