# Word2Web
[![](https://img.shields.io/github/license/sourcerer-io/hall-of-fame.svg?colorB=ff0000)](https://github.com/akshaybahadur21/Emojinator/blob/master/LICENSE.md)
[![](https://img.shields.io/badge/Raghav-Patnecha-0000ff.svg)](https://raghavpatnecha.github.io/)
[![](https://img.shields.io/badge/Akshay-Bahadur-brightgreen.svg?colorB=ff0000)](https://akshaybahadur.com)

This repository turns words to html code

### Code Requirements
1) Install Conda for python which resolves all the dependencies for machine learning.
2) gevent server (gevent is a coroutine -based Python networking library that uses greenlet to provide a high-level synchronous API on top of the libev or libuv event loop)
3) Flask (Flask is a microframework for Python based on Werkzeug, Jinja 2)

##### pip install requirements.txt

### Description
A web page (also written as webpage) is a document that is suitable to act as a web resource on the World Wide Web. When accessed by a web browser it may be displayed as a web page on a monitor or mobile device.

The web page usually means what is visible, but the term may also refer to a computer file, usually hypertext written in HTML or a comparable markup language. Web browsers coordinate various web resource elements for the written web page, such as style sheets, scripts, and images, to present the web page. Typical web pages provide hypertext that includes a navigation bar or a sidebar menu linking to other web pages via hyperlinks, often referred to as links

### Functionalities
1) Filters to detect your hand movement
2) CNN for training the model.
3) Convert OPENCV responses to valid HTML output.


### Python  Implementation

1) Network Used- Convolutional Neural Network

2) Flask with WSGI server

3) Microsoft event accessing model `window.event` that contains the last event that took place

4) JQuery to append HTML tags.

If you face any problem, kindly raise an issue

### Procedure  - Web

1) Run the Flask server by running `word2web.py`, the event-stream will stream Open CV responses. 
2) The `window.event` will get last event reponse for which the JS function will appned the Output HTML to the `localhost:5000`.
3) Valid OpenCV keywords are:
`BANNER`, `TEXT`,`ABOUT`, `MENU`,`CONTACT`,`MAP`,`IMG`,`FOOTER`,`TEAM`
4) Few Exceptions:

         4.1)The "IMG" tag will appear only if the "ABOUT" html tag is present in the output html.
         
         4.2)The "MAP" tag will appear only if the "CONTACT" html tag is present in the output html.
         
         4.3) The Response should have a valid output tag present in the template to be added to the html.
     

### Procedure - Training the model

1) First, you have to create a word database. The process is a bit time consuming since you have to provide images of the words you are trying to train your model on. You have to provide atleast 50 images per word.
2) Repeat this for all the features you want. Refer to `data` folder in the repo.
3) Run `data_loader.py` for converting the images to h5 file.
4) If you want to train the model, run `train_words.py`
5) Finally, after training the model, you will get the trained file which you can use in `word2web.py` for converting your words to web code.

### Contributors

##### 1) [Akshay Bahadur](https://github.com/akshaybahadur21/)
##### 2) [Raghav Patnecha](https://github.com/raghavpatnecha)

### Word2Web
<img src="https://github.com/raghavpatnecha/Word2Web/blob/master/w2w.gif">
