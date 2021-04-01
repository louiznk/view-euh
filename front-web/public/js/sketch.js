// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

// Global variable to store the classifier
let classifier

// Label (start by showing listening)
let label = "listening"

// Teachable Machine model URL:
let soundModelURL = window.location.protocol + '//' + window.location.host + '/model/model.json'


function preload() {
    // Load the model
    classifier = ml5.soundClassifier(soundModelURL)
}

function setup() {
    // Draw the label in the canvas
    createCanvas(800, 600)
    fill(255)
    textSize(32)
    textAlign(CENTER, CENTER)
    
    // Start classifying
    // The sound model will continuously listen to the microphone
    classifier.classify(gotResult)
}

function draw() {
    background(0, 155, 0)
    
    if (label == "euhh") {
        euuh()
    } else {
        hide()
    }
}

function hide() {
    // TODO hide image(s)
    text("", width / 2, height / 2)
}

function euuh() {    
    // TODO add cow image
    // TODO add ring cow sound (?? cloche de vache ??) (with setTimeout...)
    text("Image meuuhhh", width / 2, height / 2)

}


// The model recognizing a sound will trigger this event
function gotResult(error, results) {
    if (error) {
        console.error(error)
        return
    }
    // The results are in an array ordered by confidence.
    // console.log(results[0])
    if (results[0].confidence > 0.8) {      
        label = results[0].label        
    }
    //  else
    //    label = "unknow"

}