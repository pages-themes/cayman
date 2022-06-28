---
layout: default
title: Lectures and Class Material
description: Links to the pre-recorded lectures and material
---

#  Lectures and Class Material

**Lecture material:** [Link to the parent GitHub Repository](https://github.com/neurodatascience/course-materials-2022).

**Back to home** [QLS612 website](https://neurodatascience.github.io/QLS612-Overview/)

**Slack workspace** [QLS612 slack](https://qls612-bhs.slack.com)

___

## 1. Reproducibility in Life Science
**Instructor:** [JB Poline](mailto:jean-baptiste.poline@mcgill.ca)

**Outline**

With this lecture, you will get a general introduction to reproducible - or irreproducible - life sciences. Specifically, you will

* learn what is meant by reproducibility of research results in the life sciences
* undertand the main causes for irreproducible results
* learn the possible collective and individual actions for curbing irreproducibility

**Material:** [GitHub Link](https://github.com/neurodatascience/course-materials-2022/tree/main/Lectures/01-Intro_to_Reproducibility)

**Pre-recorded lecture video:** [YouTube Link](https://www.youtube.com/watch?v=US80s7W4s6o)

**Slides:** [Slides](https://github.com/neurodatascience/course-materials-2022/blob/main/Lectures/01-Intro_to_Reproducibility/lecture-content/01-Intro_to_Reproducibility.pdf)

**Questions you will be able to answer after taking this module:**

- Is the term “replicability” generally applied to obtaining the same results with another (new) dataset ?
- Is the root cause of irreproducibility the publication incentive ?
- What is a similar result with the same methodology or pipeline but different data ?

___

## 2. Introduction to the Terminal and Bash
**Instructor:** Jacob Sanz-Robinson

**Outline** 

To follow most of the other modules you will have to have some basic understanding of the command line.
In this module we'll take a look at the the BourneAgainSHell (BASH), 
the default command line in most Linux systems. 
You will learn how to:

* move around on your computer with the command line, create and open directories and files
* find things with the command line (files and programs, PATH variables)
* run useful command line programs and find help (find, grep, ls, and man / documentation)

**Materials**: 
- [Github Link](https://github.com/neurodatascience/course-materials-2022/tree/main/Lectures/02-Terminal_and_Bash)

**Pre-recorded lecture video:** [YouTube Link](https://youtu.be/Sd10Wo5LQls)

**Slides:** [Slides](https://github.com/neurodatascience/course-materials-2022/blob/main/Lectures/02-Terminal_and_Bash/lecture-content/02-Terminal_and_Bash.pdf)

**Questions you will be able to answer after taking this module:**

- What is a command line shell
- How would you copy thousands of files with file names starting with `"my_good_file..."` to a different directory on your computer?
- Among thousands of files and directories you know there is one where you wrote down `"location of my thesis backup"`. 
  How do you find this file?
- What is an environment variable and how can you change it?

___

## 3. Introduction to Python
**Instructor:** Jacob Sanz-Robinson and Michelle Wang

**Outline**

* This lecture is designed to get students up and running with Python. It is expected that Python 3 (preferably 3.7 or later) is installed, and that the students have some basic previous experience in a scripting language.
* It will guide students through the fundamental syntax, concepts, and data structures required to code in Python 3.
* Topics include: Running your code, commenting, variables, arithmetic, logic, strings, lists, tuples, dictionaries, functions, libraries, if statements, loops, exceptions, and classes.

**Material:** [GitHub Link](https://github.com/neurodatascience/course-materials-2022/tree/main/Lectures/03-Intro_to_Python)

**Pre-recorded lecture video:** [YouTube Link](https://www.youtube.com/watch?v=ml6VkmtLXpA)

**Slides:** [Slides](https://github.com/neurodatascience/course-materials-2022/tree/main/Lectures/03-Intro_to_Python)

**Questions you will be able to answer after taking this module:**

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

## 4. Numpy, Scipy, and Pandas: The Python Toolbox for Data Analyses
**Instructor:** [Tristan Glatard](mailto:tristan.glatard@concordia.ca)

**Outline**

This lecture will introduce NumPy, Pandas, and SciPy, three of the main libraries in the scientific Python ecosystem.
At the end of the lecture, participants will be able to:

* Manipulate arrays of numbers with NumPy
* Manipulate data frames with Pandas
* Apply numerical methods from the scientific Python ecosystem

**Materials:** [GitHub Link](https://github.com/neurodatascience/course-materials-2022/tree/main/Lectures/04-Python_Toolbox_for_Data_Analysis)

**Pre-recorded lecture video:** [YouTube Link](https://www.youtube.com/channel/UCnz2USVFlvPIi_IKQ9XOJ8g/featured)

**Slides:** [Slides](https://github.com/neurodatascience/course-materials-2022/tree/main/Lectures/04-Python_Toolbox_for_Data_Analysis)

**Assigned readings** 

* [A Visual Intro to NumPy and Data Representation](http://jalammar.github.io/visual-numpy) by Jay Alammar, **up to "Transposing and Reshaping**.
* [Pandas DataFrame introduction](https://pandas.pydata.org/docs/getting_started/intro_tutorials/01_table_oriented.html)
* [Pandas read-write tutorial](https://pandas.pydata.org/docs/getting_started/intro_tutorials/02_read_write.html)
* [Scipy introduction](https://docs.scipy.org/doc/scipy/tutorial/general.html)
* [Scipy IO tutorial](https://docs.scipy.org/doc/scipy/tutorial/io.html)

**Questions you will be able to answer after taking this module:**

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

## 5. Introduction to Git and GitHub
**Instructor:** Kendra Oudyk

**Outline** 

Git and GitHub are key tools for doing version control in both academia and industry. These tools can help students do more effient, open, and reproducible research. Further, knowing these tools can help prepare students for careers in academia and industry. In this lecture, students will learn

* What is version control and why has it become so important in science and industry;
* How to track and share their own work using Git and GitHub; and
* How to collaborate and contribute to open projects using Git and GitHub.

**Materials**: [GitHub Link](https://github.com/neurodatascience/course-materials-2022/tree/main/Lectures/05-Git_GitHub)

**Pre-recorded lecture video:** [YouTube Link](https://youtu.be/b0ETTTKfu2Y)

**Slides:** [Slides](https://github.com/neurodatascience/course-materials-2022/blob/main/Lectures/05-Git_GitHub/lecture-content/05-Git_GitHub.pdf)

**Questions you will be able to answer after taking this module:** 

1.  In a ________ version control system, individuals have the entire repository and its history in their local repository.
  - a) Centralized
  - b) Distributed
2. What is the basic workflow for tracking a change and sharing it on github?
  - a) `git commit`, `git add`, `git push`
  - b) `git pull`, `git add`, `git push`
  - c) `git add`, `git commit`, `git push`
3. How do you start a parallel line of development, in order to do nonlinear version control?
  - a) make a tag
  - b) start a new branch
  - c) create a remote repository
4. How do you make a copy of another GitHub repo on your GitHub account?
  - a) `git clone <repo address>`
  - b) go to the repo's GitHub page and click "fork"
  - c) go to the repo's GitHub page and open an issue to ask for a copy
  - d) go to the repo's GitHub page and do a pull request

___

## 6. Data Preprocessing in Python
**Instructor:** Nadia Blostein

**Outline** 
* Load and examine your data
* Data reformatting
* Data filtering
* Data transforms
* Data visualization
* Examining 2D images

**Materials**: [GitHub Link](https://github.com/neurodatascience/course-materials-2022/tree/main/Lectures/06-Data_Preprocessing_in_Python)

**Pre-recorded lecture video:** [YouTube Link](https://www.youtube.com/channel/UCnz2USVFlvPIi_IKQ9XOJ8g/featured)

**Slides:** [Slides](https://github.com/neurodatascience/course-materials-2022/tree/main/Lectures/06-Data_Preprocessing_in_Python)

**Questions you will be able to answer after taking this module:** 

___

## 7. Introduction to Machine Learning part 1: supervised learning
**Instructor:** Nikhil Bhagwat

**Outline**

* Understand basic concepts in supervised machine-learning
* Implement a typical model validation pipeline with Scikit-learn
* Learn about various model performance scores and their use-cases

**Materials:** [GitHub Link](https://github.com/neurodatascience/course-materials-2022/tree/main/Lectures/07-Machine_Learning_1)

**Pre-recorded lecture video:** [YouTube Link](https://www.youtube.com/watch?v=vsp7c-f3cvg)

**Slides:** [Slides](https://github.com/neurodatascience/course-materials-2022/tree/main/Lectures/07-Machine_Learning_1)

**Questions you will be able to answer after taking this module:**

1. What is linear regression?
2. Can you do multiclass prediction using logistic regression? 
3. What is cross-validation? 
4. Can you tell if the classifier performance is acceptable solely based on its prediction accuracy?

___

## 8. Introduction to Machine Learning part 2: Model selection & validation; dimensionality reduction
**Instructor:** Jérôme Dockès

**Outline**

* Learn how to properly select a machine-learning model, set hyperparameters, and evaluate prediction performance.
* Understand the challenges of learning from high-dimensional data and learn about tools to mitigate the issue.

**Materials:** [GitHub Link](https://github.com/neurodatascience/course-materials-2022/tree/main/Lectures/08-Machine_Learning_2)

**Pre-recorded lecture video:** [YouTube Link](https://www.youtube.com/watch?v=t8D9qwTqEbc)

**Slides:** [Slides](https://github.com/neurodatascience/course-materials-2022/blob/main/Lectures/08-Machine_Learning_2/slides/slides.pdf)

**Questions you will be able to answer after taking this module:**

- I am predicting continuous cognitive scores of 1,000 participants using 20,000
  brain imaging features. I use least-squares regression. What is regularization
  and why do I need it?
- I decide to use ridge regression (l2 regularization). How can I set the
  regularization hyperparameter?
- I also add a dimensionality reduction step to my model: PCA. I do 5-fold
  cross-validation, and I perform a full grid-search, using 3 folds for the
  inner validation loop. I use a grid of 3 options for the number of PCA
  components and 6 options for the ridge hyperparameter. How many times (at
  least) will I need to fit a PCA?

## 9. Introduction to Data Visualization in Python
**Instructor:** Jonathan Armoza

**Outline**

* This module will teach students the basics of data visualization in Python, with the goal of using it as a tool to understand data, and create publication-quality graphics.
* It will guide students through the process of familiarizing themselves with the data, and choosing plots that display the information accurately and clearly.
* It will provide the students with instructions and examples on how to use multiple widely-used plotting libraries in Python (Matplotlib, Seaborn, Plot.ly, Bokeh).

**Materials:** [GitHub Link](https://github.com/neurodatascience/course-materials-2022/tree/main/Lectures/09-Intro_to_Data_Visualization)

**Pre-recorded lecture video:** [YouTube Link](https://www.youtube.com/channel/UCnz2USVFlvPIi_IKQ9XOJ8g/featured)

**Slides:** [Slides](https://github.com/neurodatascience/course-materials-2022/tree/main/Lectures/09-Intro_to_Data_Visualization)

**Questions you will be able to answer after taking this module:**

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

## 10. Virtualization of computing environments
**Instructor:** Sebastian Urchs

**Outline**

* Learn about different virtualization technologies, what they entail and how they work.
* Get first experience with basic utilization.
* Evaluate if, when and how to integrate virtualization into the lifecycle of a project.

**Materials:** [GitHub Link](https://github.com/neurodatascience/course-materials-2022/tree/main/Lectures/10-Containers)

**Pre-recorded lecture video:** [YouTube Link](https://www.youtube.com/channel/UCnz2USVFlvPIi_IKQ9XOJ8g/featured)

**Slides:** [Slides](https://github.com/neurodatascience/course-materials-2022/tree/main/Lectures/10-Containers)

**Questions you will be able to answer after taking this module:** 
(to check your understanding of the pre-recorded materials)
1.  What is virtualization?
  - a) isolating, encapsulating and sharing computing environments
  - b) sharing analysis code
  - c) testing analysis code across different operating systems
  - d) describing a computing environment within a publication
2. What is the “hierarchy” of the 4 levels of virtualization discussed, from lowest (i.e., least like a full operating system) to highest (i.e., most like a full operating system)?
  - a) pip virtualenv, conda, docker, virtual machine
  - b) virtual machine, docker, conda, pip virtual env
  - c) pip virtualenv, docker, conda, virtual machine
  - d) virtual machine, conda, docker, pip virtualenv
3. How can one evaluate the optimal virtualization technique given the project at hand?
  - a) testing different options until it works
  - b) outline required computing environment upon starting the project
  - c) it doesn’t matter, just use the same every time
  - d) start with the highest level and descend until things stop working
4. How can one create computing environments dedicated to specific projects?
  - a) it depends on the operating system 
  - b) exclusively through cloud computing instances
  - c) using the BIOS
  - d) it depends on the virtualization technique

___

## 11. High Performance Computing (HPC)
**Instructor:** Brent McPherson

**Outline**

* Learn the key facts about High Performance Computing (HPC) and Cloud computing
* Understand the advantages and the constraints of HPC
* Learn the key concepts and practical bash commands to get started on the Compute Canada HPC

**Materials:** [GitHub Link](https://github.com/neurodatascience/course-materials-2022/tree/main/Lectures/11-High_Performance_Computing)

**Pre-recorded lecture video:** [YouTube Link](https://www.youtube.com/channel/UCnz2USVFlvPIi_IKQ9XOJ8g/featured)

**Slides:** [Slides](https://github.com/neurodatascience/course-materials-2022/tree/main/Lectures/11-High_Performance_Computing)

**Questions you will be able to answer after taking this module:** 

1.  Choose the area that Advanced Research Computing traditionally does **not** include
  - a) HPC/Clusters
  - b) Research Data Management	
  - c) Cloud Computing
  - d) Video Games
2. Choose all components that are part of an HPC Compute Node
  - a) Processor/Core
  - b) Display/Monitor
  - c) Memory
  - d) Mouse
  - e) Local Disk
3. Choose all ways to access an HPC Cluster
  - a) Secure shell to a Login Node
  - b) Secure shell to a Compute Node
  - c) Secure transfer to a Data Transfer Node
  
___

[back](./)
