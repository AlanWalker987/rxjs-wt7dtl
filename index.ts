import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ajax } from 'rxjs/ajax';

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

/* Subject vs BehaviourSubject */

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
