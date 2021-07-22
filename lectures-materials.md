---
layout: default
title: Lectures and Class Material
description: Links to the pre-recorded lectures and material
---

#  Lectures and Class Material

**Lecture material:** [Link to the parent GitHub Repository](https://github.com/neurodatascience/course-materials-2021).

**Back to home** [QLS612 website](https://neurodatascience.github.io/QLS612-Overview/)

**Slack workspace** [QLS612 slack](https://qls612-bhs.slack.com)

___

## 1. Reproducibility in Life Science
**Instructor:** [JB Poline](mailto:jean-baptiste.poline@mcgill.ca)

**Objectives**

With this lecture, you will get a general introduction to reproducible - or irreproducible - life sciences. Specifically, you will

* learn what is meant by reproducibility of research results in the life sciences
* undertand the main causes for irreproducible results
* learn the possible collective and individual actions for curbing irreproducibility

**Material:** [GitHub Link](https://github.com/neurodatascience/course-materials-2021/tree/master/lectures/26-July/01-reproducibility-in-life-sciences)

**Pre-recorded lecture video:** [YouTube Link](https://www.youtube.com/watch?v=US80s7W4s6o)

**Self-assessment quiz**

See if you can easily answer this 
- Is the term “replicability” generally applied to obtaining the same results with another (new) dataset ?
- Is the root cause of irreproducibility the publication incentive ?
- What is a similar result with the same methodology or pipeline but different data ?

___

## 2. Introduction to the Terminal and Bash
**Instructor:** Sebastian Urchs


**Objectives** 

To follow most of the other modules you will have to have some basic understanding of the command line.
In this module we'll take a look at the the BourneAgainSHell (BASH), 
the default command line in most Linux systems. 
You will learn how to:

* move around on your computer with the command line, create and open directories and files
* find things with the command line (files and programs, PATH variables)
* run useful command line programs and find help (find, grep, ls, and man / documentation)

**Materials**: 
- you can find [the PDF of the slides here](https://github.com/neurodatascience/course-materials-2021/raw/master/lectures/26-July/02-intro-to-shell/shell-course.zip)
- please download and extract into your home directory [these example files](https://github.com/neurodatascience/course-materials-2021/raw/master/lectures/26-July/02-intro-to-shell/introduction-to-shell.pdf)

**Pre-recorded lecture video**: Is [available on YouTube](https://youtu.be/Sd10Wo5LQls).

**Self-assessment quiz**

This module is a requirement for many of the other modules so you should take it. 
If you are looking for answers to some of the following questions, 
then this course will be useful to you:

- What is a command line shell
- How would you copy thousands of files with file names starting with `"my_good_file..."` to a different directory on your computer?
- Among thousands of files and directories you know there is one where you wrote down `"location of my thesis backup"`. 
  How do you find this file?
- What is an environment variable and how can you change it?

___

## 3. Introduction to Git and GitHub
**Instructor:** Kendra Oudyk

**Pre-requisite modules:** (2) Intro to Terminal/Bash.

**Objectives** 

Git and GitHub are key tools for doing version control in both academia and industry. These tools can help students do more effient, open, and reproducible research. Further, knowing these tools can help prepare students for careers in academia and industry. In this lecture, students will learn

* What is version control and why has it become so important in science and industry;
* How to track and share their own work using Git and GitHub; and
* How to collaborate and contribute to open projects using Git and GitHub.

**Materials**: [GitHub repo](https://github.com/koudyk/intro_git_github)

**Pre-recorded lecture:** [YouTube video](https://youtu.be/b0ETTTKfu2Y), [slides](https://github.com/koudyk/intro_git_github/blob/main/pre-recorded_lecture_slides.pdf)

**In-class tutorial:** [installation instructions](https://github.com/koudyk/intro_git_github/blob/main/installation_instructions.md), (content coming soon)

___

## 4. Introduction to Python
**Instructor:** Jacob Sanz-Robinson 

**Objectives**

* This lecture is designed to get students up and running with Python. It is expected that Python 3 (preferably 3.7 or later) is installed, and that the students have some basic previous experience in a scripting language.
* It will guide students through the fundamental syntax, concepts, and data structures required to code in Python 3.
* Topics include: Running your code, commenting, variables, arithmetic, logic, strings, lists, tuples, dictionaries, functions, libraries, if statements, loops, exceptions, and classes.

**Material:** [GitHub Link](https://github.com/neurodatascience/course-materials-2021/tree/master/lectures/27-July/01-intro-to-python)

**Pre-recorded lecture video:** [YouTube Link](https://www.youtube.com/watch?v=ml6VkmtLXpA)

**Self-assessment quiz**

(1) How does the use of a ‘break’ statement alter the flow of a loop in Python?

(2) What happens if you attempt to append new elements to a Tuple?

(3) Without running the code on your machine, what is the printed output when the following code is run?

```python
my_dictionary = {"a" : 1, "b" : {"c" : {"d" : [4,5,6,4]}}, "c" : [1,2,3]}
x = my_dictionary["b"]["c"]["d"].append(my_dictionary["c"][-3])
print(my_dictionary.values())
```

* a) [1, {'c': {'d': [4, 5, 6, 4}}, [1, 2, 3]]
* b) [1, {'c': {'d': [4, 5, 6, 4, 1]}}, [1, 2, 3]]
* c) [1, [4,5,6,4,1], [1,2,3]]
* d) [1, [4,5,6,4], [1,2,3]]

(4)  Without running the code on your machine, which string is returned by my_function when called with the specified parameters?

```python
def my_function(x, y, z):
    result = ""
    if len(z) <= 6 and len(z) > 2:
        result = z[-2] + y
    else:
        result = x + y
    return x + x + result

my_function("111", "abc", "0100")
```

* a) ‘1111110abc’
* b) ‘0abc111111’
* c) ‘111111bca0’
* d) ‘1111111110’

___


## 5. Tools for project management and organization
**Instructor:** Elizabeth DuPre

**Pre-requisite modules:** (4) Intro to Python (optional)

**Objectives**

Project management and data standards are a vital, if underappreciated, point in any data science workflow.
In this lecture, students will learn common project management and data standards for neuroscience,
as well as how they can incorporate these standards into their own research workflows.
Students will leave with:

* An understanding of the importance of standards in creating reproducible results
* An overview of common data standards for neuroscience and tools to interface with them
* Best practice recommendations for incorporating standards into existing workflows

**Materials:** [GitHub Link](https://github.com/neurodatascience/course-materials-2021/tree/master/lectures/27-July/02-standards-for-project-management)

**Pre-recorded lecture video:** [YouTube Link](https://youtu.be/aBMc8bgSK6o)

**Self-assessment quiz:**
- What is the Brain Imaging Data Structure, and how is it used in neuroimaging research?
- When should researchers think about project management in their overall experimental workflow?
- What are the four components of FAIR research?

___

## 6. Numpy, Scipy, and Pandas: The Python Toolbox for Data Analyses
**Instructor:** [Tristan Glatard](mailto:tristan.glatard@concordia.ca)

**Pre-requisite modules:** (4) Intro to Python.

**Objectives**

This lecture will introduce NumPy, Pandas, and SciPy, three of the main libraries in the scientific Python ecosystem.
At the end of the lecture, participants will be able to:

* Manipulate arrays of numbers with NumPy
* Manipulate data frames with Pandas
* Apply numerical methods from the scientific Python ecosystem

**Materials:** [GitHub Link](https://github.com/neurodatascience/course-materials-2021/tree/master/lectures/28-July/01-numpy-scipy-pandas)

**Assigned readings** 

* [A Visual Intro to NumPy and Data Representation](http://jalammar.github.io/visual-numpy) by Jay Alammar, **up to "Transposing and Reshaping**.
* [Pandas DataFrame introduction](https://pandas.pydata.org/docs/getting_started/intro_tutorials/01_table_oriented.html)
* [Pandas read-write tutorial](https://pandas.pydata.org/docs/getting_started/intro_tutorials/02_read_write.html)
* [Scipy introduction](https://docs.scipy.org/doc/scipy/tutorial/general.html)
* [Scipy IO tutorial](https://docs.scipy.org/doc/scipy/tutorial/io.html)

**Self-assessment quiz**

(1) NumPy's main data structure is a Python list

- [ ] True
- [ ] False

(2) Pandas's main data structure is a 2D table

- [ ] True
- [ ] False

(3) A Pandas Series is a one-dimensional array

- [ ] True
- [ ] False

___

## 7. Virtualization of computing environments
**Instructor:** Peer Herholz

**Pre-requisite modules:** (2) Intro to Terminal/Bash, (4) Intro to Python

**Objectives**

* Learn about different virtualization technologies, what they entail and how they work.
* Get first experience with basic utilization.
* Evaluate if, when and how to integrate virtualization into the lifecycle of a project.

**Materials:** [GitHub Link](https://github.com/neurodatascience/course-materials-2021/tree/master/lectures/28-July/02-intro-to-containerization)

**Pre-recorded lecture video:** [YouTube Link](https://www.youtube.com/watch?v=Kzyev8m-Vcg)

___

## 8. High Performance Computing (HPC)
**Instructor:** Darcy Quesnel

**Pre-requisite modules:** (2) Intro to Terminal/Bash.

**Objectives**

* Learn the key facts about High Performance Computing (HPC) and Cloud computing
* Understand the advantages and the constraints of HPC
* Learn the key concepts and practical bash commands to get started on the Compute Canada HPC

**Materials:** [GitHub Link](https://github.com/neurodatascience/course-materials-2021/tree/master/lectures/28-July/03-high-performance-computing)

**Pre-recorded lecture video:** [YouTube Link](https://www.youtube.com/watch?v=5iTgIt_ZSyk)

___

## 9. Introduction to Data Visualization in Python
**Instructor:** Jacob Sanz-Robinson

**Pre-requisite modules:** (4) Intro to Python

**Objectives**

* This module will teach students the basics of data visualization in Python, with the goal of using it as a tool to understand data, and create publication-quality graphics.
* It will guide students through the process of familiarizing themselves with the data, and choosing plots that display the information accurately and clearly.
* It will provide the students with instructions and examples on how to use multiple widely-used plotting libraries in Python (Matplotlib, Seaborn, Plot.ly, Bokeh).

**Materials:** [GitHub Link](https://github.com/neurodatascience/course-materials-2021/tree/master/lectures/29-July/01-data-visualization)

**Pre-recorded lecture video:** [YouTube Link](https://www.youtube.com/watch?v=1kmTpm9W22I&)

**Self-assessment quiz**

(1) If you wanted to create a figure that groups and categorizes the data based on relationships among the variables, which of the following plots would you use? 

* a) Heatmap
* b) Jointplot
* c) Clustermap
* d) Raincloud plot

(2) What is a plausible reason to avoid using a hexplot?

* a) You have a large sample size, so a scatter plot will give the viewer a better idea of the distribution.
* b) They often require being paired with other graphs in jontplots to convey information about the data.
* c) You have a small sample size, so the differences in datapoint density per hexagon are not well represented.
* d) You have a small sample size, so a density plot will work better for the vast majority of bivariate data.

(3) What is an advantage of Perceptually Uniform Colormaps over other colormaps? 

* a) They hide points of high perceptual contrast, making for a better reading experience.
* b) False features are not introduced into the data.
* c) They give each colour equal representation in the colormap, making it more accurate.
* d) They are accessible for people with colorblindness.

___

## 10. Classical statistics pitfalls and remedies.
**Instructor:** [JB Poline](mailto:jean-baptiste.poline@mcgill.ca)

**Objectives**

Most of published results still rely on some statistical inference. With this lecture, you will 

* get a reminder of the classical statistical framework and learn about the issues brought by the use of statistical inference
* learn (or be reminded of) the notion of effect size, power, positive predictive values and the consequences of low powered studies 
* understand the file drawer effect, p-hacking, and know about some solutions.

**Materials:** [GitHub Link](https://github.com/neurodatascience/course-materials-2021/tree/master/lectures/29-July/02-Classical-statistics-pitfalls-and-remedies)

**Pre-recorded lecture video:** [YouTube Link](https://www.youtube.com/watch?v=lRLtWjkBOzQ)

___

## 11. Introduction to Machine Learning part 1: supervised learning
**Instructor:** Nikhil Bhagwat

**Pre-requisite modules:** (4) Intro to Python, (5) Numpy/Scipy/Pandas toolbox.

**Objectives**

* Understand basic concepts in supervised machine-learning
* Implement a typical model validation pipeline with Scikit-learn
* Learn about various model performance scores and their use-cases

**Materials:** [GitHub Link](https://github.com/neurodatascience/course-materials-2021/tree/master/lectures/29-July/11-intro-to-machine-learning-part-1)

**Pre-recorded lecture video:** [YouTube Link](https://www.youtube.com/watch?v=vsp7c-f3cvg)

___

## 12. Introduction to Machine Learning part 2: dimensionality reduction techniques
**Instructor:** Jérôme Dockès

**Pre-requisite modules:** (4) Intro to Python, (5) Numpy/Scipy/Pandas toolbox, (11) ML part 1.

**Objectives**

* Understand the challenges of learning from high-dimensional data
* Learn about tools to mitigate the issue: feature selection and dimensionality reduction
* Train a machine-learning pipeline on fMRI data and evaluate its prediction performance

**Materials:** [GitHub Link](https://github.com/neurodatascience/course-materials-2021/tree/master/lectures/30-July/12-intro-to-machine-learning-part-2/)

**Pre-recorded lecture video:** [YouTube Link](https://www.youtube.com/watch?v=t8D9qwTqEbc)

___

[back](./)
