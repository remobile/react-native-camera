/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/
'use strict';

var React = require('react-native');
var {
    NativeModules
} = React;

var RCTCamera = NativeModules.Camera;

var CameraConstants = require('./CameraConstants.js');
var CameraPopoverHandle = require('./CameraPopoverHandle.js');
var CameraPopoverOptions = require('./CameraPopoverOptions.js');

var Camera = Object.assign({}, CameraConstants);
Camera.CameraPopoverHandle = CameraPopoverHandle;
Camera.CameraPopoverOptions = CameraPopoverOptions;
/**
 * Gets a picture from source defined by "options.sourceType", and returns the
 * image as defined by the "options.destinationType" option.

 * The defaults are sourceType=CAMERA and destinationType=FILE_URI.
 *
 * @param {Function} successCallback
 * @param {Function} errorCallback
 * @param {Object} options
 */
Camera.getPicture = function(options, successCallback, errorCallback) {
    options = options || {};
    successCallback = successCallback || (()=>{});
    errorCallback = errorCallback || (()=>{});
    var getValue = (value, defaultValue) => {
        return value === undefined ? defaultValue : value;
    }

    var quality = getValue(options.quality, 50);
    var destinationType = getValue(options.destinationType, Camera.DestinationType.FILE_URI);
    var sourceType = getValue(options.sourceType, Camera.PictureSourceType.CAMERA);
    var targetWidth = getValue(options.targetWidth, -1);
    var targetHeight = getValue(options.targetHeight, -1);
    var encodingType = getValue(options.encodingType, Camera.EncodingType.JPEG);
    var mediaType = getValue(options.mediaType, Camera.MediaType.PICTURE);
    var allowEdit = !!options.allowEdit;
    var correctOrientation = !!options.correctOrientation;
    var saveToPhotoAlbum = !!options.saveToPhotoAlbum;
    var popoverOptions = getValue(options.popoverOptions, null);
    var cameraDirection = getValue(options.cameraDirection, Camera.Direction.BACK);

    var args = [quality, destinationType, sourceType, targetWidth, targetHeight, encodingType,
        mediaType, allowEdit, correctOrientation, saveToPhotoAlbum, popoverOptions, cameraDirection];

    RCTCamera.takePicture(args, successCallback, errorCallback);
};

Camera.cleanup = function(successCallback, errorCallback) {
    successCallback = successCallback || (()=>{});
    errorCallback = errorCallback || (()=>{});
    RCTCamera.cleanup(successCallback, errorCallback);
};

module.exports = Camera;
