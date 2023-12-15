let navchange= document.querySelector('#navchange')
let num1 = document.querySelector('#number1')
let num2 = document.querySelector('#number2')
let num3 = document.querySelector('#number3')


//navbar
window.addEventListener('scroll', ()=>{
    if(window.scrollY > 400){
        navchange.classList.add(`navchange`)
        
    }else if(window.scrollY < 400){
        navchange.classList.remove(`navchange`)
    }
})
console.log(scrollY)


//carousel
var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});



//numbers counter
let confirm = true;
function createInterval(n,element,time){
  let counter = 0
  let interval = setInterval(()=>{
    if(counter < n){
      counter++
      element.innerHTML = counter
    }else{
      clearInterval(interval)
    }
  }, time)
  
  
  setTimeout(()=>{
  confirm = true
}, 5000)
}



let observer = new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{
    if(entry.isIntersecting && confirm){
      createInterval(1000, num1, 10)
      createInterval(500, num2, 20)
      createInterval(100, num3, 100)
      confirm=false
    }
  })
})

observer.observe(num1)



