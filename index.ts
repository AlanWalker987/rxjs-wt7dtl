import {
  BehaviorSubject,
  from,
  fromEvent,
  interval,
  Observable,
  of,
  ReplaySubject,
  Subject,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  map,
  reduce,
  scan,
  take,
  takeWhile,
  takeUntil,
  distinctUntilChanged,
  debounceTime,
  pluck,
} from 'rxjs/operators';

// const observer = {
//   next: (value: any) => console.log(value),
//   error: (error: any) => console.log(error),
//   complete: () => console.log('Lets go'),
// };

// const observable = new Observable((subscriber) => {
//   subscriber.next('Hello');
//   subscriber.next('Rxjs World');
//   subscriber.complete();
// });

// observable.subscribe(observer);

/* difference with promise and observable 
const promise = new Promise((resolve) => {
  setTimeout(() => {
    resolve('Promise is working');
  }, 1000);
});

promise.then((res) => console.log(res));

const observable = new Observable((subscribe) => {
  setTimeout(() => {
    subscribe.next('Observable is working');
  }, 1000);
});

observable.subscribe((res) => console.log(res));
*/

/* unicast demo 

const observable = new Observable((sub) =>
  sub.next(Math.floor(Math.random() * 10))
);

// subscriber 1
observable.subscribe((res) => console.log(res));

// subscriber 2
observable.subscribe((res) => console.log(res));

*/

/* multicast demo 

const subject = new Subject();
subject.next(Math.random());

// subscriber 1
subject.subscribe((res) => console.log(res));

// subscriber 2
subject.subscribe((res) => console.log(res));

subject.next(Math.random());
*/

/* subject as consumer

const subjectC = new Subject();
const data = ajax('https://jsonplaceholder.typicode.com/users');

subject.subscribe((res) => console.log(res));
subject.subscribe((res) => console.log(res));

data.subscribe(subjectC); 
*/

/* Subject vs BehaviourSubject 

const subject = new Subject();

// subscriber 1
subject.subscribe((res) => console.log(`subject One ${res}`));
// subscriber 2
subject.subscribe((res) => console.log(`subject Two ${res}`));

subject.next(Math.random());
subject.next(1290);

subject.subscribe((res) => console.log(`subject three ${res}`));

const bSubject = new BehaviorSubject<number>(2022);

bSubject.subscribe((res) => console.log(`BS one ${res}`));
bSubject.next(2023);
bSubject.subscribe((res) => console.log(`BS two ${res}`));
bSubject.next(2024);

*/

/* Replay Subject 

const $message = new ReplaySubject(2);

$message.next('Martin');
$message.next('Rocky');
$message.next('KGF');

$message.subscribe((res) => console.log(`User 1 ${res}`));

$message.next('Red');
$message.next('Gear');

$message.subscribe((res) => console.log(`User 2 ${res}`));
*/

/*** Rxjs Operators */

// of(1, 2, 3, 4, 5)
//   .pipe(map((item) => item * 10))
//   .subscribe(console.log);

/* Rxjs Map 
const keyup$ = fromEvent(document, 'keyup');
const keyCode$ = keyup$.pipe(map((event: any) => event.code));
keyCode$.subscribe(console.log);

*/

/* Rxjs reduce 

const numbers = [1, 2, 3, 4, 5];

const total = numbers.reduce((acc, cur) => {
  console.log({ acc, cur });
  return acc + cur;
}, 0);
// console.log(total);

// from(numbers)
//   .pipe(
//     reduce((acc, cur) => {
//       return acc + cur;
//     }, 0)
//   )
//   .subscribe(console.log);

interval(1000)
  .pipe(
    reduce((acc, cur) => {
      return acc + cur;
    }, 0)
  )
  .subscribe({
    next: console.log,
    complete: () => console.log('complete'),
  });

  */

/* scan 

const user = [
  { name: 'Brain', loggedIn: true, token: null },
  { name: 'Brain', loggedIn: false, token: '13232' },
  { name: 'Brain', loggedIn: true, token: '24734jfs' },
];

const state$ = from(user).pipe(
  scan((acc, cur) => {
    return { ...acc, ...cur };
  }, {})
);

const name$ = state$.pipe(map((item) => item.name));

name$.subscribe(console.log);
*/

/* Rxjs take */

// const numbers$ = of(1, 2, 3, 4, 5);

// numbers$.pipe(take(3)).subscribe({
//   next: console.log,
//   complete: () => console.log('complete'),
// });

// const click$ = fromEvent(document, 'click');

// click$.pipe(map(event => ({
//   x : event.clientX,
//   y : event.clientY
// })),take(1)).subscribe({
//   next : console.log,
//   complete : () => console.log('complete')
// })

// click$
//   .pipe(
//     map((event) => ({
//       x: event.clientX,
//       y: event.clientY,
//     })),
//     takeWhile(({ y }) => y <= 200)
//   )
//   .subscribe({
//     next: console.log,
//     complete: () => console.log('complete'),
//   });

/* takeUntil 

const counter$ = interval(1000);
const click$ = fromEvent(document, 'click');

counter$.pipe(takeUntil(click$)).subscribe({
  next: console.log,
  complete: () => console.log('complete'),
});

*/

/* Rxjs distinctUntilChanged 

const numbers$ = of(1, 2, 2, 3, 3, 3, 4, 4, 5, 6, 6, 7, 8, 8);

numbers$.pipe(distinctUntilChanged()).subscribe({
  next: console.log,
  complete: () => console.log('completed'),
});

*/

/* debouceTime 

const click$ = fromEvent(document, 'click');

const input = document.getElementById('text-input');

const input$ = fromEvent(input, 'keyup');

input$
  .pipe(debounceTime(1000), pluck('target', 'value'), distinctUntilChanged())
  .subscribe(console.log);

  */
