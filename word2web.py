from flask import Flask, request, render_template,Response
import numpy as np
from collections import deque
import cv2
from keras.models import load_model
from gevent.wsgi import WSGIServer  # gevent server
import time

letter_count = {0: 'MENU', 1: 'BANNER', 2: 'TEXT', 3: 'ABOUT', 4: 'CONTACT', 5: 'FOOTER', 6: 'IMG',
                7: 'MAP', 8: 'TEAM'}

letter_count1 = {0: 'BANNER', 1: 'MENU', 2: 'TEXT', 3: 'ABOUT', 4: 'CONTACT', 5: 'FOOTER', 6: 'IMG',
                7: 'MAP', 8: 'TEAM'}

CANVAS_WIDTH = 400
CANVAS_HEIGHT = 400
model = load_model('HTML.h5')
app = Flask(__name__, static_path='/static')



def gen():
    cap = cv2.VideoCapture(0)
    Lower_green = np.array([110, 50, 50])
    Upper_green = np.array([130, 255, 255])
    pts = deque(maxlen=512)
    blackboard = np.zeros((480, 640, 3), dtype=np.uint8)
    blackboard_copy = np.zeros((480, 640, 3), dtype=np.uint8)
    digit = np.zeros((200, 200, 3), dtype=np.uint8)
    pred_class = 0

    while (cap.isOpened()):
        ret, img = cap.read()
        img = cv2.flip(img, 1)
        hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
        kernel = np.ones((5, 5), np.uint8)
        mask = cv2.inRange(hsv, Lower_green, Upper_green)
        mask = cv2.erode(mask, kernel, iterations=2)
        mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)
        # mask=cv2.morphologyEx(mask,cv2.MORPH_CLOSE,kernel)
        mask = cv2.dilate(mask, kernel, iterations=1)
        res = cv2.bitwise_and(img, img, mask=mask)
        cnts, heir = cv2.findContours(mask.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)[-2:]
        center = None

        if len(cnts) >= 1:
            cnt = max(cnts, key=cv2.contourArea)
            if cv2.contourArea(cnt) > 200:
                ((x, y), radius) = cv2.minEnclosingCircle(cnt)
                cv2.circle(img, (int(x), int(y)), int(radius), (0, 255, 255), 2)
                cv2.circle(img, center, 5, (0, 0, 255), -1)
                M = cv2.moments(cnt)
                center = (int(M['m10'] / M['m00']), int(M['m01'] / M['m00']))
                pts.appendleft(center)
                for i in range(1, len(pts)):
                    if pts[i - 1] is None or pts[i] is None:
                        continue
                    cv2.line(blackboard, pts[i - 1], pts[i], (255, 255, 255), 7)
                    cv2.line(img, pts[i - 1], pts[i], (0, 0, 255), 2)
        elif len(cnts) == 0:
            if len(pts) != []:
                blackboard_gray = cv2.cvtColor(blackboard, cv2.COLOR_BGR2GRAY)
                blur1 = cv2.medianBlur(blackboard_gray, 15)
                blur1 = cv2.GaussianBlur(blur1, (5, 5), 0)
                thresh1 = cv2.threshold(blur1, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]
                blackboard_cnts = cv2.findContours(thresh1.copy(), cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)[1]
                if len(blackboard_cnts) >= 1:
                    cnt = max(blackboard_cnts, key=cv2.contourArea)
                    print(cv2.contourArea(cnt))
                    if cv2.contourArea(cnt) > 2000:
                        x, y, w, h = cv2.boundingRect(cnt)
                        digit = blackboard_gray[y:y + h, x:x + w]
                        pred_probab, pred_class = keras_predict(model, digit)
                        print(letter_count[pred_class], pred_probab)
                        print(pred_class)
                        yield "data: %s\n\n" % (letter_count[pred_class])

            pts = deque(maxlen=512)
            blackboard_copy += blackboard
            blackboard = np.zeros((480, 640, 3), dtype=np.uint8)
        cv2.putText(img, "Prediction : " + str(letter_count[pred_class]), (10, 320),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
        cv2.imshow("Frame", img)
        cv2.imshow("black", blackboard_copy)
        k = cv2.waitKey(10)
        if k == 27:
            break
#            yield "data: %s\n\n" % (letter_count[pred_class])

def sample():
    for i in letter_count1.values():
        time.sleep(10)
        yield "data: %s\n\n" % (i)


@app.route("/sketch")
def sketch():
    return Response(sample(), content_type='text/event-stream')

@app.route("/")
def root():

    return render_template('opencvtest.html')

def keras_predict(model, image):
    processed = keras_process_image(image)
    print("processed: " + str(processed.shape))
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

keras_predict(model, np.zeros((100, 100, 1), dtype=np.uint8))


if __name__ == "__main__":
    http_server = WSGIServer(('', 5000), app)
    http_server.serve_forever()
