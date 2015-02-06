[![Build Status](https://travis-ci.org/Ecotrust/geosurvey.png?branch=master)](https://travis-ci.org/Ecotrust/geosurvey)
# Setup Local Vagrant Server
```bash
vagrant up
fab vagrant bootstrap
fab vagrant createsuperuser
fab vagrant loaddata
fab vagrant runserver
```

# Setup a Remote Staging/Production Server
## Provision a fresh Server with Chef and Fabric
### Configure server settings
Create a node file with the name scripts/cookbook/node_staging.json from the template in scripts/cookbook/node_staging.json.template.  Set the postgresql password and add your ssh public key to scripts/node_staging.json.  Tested with Ubuntu 12.04 (precise pangolin).

#### Sample config file
```javascript
{
    "user": "www-data",
    "servername": "staging.example.com",
    "dbname": "marine-planner",
    "staticfiles": "/usr/local/apps/marine-planner/mediaroot",
    "mediafiles": "/usr/local/apps/marine-planner/mediaroot",
    "users": [
        {
            "name": "jsmith",
            "key": "ssh-rsa AAAAB3sdkfjhsdkhjfdjkhfffdj.....fhfhfjdjdfhQ== jsmith@machine.local"
        }
    ],
    "postgresql": {
        "password": {
            "postgres": "some random password here"
        }
    },
    "run_list": [
        "marine-planner::default"
    ]
}
```
When first creating a new droplet on digital ocean, you can add ssh keys for users. This will
allows those users to log in as root from there machines with `ssh USERNAME@IP_ADDRESS`.  After the prepare command (see below) runs users will no longer have access to the root login. Instead users will be logged into their own acocunts.  The prepare command creates one or more users with sudo access based on the list of users specified in the json file. If you need to log in as root you will need to reuqest the root password from Digital Ocean. 

### Install Prerequisites and Deploy
These commands install all the prerequisites, including postgresql, python and all the required modules in a virtual environment as well as gunicorn and nginx to serve the static files. Try running with 'root' if your username doens't work.
```bash
fab staging:<username>@<hostname> prepare

# Deploy to staging site (by default uses the staging branch)
fab staging:<username>@<hostname> deploy

# Deploy to live site
fab staging:<username>@<hostname> deploy:master


```
## ElasticSearch
Installation is defined in scripts/cookbooks/app/recipes/default.rb

### Start ElasticSearch
```bash
sudo /etc/init.d/elasticsearch start
```
### Build ElasticSearch Index
```bash
cd /usr/local/apps/geosurvey/server
./manage.py rebuild_index --settings=config.environments.staging
```



# Backing up and restoring databases

If you are restoring a live database to your vagrant you should drop and recreate the local datbase before restoring

To drop and recreate
```
vagrant ssh

# Once on the vagrant machine
dropdb geosurvey 
createdb -U postgres -T template0 -O postgres geosurvey -E UTF8 --locale=en_US.UTF-8
```

```bash
fab staging:username@162.243.146.75 backup_db
fab staging:username@162.243.146.75 restore_db:backups/2013-11-111755-geosurvey.dump
fab staging:username@162.243.146.75 migrate_db
```
# Running managment commands on tools-dev (ost-dev5)
Log into `tools-dev.oceanspaces.org` and run

```
./manage.py COMMAND_NAME --settings=config.environments.staging
```
# Deploying
This will take whatever is in you local directory, i.e. it does not pull from github. So make sure to do a `git pull ...` if necessary.
Staging site
```
fab staging:wilblack@192.241.228.91 deploy
```
Live site
```
fab staging:wilblack@tools-dev.oceanspaces.org deploy
```
