from __future__ import division
import cv2
import os
import numpy as np
import scipy
import pickle
import matplotlib.pyplot as plt
from itertools import islice

LIMIT = None

DATA_FOLDER = 'data/'
MENU = 'menu'
BANNER = 'banner'
TEXT = 'text'
ABOUT = 'about'
CONTACT = 'contact'
FOOTER = 'footer'
IMG = 'img'
MAP = 'map'
TEAM = 'team'


# TRAIN_FILE = os.path.join(DATA_FOLDER, 'data.txt')

def preprocess(img):
    resized = cv2.resize(img, (100, 100))
    return resized


def return_data():
    X = []
    y = []
    features = []

    for filename in os.listdir(os.path.join(DATA_FOLDER, MENU)):
        if filename.endswith('.jpg'):
            full_path = os.path.join(DATA_FOLDER, MENU, filename)
            X.append(full_path)
            y.append(0)

    for filename in os.listdir(os.path.join(DATA_FOLDER, BANNER)):
        if filename.endswith('.jpg'):
            full_path = os.path.join(DATA_FOLDER, BANNER, filename)
            X.append(full_path)
            y.append(1)

    for filename in os.listdir(os.path.join(DATA_FOLDER, TEXT)):
        if filename.endswith('.jpg'):
            full_path = os.path.join(DATA_FOLDER, TEXT, filename)
            X.append(full_path)
            y.append(2)

    for filename in os.listdir(os.path.join(DATA_FOLDER, ABOUT)):
        if filename.endswith('.jpg'):
            full_path = os.path.join(DATA_FOLDER, ABOUT, filename)
            X.append(full_path)
            y.append(3)

    for filename in os.listdir(os.path.join(DATA_FOLDER, CONTACT)):
        if filename.endswith('.jpg'):
            full_path = os.path.join(DATA_FOLDER, CONTACT, filename)
            X.append(full_path)
            y.append(4)

    for filename in os.listdir(os.path.join(DATA_FOLDER, FOOTER)):
        if filename.endswith('.jpg'):
            full_path = os.path.join(DATA_FOLDER, FOOTER, filename)
            X.append(full_path)
            y.append(5)
    for filename in os.listdir(os.path.join(DATA_FOLDER, IMG)):
        if filename.endswith('.jpg'):
            full_path = os.path.join(DATA_FOLDER, IMG, filename)
            X.append(full_path)
            y.append(6)

    for filename in os.listdir(os.path.join(DATA_FOLDER, MAP)):
        if filename.endswith('.jpg'):
            full_path = os.path.join(DATA_FOLDER, MAP, filename)
            X.append(full_path)
            y.append(7)

    for filename in os.listdir(os.path.join(DATA_FOLDER, TEAM)):
        if filename.endswith('.jpg'):
            full_path = os.path.join(DATA_FOLDER, TEAM, filename)
            X.append(full_path)
            y.append(8)

    for i in range(len(X)):
        img = plt.imread(X[i])
        features.append(preprocess(img))

    features = np.array(features).astype('float32')
    labels = np.array(y).astype('float32')

    with open("features", "wb") as f:
        pickle.dump(features, f, protocol=4)
    with open("labels", "wb") as f:
        pickle.dump(labels, f, protocol=4)


return_data()
