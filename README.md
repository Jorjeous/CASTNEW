<img src="https://user-images.githubusercontent.com/12534576/192582340-4c9e4401-1fe6-4dbb-95bb-fdbba5493f61.png"/>


# Label Studio Setup for CAST 

This guide provides a step-by-step process to set up Label Studio (LS).

## Steps for Setting Up

1. **Clone the Repository:**
   - Clone the repository using the provided link, http or ssh - at your discretion:
     ```bash
     git clone "https://github.com/Jorjeous/CAST.git"      
     cd cast
     ```

     ```bash
     git clone ssh://git@github.com:Jorjeous/CAST.git
     cd cast
     ```

2. **Optional: Create a Virtual Environment:**
   - It's recommended to create a virtual environment for Python:
     ```bash
     python3 -m venv .cast
     source .cast/bin/activate
     ```

3. **Install Dependencies:**
   - Install the necessary dependencies for Label Studio:
     ```bash
     pip install -e .
     ```

4. **Prepare Application:**
   - Collect static files and migrate the database:
     ```bash
     python label_studio/manage.py collectstatic
     python label_studio/manage.py migrate
     ```

5. **Run the Application:**
   - Start the Label Studio application:
     ```bash
     python label_studio/manage.py runserver
     ```

After completing these steps, you should be able to access Label Studio through your web browser. 
Usually at http://127.0.0.1:8080. (But terminal could provide another port)





# Navigation through Label Studio Application

This guide will walk you through using Label Studio for audio labeling.

## Getting Started

