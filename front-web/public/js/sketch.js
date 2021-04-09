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

let meuhh = 
`
 _______
< Meuhh >
 -------
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
`

// Teachable Machine model URL:
let soundModelURL = window.location.protocol + '//' + window.location.host + '/model/model.json'

let needRePaint = true

function preload() {
    // Load the model
    classifier = ml5.soundClassifier(soundModelURL)
    //cow = loadImage('cow.png');
}

function setup() {
    // Draw the label in the canvas
    createCanvas(800, 600)    
    //fill(255)    
    fill('#FF00E8')
    textSize(32)

    //textFont('DejaVu Sans Mono');
    //textFont('BlexMono Nerd Font Mono');
    //textFont('FiraCode Nerd Font Mono');
    textFont('Fira Mono');
    textStyle(BOLD);

    textAlign(LEFT, BOTTOM)
    
    // Start classifying
    // The sound model will continuously listen to the microphone
    classifier.classify(gotResult)
}

function draw() {
    if (needRePaint) {
        needRePaint = false
        background(0, 255, 0)
        if (label == "euhh") {
            euuh()
        } else {
            hide()
        }
    }

}

function hide() {
    // TODO hide image(s)
    text("", 20, height)
    
}

function euuh() {    
    // TODO add cow image
    // TODO add ring cow sound (?? cloche de vache ??) (with setTimeout...)
    text(meuhh, 20, height)
}


// The model recognizing a sound will trigger this event
function gotResult(error, results) {
    if (error) {
        console.error(error)
        return
    }
    // The results are in an array ordered by confidence.
    // console.log(results[0])
    if (results[0].confidence > 0.7) {  
        if (label != results[0].label) {
            label = results[0].label
            needRePaint = true        
        }
    }
    //  else
    //    label = "unknow"

}