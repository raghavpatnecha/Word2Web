# Word2Web
[![](https://img.shields.io/github/license/sourcerer-io/hall-of-fame.svg?colorB=ff0000)](https://github.com/akshaybahadur21/Emojinator/blob/master/LICENSE.md)
[![](https://img.shields.io/badge/Raghav-Patnecha-0000ff.svg)](https://raghavpatnecha.github.io/)
[![](https://img.shields.io/badge/Akshay-Bahadur-brightgreen.svg?colorB=ff0000)](https://akshaybahadur.com)

This repository turns words to html code

### Code Requirements
You can install Conda for python which resolves all the dependencies for machine learning.

##### pip install requirements.txt

### Description
Emojis are ideograms and smileys used in electronic messages and web pages. Emoji exist in various genres, including facial expressions, common objects, places and types of weather, and animals. They are much like emoticons, but emoji are actual pictures instead of typographics.

### Functionalities
1) Filters to detect hand.
2) CNN for training the model.


### Python  Implementation

1) Network Used- Convolutional Neural Network

If you face any problem, kindly raise an issue'

### Code Requirements - Raghav
gevent server (gevent is a coroutine -based Python networking library that uses greenlet to provide a high-level synchronous API on top of the libev or libuv event loop.)
Flask (Flask is a microframework for Python based on Werkzeug, Jinja 2)


### Functionalities  - Raghav
1) Convert OPENCV responses to valid HTML output.


###  Implementation  - Raghav

1) Flask with WSGI server

2) Microsoft event accessing model `window.event` that contains the last event that took place

3) JQuery to append HTML tags.



### Procedure  - Raghav

1) Run the Flask server by running `flask_server_word2web.py`, the event-stream will stream Open CV responses. 
2) The `window.event` will get last event reponse for which the JS function will appned the Output HTML to the `localhost:5000`.
3) Valid OpenCV keywords are:
`BANNER`, `TEXT`,`ABOUT`, `MENU`,`CONTACT`,`MAP`,`IMG`,`FOOTER`,`TEAM`
4) Few Exceptions:

         4.1)The "IMG" tag will appear only if the "ABOUT" html tag is present in the output html.
         
         4.2)The "MAP" tag will appear only if the "CONTACT" html tag is present in the output html.
         
         4.3) The Response should have a valid output tag present in the template to be added to the html.
     
     

### Procedure

1) First, you have to create a gesture database. For that, run `CreateGest.py`. Enter the gesture name and you will get 2 frames displayed. Look at the contour frame and adjust your hand to make sure that you capture the features of your hand. Press 'c' for capturing the images. It will take 1200 images of one gesture. Try moving your hand a little within the frame to make sure that your model doesn't overfit at the time of training.
2) Repeat this for all the features you want.
3) Run `CreateCSV.py` for converting the images to a CSV file
4) If you want to train the model, run 'TrainEmojinator.py'
5) Finally, run `Emojinator.py` for testing your model via webcam.

### Contributors

##### 1) [Akshay Bahadur](https://github.com/akshaybahadur21/)
##### 2) [Raghav Patnecha](https://github.com/raghavpatnecha)