1. **Login or Sign Up:**
   - Open Label Studio by going to `127.0.0.1:<yourport>`. You'll be greeted with a login/sign-in window.
   - If it's your first time, click on 'Sign in' and create an account using any valid email address (it must pass a sanity check, e.g., name@provider.com).
   - The password should be between 8 to 12 symbols.
   - Remember to uncheck the box for "latest news".

   ![Login or Sign Up](https://github.com/Jorjeous/CAST/blob/master/images/screenshots/logsign.png?ref_type=heads)

2. **Creating a New Project:**
   - Once logged in, you'll see the project page. If this is your first visit, you probably won't have any projects yet.
   - Click on the 'Create Project' button to start a new project.

   ![Create New Project](https://github.com/Jorjeous/CAST/blob/master/images/screenshots/createproj.png?ref_type=heads)

3. **Data Import:**
   - Navigate to the 'Data Import' button (top middle of the screen).
   - You'll be asked to upload files. For convenience, provide a NeMo JSON manifest containing strings in the NeMo format where `audio_filepath` and `text` are mandatory.

   It is improbable, but in case your manifest consists of only one line - copy it to make at least two, like in example below. 

     Example:
     ```
     {"audio_filepath": "/home/user/CAST/audiofile1.wav", "duration": 2.85, "text": "sample text"}
     {"audio_filepath": "/home/user/CAST/audiofile2.wav", "duration": 3.10, "text": "another sample text"}
     ```
   - Audios and manifest will be loaded into the app.

   ![Data Import](https://github.com/Jorjeous/CAST/blob/master/images/screenshots/importOK.png?ref_type=heads)

4. **Labeling Setup:**
   - Click on 'Labeling Setup' (top-right) and then navigate to 'Audio/Speech Processing' (yellow).

   ![Labeling Setup](https://github.com/Jorjeous/CAST/blob/master/images/screenshots/labeling%20setup.png?ref_type=heads)

   - Select the 'ASR + Ground Truth + Model Prediction "[NeMo]"' or 'ASR + Ground Truth "[NeMo]"' template, highlighted in blue, and then click 'Save'. You'll be automatically navigated to the current project.

   ![NeMo Template](https://github.com/Jorjeous/CAST/blob/master/images/screenshots/Browse%20templates.png?ref_type=heads)

   - You can also specify which fields from the manifest will match the fields in the template. Click on "code" (top-middle).

   - The corresponding colors (green, yellow) are related fields. In this example, **$text** corresponds to the ground truth. In the manifest, this field is also called text. The same works for "**$pred_text**". You can change value to your own one. **Do not change "names="**

   ![Template Ground](https://github.com/Jorjeous/CAST/blob/master/images/screenshots/Template_Model_Ground.png?ref_type=heads)

5. **Working on Tasks:**
   - On the project page, you can choose which task to annotate today or click on 'Label All Tasks'.
   - There is also the possibility to filter and sort tasks.

   ![Tasks and Filters](https://github.com/Jorjeous/CAST/blob/master/images/screenshots/tasksandfilters.png?ref_type=heads)

   - If desired, you can integrate machine learning (ML) to perform inference during task annotation. For more details, please refer to: [ML backend](https://github.com/Jorjeous/CAST) (Not avaible for now)
   

6. **Labeling Interface:**
   - The "Copy Above" inserts the text from field above into Your transctiption field.
   - The audio player is interactive, allowing you to play from a specific point, repeat parts of the audio, and adjust the speed.
   - To submit your transcription, click 'Submit'. If you wish to skip the current utterance, click 'Skip'.

   ![Submit and Skip](https://github.com/Jorjeous/CAST/blob/master/images/screenshots/Labeling%20interface%202.png?ref_type=heads)

7. Long Audio Template (preferably working with ML backend):
   - There will be Transcript field that will show all utterances, for comfortable navigation you can use the play button on the left side of utterance.
   - Ground Truth will contain text from the "text" field in manifest
   - Asr Transcript will contain predicted by model text. For you convenience while playing current utterance will be highlighted in Asr Transcript. Also text will be scrolled up to current position. To stop the scrolling you should pause the audio. 

7. **Exporting Results:**
   - Once you're done with the tasks, you can export the results of your work.
   - Click 'Export', choose the format (likely 'ASR Manifest'), and then click 'Export'.

   ![Exporting Results](https://github.com/Jorjeous/CAST/blob/master/images/screenshots/exporting.png?ref_type=heads)



#### Congratulations on completing your tasks in CAST project (LS based)!
___
___
___




![GitHub](https://img.shields.io/github/license/heartexlabs/label-studio?logo=heartex) ![label-studio:build](https://github.com/heartexlabs/label-studio/workflows/label-studio:build/badge.svg) ![GitHub release](https://img.shields.io/github/v/release/heartexlabs/label-studio?include_prereleases)

[Website](https://labelstud.io/) • [Docs](https://labelstud.io/guide/) • [Twitter](https://twitter.com/labelstudiohq) • [Join Slack Community <img src="https://app.heartex.ai/docs/images/slack-mini.png" width="18px"/>](https://slack.labelstud.io/?source=github-1)


## What is Label Studio?

<!-- <a href="https://labelstud.io/blog/release-130.html"><img src="https://github.com/heartexlabs/label-studio/raw/master/docs/themes/htx/source/images/release-130/LS-Hits-v1.3.png" align="right" /></a> -->

Label Studio is an open source data labeling tool. It lets you label data types like audio, text, images, videos, and time series with a simple and straightforward UI and export to various model formats. It can be used to prepare raw data or improve existing training data to get more accurate ML models.

- [Try out Label Studio](#try-out-label-studio)
- [What you get from Label Studio](#what-you-get-from-label-studio)
- [Included templates for labeling data in Label Studio](#included-templates-for-labeling-data-in-label-studio)
- [Set up machine learning models with Label Studio](#set-up-machine-learning-models-with-Label-Studio)
- [Integrate Label Studio with your existing tools](#integrate-label-studio-with-your-existing-tools)

![Gif of Label Studio annotating different types of data](https://raw.githubusercontent.com/heartexlabs/label-studio/master/images/annotation_examples.gif)

Have a custom dataset? You can customize Label Studio to fit your needs. Read an [introductory blog post](https://towardsdatascience.com/introducing-label-studio-a-swiss-army-knife-of-data-labeling-140c1be92881) to learn more. 

## Try out Label Studio

Install Label Studio locally, or deploy it in a cloud instance. [Or, sign up for a free trial of our Enterprise edition.](https://heartex.com/free-trial).

- [Install locally with Docker](#install-locally-with-docker)
- [Run with Docker Compose (Label Studio + Nginx + PostgreSQL)](#run-with-docker-compose)
- [Install locally with pip](#install-locally-with-pip)
- [Install locally with Anaconda](#install-locally-with-anaconda)
- [Install for local development](#install-for-local-development)
- [Deploy in a cloud instance](#deploy-in-a-cloud-instance)

### Install locally with Docker
Official Label Studio docker image is [here](https://hub.docker.com/r/heartexlabs/label-studio) and it can be downloaded with `docker pull`. 
Run Label Studio in a Docker container and access it at `http://localhost:8080`.


```bash
docker pull heartexlabs/label-studio:latest
docker run -it -p 8080:8080 -v $(pwd)/mydata:/label-studio/data heartexlabs/label-studio:latest
```
You can find all the generated assets, including SQLite3 database storage `label_studio.sqlite3` and uploaded files, in the `./mydata` directory.

#### Override default Docker install
You can override the default launch command by appending the new arguments:
```bash
docker run -it -p 8080:8080 -v $(pwd)/mydata:/label-studio/data heartexlabs/label-studio:latest label-studio --log-level DEBUG
```

#### Build a local image with Docker
If you want to build a local image, run:
```bash
docker build -t heartexlabs/label-studio:latest .
```

### Run with Docker Compose
Docker Compose script provides production-ready stack consisting of the following components:

- Label Studio
- [Nginx](https://www.nginx.com/) - proxy web server used to load various static data, including uploaded audio, images, etc.
- [PostgreSQL](https://www.postgresql.org/) - production-ready database that replaces less performant SQLite3.

To start using the app from `http://localhost` run this command:
```bash
docker-compose up
```

### Run with Docker Compose + MinIO
You can also run it with an additional MinIO server for local S3 storage. This is particularly useful when you want to 
test the behavior with S3 storage on your local system. To start Label Studio in this way, you need to run the following command:
````bash
# Add sudo on Linux if you are not a member of the docker group
docker compose -f docker-compose.yml -f docker-compose.minio.yml up -d
````
If you do not have a static IP address, you must create an entry in your hosts file so that both Label Studio and your 
browser can access the MinIO server. For more detailed instructions, please refer to [our guide on storing data](docs/source/guide/storedata.md).


### Install locally with pip

```bash
# Requires Python >=3.8
pip install label-studio

# Start the server at http://localhost:8080
label-studio
```

### Install locally with Anaconda

```bash
conda create --name label-studio
conda activate label-studio
conda install psycopg2
pip install label-studio
```

### Install for local development

You can run the latest Label Studio version locally without installing the package with pip. 

```bash
# Install all package dependencies
pip install -e .
# Run database migrations
python label_studio/manage.py migrate
python label_studio/manage.py collectstatic
# Start the server in development mode at http://localhost:8080
python label_studio/manage.py runserver
```

### Deploy in a cloud instance

You can deploy Label Studio with one click in Heroku, Microsoft Azure, or Google Cloud Platform: 

[<img src="https://www.herokucdn.com/deploy/button.svg" height="30px">](https://heroku.com/deploy?template=https://github.com/heartexlabs/label-studio/tree/heroku-persistent-pg)
[<img src="https://aka.ms/deploytoazurebutton" height="30px">](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Fheartexlabs%2Flabel-studio%2Fmaster%2Fazuredeploy.json)
[<img src="https://deploy.cloud.run/button.svg" height="30px">](https://deploy.cloud.run)


#### Apply frontend changes

The frontend part of Label Studio app lies in the `frontend/` folder and written in React JSX. In case you've made some changes there, the following commands should be run before building / starting the instance:

```
cd label_studio/frontend/
yarn install --frozen-lockfile
npx webpack
cd ../..
python label_studio/manage.py collectstatic --no-input
```

### Troubleshoot installation
If you see any errors during installation, try to rerun the installation

```bash
pip install --ignore-installed label-studio
```

#### Install dependencies on Windows 
To run Label Studio on Windows, download and install the following wheel packages from [Gohlke builds](https://www.lfd.uci.edu/~gohlke/pythonlibs) to ensure you're using the correct version of Python:
- [lxml](https://www.lfd.uci.edu/~gohlke/pythonlibs/#lxml)

```bash
# Upgrade pip 
pip install -U pip

# If you're running Win64 with Python 3.8, install the packages downloaded from Gohlke:
pip install lxml‑4.5.0‑cp38‑cp38‑win_amd64.whl

# Install label studio
pip install label-studio
```

### Run test suite
To add the tests' dependencies to your local install:

```bash
pip install -r deploy/requirements-test.txt
```

Alternatively, it is possible to run the unit tests from a Docker container in which the test dependencies are installed:


```bash
make build-testing-image
make docker-testing-shell
```

In either case, to run the unit tests:

```bash
cd label_studio

# sqlite3
DJANGO_DB=sqlite DJANGO_SETTINGS_MODULE=core.settings.label_studio pytest -vv

# postgres (assumes default postgres user,db,pass. Will not work in Docker
# testing container without additional configuration)
DJANGO_DB=default DJANGO_SETTINGS_MODULE=core.settings.label_studio pytest -vv
```


## What you get from Label Studio

![Screenshot of Label Studio data manager grid view with images](https://raw.githubusercontent.com/heartexlabs/label-studio/master/images/labelstudio-ui.gif)

- **Multi-user labeling** sign up and login, when you create an annotation it's tied to your account.
- **Multiple projects** to work on all your datasets in one instance.
- **Streamlined design** helps you focus on your task, not how to use the software.
- **Configurable label formats** let you customize the visual interface to meet your specific labeling needs.
- **Support for multiple data types** including images, audio, text, HTML, time-series, and video. 
- **Import from files or from cloud storage** in Amazon AWS S3, Google Cloud Storage, or JSON, CSV, TSV, RAR, and ZIP archives. 
- **Integration with machine learning models** so that you can visualize and compare predictions from different models and perform pre-labeling.
- **Embed it in your data pipeline** REST API makes it easy to make it a part of your pipeline

## Included templates for labeling data in Label Studio 

Label Studio includes a variety of templates to help you label your data, or you can create your own using specifically designed configuration language. The most common templates and use cases for labeling include the following cases:

<img src="https://raw.githubusercontent.com/heartexlabs/label-studio/master/images/templates-categories.jpg" />

## Set up machine learning models with Label Studio

Connect your favorite machine learning model using the Label Studio Machine Learning SDK. Follow these steps:

1. Start your own machine learning backend server. See [more detailed instructions](https://github.com/heartexlabs/label-studio-ml-backend).
2. Connect Label Studio to the server on the model page found in project settings.

This lets you:

- **Pre-label** your data using model predictions. 
- Do **online learning** and retrain your model while new annotations are being created. 
- Do **active learning** by labeling only the most complex examples in your data.

## Integrate Label Studio with your existing tools

You can use Label Studio as an independent part of your machine learning workflow or integrate the frontend or backend into your existing tools.  

* Use the [Label Studio Frontend](https://github.com/heartexlabs/label-studio-frontend) as a separate React library. See more in the [Frontend Library documentation](https://labelstud.io/guide/frontend.html). 

## Ecosystem

| Project | Description |
|-|-|
| label-studio | Server, distributed as a pip package |
| [label-studio-frontend](https://github.com/heartexlabs/label-studio-frontend) | React and JavaScript frontend and can run standalone in a web browser or be embedded into your application. |  
| [data-manager](https://github.com/heartexlabs/dm2) | React and JavaScript frontend for managing data. Includes the Label Studio Frontend. Relies on the label-studio server or a custom backend with the expected API methods. | 
| [label-studio-converter](https://github.com/heartexlabs/label-studio-converter) | Encode labels in the format of your favorite machine learning library | 
| [label-studio-transformers](https://github.com/heartexlabs/label-studio-transformers) | Transformers library connected and configured for use with Label Studio |


## Roadmap

Want to use **The Coolest Feature X** but Label Studio doesn't support it? Check out [our public roadmap](roadmap.md)!

## Citation

```tex
@misc{Label Studio,
  title={{Label Studio}: Data labeling software},
  url={https://github.com/heartexlabs/label-studio},
  note={Open source software available from https://github.com/heartexlabs/label-studio},
  author={
    Maxim Tkachenko and
    Mikhail Malyuk and
    Andrey Holmanyuk and
    Nikolai Liubimov},
  year={2020-2022},
}
```

## License

This software is licensed under the [Apache 2.0 LICENSE](/LICENSE) © [Heartex](https://www.heartex.com/). 2020-2022

<img src="https://user-images.githubusercontent.com/12534576/192582529-cf628f58-abc5-479b-a0d4-8a3542a4b35e.png" title="Hey everyone!" width="180" />
