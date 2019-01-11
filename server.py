from flask import Flask, request, render_template
import numpy as np

import scipy
import cv2
from keras.models import load_model
from gevent.wsgi import WSGIServer  # gevent server

letter_count = {0: 'MENU', 1: 'BANNER', 2: 'TEXT', 3: 'ABOUT', 4: 'CONTACT', 5: 'FOOTER', 6: 'IMG',
                7: 'MAP', 8: 'TEAM'}
CANVAS_WIDTH = 400
CANVAS_HEIGHT = 400
model1 = load_model('HTML.h5')
app = Flask(__name__, static_path='/static')


@app.route("/sketch", methods=["POST", "GET"])
def sketch():
    letter_count = {0: 'MENU', 1: 'BANNER', 2: 'TEXT', 3: 'ABOUT', 4: 'CONTACT', 5: 'FOOTER', 6: 'IMG',
                    7: 'MAP', 8: 'TEAM'}
    data = request.get_json()
    a = np.array(data).reshape(400, 400)
    scipy.misc.imsave('outfile.png', a)
    img = cv2.imread('outfile.png')
    img, contours = get_img_contour_thresh(img)
    contour = max(contours, key=cv2.contourArea)
    x, y, w, h = cv2.boundingRect(contour)
    img = img[y:y + h, x:x + w]
    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    img = cv2.resize(img, (100, 100))
    pred_probab, pred_class = keras_predict(model1, img)
    print(letter_count[pred_class], pred_probab)
    print(pred_class)
    return letter_count[pred_class]


@app.route("/")
def root():
    return render_template('disp_out.html')


def keras_predict(model, image):
    processed = keras_process_image(image)
    pred_probab = model.predict(processed)[0]
    pred_class = list(pred_probab).index(max(pred_probab))
    return max(pred_probab), pred_class


def keras_process_image(img):
    image_x = 100
    image_y = 100
    img = cv2.resize(img, (image_x, image_y))
    img = np.array(img, dtype=np.float32)
    img = np.reshape(img, (-1, image_x, image_y, 1))
    return img


def get_img_contour_thresh(img):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    gray = cv2.bilateralFilter(gray, 11, 17, 17)
    edges = cv2.Canny(gray, 100, 200)
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (7, 7))
    closed = cv2.morphologyEx(edges, cv2.MORPH_CLOSE, kernel)
    cnts, heir = cv2.findContours(closed.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)[-2:]
    return img, cnts


if __name__ == "__main__":
    http_server = WSGIServer(('', 5000), app)
    http_server.serve_forever()