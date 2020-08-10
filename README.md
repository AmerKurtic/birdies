#Birdies
This project is based on the P5 boids project and adds a dynamic layer with django.

##Getting Started
The following guide will help you setup the project on your local (linux) machine for testing.
There is a db.sqlite3 that already has data in it to make life easier for you.

###Prerequisites
**Python 3.7 and dev packages**
```bash
$ sudo apt install python3.7 python3-dev
```

**Pipenv**
 ```bash 
 $ pip install pipenv
 ```
   
### Setting up the project
```bash
$ pipenv --python3.7
$ pipenv install
$ cd server
$ python manage.py migrate
$ python manage.py runserver 
```

# Using the project
# Usage
The project can be viewed by opening the index.html located in the client directory.

## Managing birds
### Adding birds
- Go to http://localhost:8000/admin/ and use the following credentials
    - user: superuser
    - password: supersecret
- Click the add next to 'Birds'
- Fill in the desired stats

### Editing birds
- Go to http://localhost:8000/admin/ and use the following credentials
    - user: superuser
    - password: supersecret
- Click 'Birds'
- Select the bird you want to edit
- Change the desired fields
- Click 'SAVE'