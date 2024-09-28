const container = document.querySelector('#carousel');
const slides = container.querySelectorAll('.slide');
const indicatorsContainer = container.querySelector('#indicators-container');
const indicatorsItem = container.querySelectorAll('.indicator');
const pauseBtn = container.querySelector('#pause-btn');
const prevBtn = container.querySelector('#prev-btn');
const nextBtn = container.querySelector('#next-btn');
  
const SLIDES_COUNT = slides.length;
const INTERVAL = 2000;
let currentSlide = 0;
let isPlaying = true;
let timerId = null;



function gotoNth(n) {
slides[currentSlide].classList.toggle('active');
indicatorsItem[currentSlide].classList.toggle('active');
currentSlide = (n + SLIDES_COUNT) % SLIDES_COUNT; 
indicatorsItem[currentSlide].classList.toggle('active');
slides[currentSlide].classList.toggle('active');
}

function gotoNext() {
  gotoNth(currentSlide + 1);
}

function gotoPrev() {
  gotoNth(currentSlide - 1);
}


function pauseHandler() {
  isPlaying = false;
  clearInterval(timerId);
  pauseBtn.innerText = 'Play';
}

function playHandler() {
  isPlaying = true;
  timerId = setInterval(gotoNext, INTERVAL);
  pauseBtn.innerText = 'Pause';
}  

function pausePlayHandler() {
    isPlaying ? pauseHandler() : playHandler();
}



function nextHandler() {
  pauseHandler();
  gotoNext();
}

function prevHandler() {
  pauseHandler();
  gotoPrev();
}

function indicateHandler(e) {
  const target = e.target;
  if (target.classList.contains('indicator')) {
    pauseHandler()
    console.log(typeof +target.getAttribute('data-slide-to'))
    console.log(+target.dataset.slideTo)
    gotoNth(+target.dataset.slideTo)
  }
}

function pressKeyHandler(e) {
console.log(e.code)
}



pauseBtn.addEventListener('click', pausePlayHandler);
nextBtn.addEventListener('click', nextHandler);
prevBtn.addEventListener('click', prevHandler);
indicatorsContainer.addEventListener('click', indicateHandler);
document.addEventListener('keydown', pressKeyHandler);

timerId = setInterval(gotoNext, INTERVAL);


