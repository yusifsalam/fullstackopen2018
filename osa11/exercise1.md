# Exercise 11.1: warming up

## The question

````Think about a hypothetical situation where we have an application being worked on by a team of about 6 people. The application is in active development and will be released soon.

Let us assume that the application is coded with some other language than JavaScript/TypeScript, e.g. in Python, Java, or Ruby. You can freely pick the language. This might even be a language you do not know much yourself.

Write a short text, say 200-300 words, where you answer or discuss some of the points below. You can check the length with https://wordcounter.net/. Save your answer to the file named exercise1.md in the root of the repository that you shall create in exercise 11.2.

The points to discuss:

Some common steps in a CI setup include linting, testing, and building. What are the specific tools for taking care of these steps in the ecosystem of the language you picked? You can search for the answers by google.
What alternatives are there to set up the CI besides Jenkins and GitHub Actions? Again, you can ask google!
Would this setup be better in a self-hosted or a cloud-based environment? Why? What information would you need to make that decision?```

````

## The answer

### Problem setting

Let us assume that the application is coded in Python, specifically Python 3. Also, because the course is for web development, we can also assume that Django is used as the framework. Flask would be another alternative for a Python web framework but Django seems more popular with the developer community.

### The setup

Python is a dynamically typed language and is higher level abstraction than, say C++ or Rust. Python is an interpreted language, which means that there is no compilation of code required to run it. Instead, the Python interpeter executes the code directly, going line by line. From the CI/CD perspective this means that no building step is necessary.

Linting in Python is rather limited due to its non-statically typed nature. Code formatter can still be of great help. Depending on the IDE used for writing Python code, this can be a VSCode extension like AutoPEP8 or PyLint with PyCharm IDE.

For testing, Python has a standard unittest library. Pytest library is another option for running tests.

### CI alternatives

There are far too many CI alternatives to list but some of the most prominent ones are Travis and CicleCI. Both have generous free tiers for open source projects or, in the case of Travis, had, since the company behind Travis was acquired by VC and has been reducing free build minutes since then.

### Self-hosted or cloud-based

For a small Python application, cloud-based solutions are clearly superior. This is especially confounded by the fact that there is no build step for Python apps, so the free tiers of cloud-based CI providers can go a long way.
