# What is Node.js?

If we speak a broader picture about Nodejs then it is more than "a runtime enviroment of javascript". NodeJs consists these two things :-

- C++
- JavaScript

Now, Nodejs has capabilities to communicate with native machine and that is only possible because of <code>C++</code>. Because we already know that <code>C++</code> is one of the programming language that is close to the hardware. Hence, with these hardware capabilities now <code>JavaScript</code> can make <code>Web servers.</code>

# How Node.js works internally? OR How Node.js execute code?

When Node program runs then two things is happen. First is it creates a <code>main-thread</code> and second is it creates a <code>Thread poll</code> to execute Node program. Let's deep dive into it....

- In Main-thread (Synchronous task)

  - Project Initialize
  - Top level code starts to execute :: Codes that are written in the <code>Global scope</code>.
  - All required modules are loaded
  - Event callback registered

    - Event loop starts (Asynchronous task)
      - Expired timer excution starts
      - I/O polling (CPU intensive task) :: Event loops offloaded to Thread-poll
      - setImmediate callback starts
      - Close callback

- In Thread-poll
  - Any CPU intensive task is going to be execute in the Thread-poll.

#### Note :: Determining between <code>setTimeOut</code> and <code>setImmediate</code> function that which one is going to execute first is Non-deterministic. It is bounded by the performance of the process.

If any <code>setTimeOut</code> or <code>setImmediate</code> function is under the I/O polling system it will not starts executing untill I/O polling is not done.

## Visualize the code :-

```javascript
const fs = require("fs");

setTimeout(() => {
  console.log("Timer-1");
}, 0);

setImmediate(() => {
  console.log("Immediate-1");
});

fs.readFile("sample.txt", "utf-8", () => {
  console.log("I/O polling has been ended.");
  setTimeout(() => {
    console.log("Timer-2");
  }, 0);

  setTimeout(() => {
    console.log("Timer-3");
  }, 5 * 1000);

  setImmediate(() => {
    console.log("Immediate-2");
  });
});

console.log("Top level code is executed!!!");
```

- Outputs ::
  - Top level code is executed!!!
  - Timer-1
  - Immediate-1
  - I/O polling has been ended.
  - Immediate-2
  - Timer-2
  - Timer-3

# Does Node.js is Single threaded or multi-threaded?

Node.js executes code on single thread. It uses Thread-pool(Multiple threads) to executes CPU-Intensive task.
But if we talk about the language which executes code on multiple threads called "Multi-threading Programming language" such as PHP. Yes, PHP is multi-threading and server-side-scripting programming language. Such type of programming language uses a seperate thread to execute their code. This can be an advantage and can be disadvantage. Because, all threads can be busy at a time and because of this reason all the remain task will go into waiting stage.

#### Note :: So, as a Backend developer we have to figure-out that which task we should done on single thread or Multiple threads.

# When Promises are executed?

Whenever event-loop phase transition, Node.js starts executing promises.
