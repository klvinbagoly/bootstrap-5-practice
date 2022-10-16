const loadTheData = async () => {
  const url = 'products.json'
  const asyncFetch = await fetch(url)
  const productsData = await asyncFetch.json()
  return productsData
}

const loadImages = async () => {
  const url = 'https://picsum.photos/v2/list?page=1&limit=100'
  const asyncFetch = await fetch(url)
  const imageData = await asyncFetch.json()
  return imageData
}

const fillTheCarousel = data => {
  const carouselInner = document.querySelector('#carouselExampleCaptions .carousel-inner')
  carouselInner.innerHTML = ''

  for (let i = 0; i < 5; i++) {
    const product = data.splice(Math.random() * data.length, 1)[0]

    const carouselItem = document.createElement('div')
    carouselItem.className = 'carousel-item'
    if (i === 0) carouselItem.classList.add('active')

    carouselItem.innerHTML = `
    <img src="https://picsum.photos/600/300"
     class="d-block w-100" style="height: 50vh; object-fit:cover"
     data-bs-interval="3000" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h5>${product.name}</h5>
            <p>${product.description}</p>
          </div>
    `
    carouselInner.appendChild(carouselItem)
  }

  loadImages().then(displayImages).catch(
    () => console.error('Images could not be loaded!')
  )
}

const displayImages = (data) => {
  const images = document.querySelectorAll('#carouselExampleCaptions img')
  images.forEach(
    (image, index) => {
      const imgData = data.splice(Math.random() * data.length, 1)[0]
      image.src = imgData.download_url
      image.alt = `A randomly chosen photo, made by ${imgData.author}`
    })
}


window.onload = () => {
  loadTheData().then(fillTheCarousel).catch(
    () => console.log('The data is missing!')
  )
}