import PQueue from 'p-queue';

const queue = new PQueue({ concurrency: 1, autoStart: true });
const wait = (action) =>
  setTimeout(action, 100);

function testOut () {
 console.log(this.me);
}
class tClass {
  me = 'me';
  test = () => console.log(this.me);
  testOut = () => testOut.bind(this);
}

console.log('QUEUE TEST');

const action = (i) =>
  () =>
    new Promise(resolve => {
      wait(() => {
        console.log(i);
        resolve(i);
      });

    });

const actionAdd = (i) =>
  () => {
    console.log('size: ' + queue.size);
    return new Promise(resolve => {
      
      wait(() => {
        console.log(i);
        queue.pause();
        resolve(i);
      });
    });
  }

queue.add(action(1)).then(i => console.log('i'+i));
queue.add(action(2));
queue.add(action(3));
queue.add(actionAdd(4));
queue.add(actionAdd(5));
queue.add(action(6));
queue.add(action(7));
queue.start();

const l = new tClass();

l.testOut();