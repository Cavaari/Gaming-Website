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


Inital development contained simple php, html and css scripts to help design our website and through gitlab a CI/CD pipeline was implemented to allow for simple production tasks.

As well, we did face small hurdles like required access to maintainer role to create secret env variables for ci/cd pipeline as the team as well we faced issues with ssh into socs vm for team 9 production site.

