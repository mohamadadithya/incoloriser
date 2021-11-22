/* Copyright 2021 Mohamad Adithya. All rights reserved. */
const buttonStart = document.querySelector('.btn-start')
const fileInput = document.getElementById('uploader')
const outputImages = document.querySelector('.output-images')
const beforeImage = outputImages.querySelector('.before')
const afterImage = outputImages.querySelector('.after')
const loaderEl = document.querySelector('.loader')

buttonStart.addEventListener('click', () => {
    window.location = '/#core'
})

var deepai = require('deepai')

deepai.setApiKey('cc6ee6fe-168a-49b8-ad7c-b952db89928a') // Use your own API key from Deep AI

const callDeepAI = async () => {
    loader('show')
    var resp = await deepai.callStandardApi("colorizer", {
        image: fileInput,
    })
    showOutput(resp.output_url, fileInput)
    loader('hide')
}

fileInput.addEventListener('change', callDeepAI)

const showOutput = (outputUrl, fileInput) => {
    readURL(fileInput)
    afterImage.src = outputUrl
    outputImages.style.display = 'grid'
    window.location = '/#output-images'
}

const readURL = event => {
    if(event.files && event.files[0]) {
        let reader = new FileReader()
        reader.onload = event => beforeImage.src = event.target.result
        reader.readAsDataURL(event.files[0])
    }
}

const loader = (state) => {
    if(state === 'show') {
        loaderEl.style.display = 'block'
    } else {
        loaderEl.style.display = 'none'
    }
} 