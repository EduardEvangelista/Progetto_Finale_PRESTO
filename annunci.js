let navchange= document.querySelector('#navchange')

//navbar
window.addEventListener('scroll', ()=>{
    if(window.scrollY > 400){
        navchange.classList.add(`navchange`)
        
    }else if(window.scrollY < 400){
        navchange.classList.remove(`navchange`)
    }
})
console.log(scrollY)

fetch('./annunci.json').then((response)=> response.json()).then((data)=>{


    data.sort((a,b)=> a.price - b.price)


    let inputCategory= document.querySelector('#inputCategory')
    let containerCard= document.querySelector('#containerCard')


    function radioCreate(){
        let categories= data.map((annuncio)=> annuncio.category)
        let uniqueCategories = new Set(categories)
        uniqueCategories.forEach((categoria)=>{
            let div = document.createElement('div')
            div.innerHTML = `<input class="form-check-input" type="radio" name="categoria" id="${categoria}">
            <label class="form-check-label" for="${categoria}">
              ${categoria}
            </label>`
            inputCategory.appendChild(div)
        })
    }

    radioCreate()



    function showCards(array){
        array.forEach((annuncio)=>{
            let div = document.createElement('div')
            div.classList.add('col-6', 'col-md-3')
            div.innerHTML = `
            <img src="${annuncio.img}" class="img-fluid">
            <h2>${annuncio.name}</h2>
            <p>${annuncio.category}</p>
            <p class="">${annuncio.price}$</p>`
            containerCard.appendChild(div)
        })
    }

    showCards(data)



    function filterByCategories(array){
        console.log(radioBtn)
        let btnChecked = Array.from(radioBtn).find((button)=> button.checked)
        console.log(btnChecked)
        let categoria = btnChecked.id
        if(categoria != 'All'){
            let filtered = array.filter((annuncio)=> annuncio.category == categoria)
            containerCard.innerHTML = ``
            return filtered
        }else{
            return data
        }
    }



    let radioBtn = document.querySelectorAll('.form-check-input')

    radioBtn.forEach((btn)=>{
        btn.addEventListener('click', ()=>{
            globalFilter()
        })
    })




    let priceInput = document.querySelector('#priceInput')
    let priceValue = document.querySelector('#priceValue')


    function setPriceInput(){
        let prices = data.map((annuncio)=> Number(annuncio.price))
        prices.sort((a,b)=> a - b)
        let maxPrice = prices.pop()
        priceInput.max = maxPrice
        priceInput.value = maxPrice
        priceValue.innerHTML = maxPrice
    }


    setPriceInput()


    function filteredByPrice(array){
        let filtered = array.filter((annuncio)=> Number(annuncio.price) <= priceInput.value)
        containerCard.innerHTML = ``
        return filtered
    }


    priceInput.addEventListener('input', ()=>{
        priceValue.innerHTML = priceInput.value
        globalFilter()
    })




    let wordInput = document.querySelector('#wordInput')

    function filterByWord(array){
        let filtered = array.filter((annuncio)=> annuncio.name.includes(wordInput.value))
        containerCard.innerHTML = ``
        return filtered
    }

    wordInput.addEventListener('input', ()=>{
        globalFilter()
    })




    function globalFilter(){
        let filtratiPerCategoria = filterByCategories(data)
        let filtratiPerPrezzo = filteredByPrice(filtratiPerCategoria)
        let filtratiPerParola = filterByWord(filtratiPerPrezzo)
        showCards(filtratiPerParola)
    }



})