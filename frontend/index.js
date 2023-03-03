import {getTTFB, getFCP, getLCP, getFID, getCLS, getINP} from 'web-vitals'

const opts = {reportAllChanges: true};

getTTFB(console.log, opts);
getFCP(console.log, opts);
getLCP(console.log, opts);
getFID(console.log, opts);
getCLS(console.log, opts);
getINP(console.log, opts);

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM content loaded');
})

function blockMainThread(count) {
    const label = 'blockMainThread';
    console.time(label);
    for (let i = 0; i < count; i++) {
        // la la la
    }
    console.timeEnd(label);
}

function scaleByDimensions(element) {
    element.style.height = '200px';
    element.style.width = '200px';
}

function scaleByTransformation(element) {
    element.style.transform = 'scale(1.2, 1.2)';
}

function addParagraphElementsToBody(count) {
    for (let i = 0; i < count; i++) {
        const p = document.createElement('p');
        p.textContent = `index: ${i}, timestamp: ${Date.now()}`
        document.body.insertAdjacentElement('afterend', p);
    }
}

const bgImage = document.querySelector('#bg-image');
const testSvg = document.querySelector('#test-svg');

blockMainThread(100000);

addParagraphElementsToBody(10);

scaleByDimensions(bgImage);
scaleByDimensions(testSvg);

// scaleByTransformation(bgImage);
// scaleByTransformation(testSvg);

export {};
