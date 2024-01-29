## Connecting to the VM without VPN:

1) $ ssh username@portkey.socs.uoguelph.ca
2) $ ssh socs@cis4250w24-09.socs.uoguelph.ca
3) password: EncoringSharePurplest

## Project git folder
	$ cd team_9

## Nginx website config folder
	$ cd /etc/nginx/sites-available

## How to create your about me page:
	1) Clone our repo into your local computer
	2) $ cd app/aboutme 
	3) Create folder with your username
	4) Create and edit index.php

## Team Members:
	- Eric Dearing (Team Lead)
	- Karina Garmendez
	- Egor Ivanov
	- Kalindu Kehel Baddarage
	- Tehreem Nazar
	- Muhammad Salmaan
	- Cavaari Taylor

	

## Sprint 1: Site Development

In this sprint the team set out to develop a simple starting platform for our soon to be diverse and fully immersive gaming hub to which will allow users a comprehensive gaming experience. 
We made initial designs on Figma as a reference of what our site potentially could look like : https://www.figma.com/file/w5yFYkEdLgKt9auNHe0i0S/Landing-Page-Design?type=design&node-id=0%3A1&mode=design&t=XHEz066FQjGowPQs-1

Creating A New CI/CD Pipeline
For new CI/CD pipelines, a .gitlab-ci.yml file is needed on your root directory. For each sprint, the pipeline which is responsible for building, testing, and publishing changes onto the VM will be handled in the sprint branch (and may be merged onto main branch where main represents production branch). The current version is not able to include hidden variables since admin users are the only role that have access to CI/CD settings. One workaround would be to utilize regular variables in the pipeline which function the same, but this option opens you to security vulnerabilities.

Inital development contained simple php, html and css scripts to help design our website and through gitlab a CI/CD pipeline was implemented to allow for simple production tasks. Here is the link : https://gitlab.socs.uoguelph.ca/cis4250_w24/team_9/-/wikis/Team-9-CI/CI-CD-Process

As well, we did face small hurdles like required access to maintainer role to create secret env variables for ci/cd pipeline as the team as well we faced issues with ssh into socs vm for team 9 production site.


In sprint 2 : the CI/CD is finished.
Game logic is made (might me changed later) :  https://docs.google.com/document/d/1nidLjRdUKJwX-5qKk9KBt6gMpJV836TYZp3JL0WIDVU/edit?usp=sharing
Figma Design for Game is here : https://www.figma.com/file/rBCjmr5ukY6rfa9GAz79cS/Game-Design?type=design&mode=design&t=38jVKrwNTlHlOLiA-1
Phaser Wiki is here : https://gitlab.socs.uoguelph.ca/cis4250_w24/team_9/-/wikis/Phaser-Wiki


