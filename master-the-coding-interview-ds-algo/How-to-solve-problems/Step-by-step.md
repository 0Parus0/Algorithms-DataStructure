# **Step By Step through a problem**

* ## When the interviewer says the question, write down the key points at the top. ( Sorted array, etc..). Make sure you have all the details. Show how organize you are.

* ## What is the most important value of the problem? Do you have time, and space and memory etc.. What is the main goal

* ## Don't be annoying and ask too many questions.
* ## Start with naive/ brute force approach. First thing that comes into mind. It shows that you are able to think well and critically( you don't need to write this code, just speak about it).

* ## Walk through your approach, comment things and see where you may be able to break things. Any repetition, bottlenecks like O(N^2), or unnecessary work? Did you use all the information the interviewer gave you ? Bottleneck is the part of the code with biggest BigO. Focus on that. Sometimes this occurs with repeated work as well

* ## Before you start coding, wlk through your code and write down the steps you are going to follow.

* ## Modularize your code from the very beginning. Break up your code into beautiful small pieces and add just comments if you need to.

* ## Start actually writing your code now. Keep in mind that the more you prepare and understand what you need to code, the better white board will go. So never start a whiteboard interview not being sure of how things are going to work out. That is a recipe for disaster. Keep in mind: A lot of interviews ask questions that you won't be able to fully answer on time. So think: What can I show in order to show that I can do this and I an better than other coders. Break things up in Functions ( if you can't remember a method, just make up a function and you will at least have it there, Write Something and start with the easy part.)

* ## Think about error checks and how you can break this code. Never make assumptions about the input. Assume people are trying to break your code and that Darth Vader is using your function. How will you safeguard it? Always check for false inputs that you don't want. Here is a trick: Comment in the code, the checks that you want ot do.. write the function, then tell the interviewer that you would write tests now to make yu function fail (but you won't need to actually write the tests).

* ## Don't use bad/confusing names like i and j. Write code that reads well.

* ## Test your code: check for no params, 0 , undefined, null massive arrays, async code, etc ... Ask the interviewer if we can make assumption about the code. Can you make the answer return and error? Poke holes into your solution. Are you repeating yourself? 

* ## Finally talk to the interviewer where you would improve the code. Does it work? are there different approaches? Is it readable? What would you google to improve, How can performance be improved? Possible: Ask the interviewer what was the interesting solution you have seen to this problem?

* ## If your interviewer is happy with the solution, the interviewer usually ends here. It is also common that the interviewer asks you extension questions, such as how you would handle the problem if the whole input is too large, to fit into memory, or if the input arrives as a stream. This is a common follow-up question at Google, where the care a lot about scale, The answer is usually a divide and conquer approach-- perform distributed processing of the data and only read certain chunks of the input from the disk into memory, write the output back to disk and combine them later.