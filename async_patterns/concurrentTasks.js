const logUpdate = require('log-update')
const { promisify } = require('util');
const toX = () => 'X';

const delay = (seconds) => new Promise(resolve => {

    setTimeout(() => {

        resolve();

    }, seconds * 1000)
})

let tasks = [
    delay(2),
    delay(4),
    delay(5),
    delay(2),
    delay(4),
    delay(5),
    delay(2),
    delay(4),
    delay(5),
    delay(2),
    delay(4),
    delay(5)
]

// class PromiseQueue {
//     constructor(promises = [], concurrentCount = 1) {
//         this.count = concurrentCount;
//         this.total = promises.length;

//         this.todo = promises;
//         console.log(` this.todo ..${this.todo}`)
//         this.running = [];
//         this.completed = [];
//     }

//     get runAnother() {

//         console.log(`

//         running: ${this.running.length}
//         count :${this.count}
//         todo : ${this.todo.length}

//         \n
//         `);
//         return ((this.running.length < this.count) || this.todo.length);
//     }

//     graphTasks() {
//         let { todo, running, completed } = this;
//         logUpdate(`

//             todo: ${todo.map(toX)}
//             running: ${running.map(toX)}
//             completed: ${completed.map(toX)}


//         `)
//     }

//     run() {
//         while (this.runAnother) {

//             var promise = this.todo.shift();

//             promise.then(() => {
//                 this.completed.push(this.running.shift);
//                 this.graphTasks()
//                 this.run()
//             })
//             this.running.push(promise);
//             this.graphTasks()
//         }


//     }
// }

class PromiseQueue {

    constructor(promises = [], concurrentCount = 1) {
        this.concurrent = concurrentCount;
        this.total = promises.length;
        this.todo = promises;
        this.running = [];
        this.complete = [];
    }

    get runAnother() {
        return (this.running.length < this.concurrent) && (this.todo.length);
    }

    graphTasks() {
        var { todo, running, complete } = this;
        logUpdate(`
  
     todo: [${todo.map(toX)}]
     running: [${running.map(toX)}]
     complete: [${complete.map(toX)}]
  
      `);
    }

    run() {
        while (this.runAnother) {
            var promise = this.todo.shift();
            if (promise) {
                promise.then(() => {
                    this.complete.push(this.running.shift());
                    this.graphTasks();
                    this.run();
                })
                this.running.push(promise);
                this.graphTasks();
            }

        }
    }

    // run() {
    //     while (this.runAnother) {
    //         var promise = this.todo.shift();
    //         promise.then(() => {
    //             this.complete.push(this.running.shift());
    //             this.graphTasks();
    //             this.run();
    //         })
    //         this.running.push(promise);
    //         this.graphTasks()
    //     }

    // }






}





let delayQueue = new PromiseQueue(tasks, 2);
delayQueue.run();
