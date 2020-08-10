# How Does Javascript works
## Javascript is a single threaded language that can be non blocking, it has only one call stack.

## What is a program ?
## A program has to do two things 
* ### Allocate Memory
* ### Parse and execute

### Every browser implements a JS engine like V8 in chrome which parse JS code that we write and changes it into the machine executable instruction. 

### JS Engine consists of two parts

* ### Memory Heap : The heap is a region of computer's memory that is not managed automatically, and is not as tightly managed by the CPU. It is a more free-floating region of memory (and is larger). Unlike the stack, the heap does not have size restrictions on variable size (apart from the obvious physical limitations of  computer). Heap memory is slightly slower to be read from and written to, because one has to use pointers to access memory on the heap. Unlike the stack, variables created on the heap are accessible by any function, anywhere in your program. Heap variables are essentially global in scope.

  * ### Memory heap is where memory allocation happens where variables are located
  * ### Memory Leak: A memory leak is a process in which a program or application persistently retains a computer's primary memory. It occurs when the resident memory program does not return or release allocated memory space, even after execution, resulting in slower or unresponsive system behavior.
  
* ### Call Stack : Stack records where in the program we are. It's a special region of computer's memory that stores temporary variables created by each function (including the main() function). The stack is a "LIFO" (last in, first out) data structure, that is managed and optimized by the CPU quite closely. Every time a function declares a new variable, it is "pushed" onto the stack. Then every time a function exits, all of the variables pushed onto the stack by that function, are freed (that is to say, they are deleted). Once a stack variable is freed, that region of memory becomes available for other stack variables.


  * ### Call stack is where JS code is parsed and executed
  * ### Stack overflow: A stack overflow is an undesirable condition in which a particular computer program tries to use more memory space than the call stack has available. In programming, the call stack is a buffer that stores requests that need to be handled.                                                     
## Javascript Run-Time Environment: The JavaScript engine works inside an environment or a big container , which provides additional features like Web APIs(DOM, AJAX, Timeout(setTimeout)), Callback Queue/Task Queue/Event Queue , and Event loop to the scripts which can be used at runtime.These can be utility libraries or APIs which allow communicating with the world surrounding the engine. An example here might be access to information about the web browser in which  script is executed. Or a notification about a mouse click.