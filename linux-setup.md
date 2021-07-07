### Bash shell

You already have it!
Depending on which version of Linux you’re running you may need to type `bash` inside the terminal to access it.
To check whether this is necessary, follow these steps:

1. Open a terminal and type `echo $SHELL`.
   If it reads `/bin/bash` then you are all set!
   If not, whenever the instructions read "open a terminal," please assume you are to open a terminal, type `bash`, and the proceed with the instructions as specified.

### Git

You may already have it; try typing `sudo apt-get install git` (Ubuntu, Debian) or `sudo yum install git` (Fedora) inside the terminal.
If you are prompted to install it follow the instructions on-screen to do so.

### VSCode

1. Go to https://code.visualstudio.com/ and click the download button for either the .deb (Ubuntu, Debian) or the .rpm (Fedora, CentOS) file.
1. Double-click the downloaded file to install VSCode.
   (You may be prompted to type your administrator password during the install).

#### VSCode extensions

1. Open the Visual Studio Code application.
1. Press `Ctrl+Shift+P` in the new window that opens and type "Extensions: Install extensions" into the search bar that appears at the top of the screen.
   Select the appropriate entry from the dropdown menu that appears (there should be four entries; simply select the one that reads "Extensions: Install extensions").
1. A new panel should appear on the left-hand side of the screen with a search bar.
   Search for each of the following extensions and press `Install` for the first entry that appears. (The author listed for all of these extensions should be "Microsoft".)
      - Python (n.b., you will need to reload VSCode after installing this)
      - Live Share (n.b., you may need to press "Ctrl/Cmd+Shift+P" and type "install extensions" again after installing this)
      - Live Share Extension Pack
      - Docker

### Python

1. Open a new terminal and type the following lines (separately) into the terminal, pressing `Enter` after each one:

   ``` bash
   wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
   bash Miniconda3-latest-Linux-x86_64.sh
   ```

1. A license agreement will be displayed and the bottom of the terminal will read `--More--`.
   Press `Enter` or the space bar until you are prompted with "Do you accept the license terms? [yes|no]."
   Type `yes` and then press `Enter`
1. The installation script will inform you that it is going to install into a default directory (e.g., `/home/$USER/miniconda3`).
   Leave this default and press `Enter`.
1. When you are asked "Do you wish the installer to initialize Miniconda3 by running conda init? [yes|no]," type `yes` and press `Enter`.
   Exit the terminal once the installation has finished.
1. Re-open a new terminal.
   Type `which python` into the terminal and it should return a path (e.g., `/home/$USER/miniconda3/bin/python`).
   - If you do not see a path like this then please try typing `conda init`, closing your terminal, and repeating this step.
     If your issue is still not resolved skip the following step and contact an instructor on the #help-installation channel of the BHS Slack.
1. Type the following to remove the installation script that was downloaded:

   ``` bash
   rm ./Miniconda3-latest-Linux-x86_64.sh
   ```

#### Python packages

Open a terminal and type the following commands:

``` bash
conda config --append channels conda-forge
conda config --set channel_priority strict
conda install -y flake8 ipython jupyter jupyterlab matplotlib nibabel nilearn numpy pandas scipy seaborn
```

### Docker

1. You will be following different instructions depending on your distro ([Ubuntu](https://docs.docker.com/engine/install/ubuntu/), [Debian](https://docs.docker.com/engine/install/debian/), [Fedora](https://docs.docker.com/engine/install/fedora/), [CentOS](https://docs.docker.com/engine/install/centos/)).
   Make sure to follow the “Install using the repository” method!
1. Once you’ve installed Docker make sure to follow the [post-install instructions](https://docs.docker.com/engine/install/linux-postinstall/) as well.
   You only need to do the “Manage Docker as a non-root user” and “Configure Docker to start on boot” steps.
1. Open a new terminal and type `docker run hello-world`.
   A brief introductory message should be printed to the screen.
