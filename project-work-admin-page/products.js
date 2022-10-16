const loadTheData = async () => {
  const url = 'products.json'
  const asyncFetch = await fetch(url)
  const productsData = await asyncFetch.json()
  return productsData
}

const columns = [
  'id', 'name', 'description', 'price', 'supply', 'category', 'active'
]

const getPrice = (product) => parseFloat(product.price.slice(1))

const findCheapest = (products) => products.findIndex(
  product => products.every(
    p => getPrice(product) <= getPrice(p)
  )
)

const findMostExpensive = (products) => products.findIndex(
  product => products.every(
    p => getPrice(product) >= getPrice(p)
  )
)

const buildTheTable = (data) => {
  const cheapest = findCheapest(data)
  const mostExpensive = findMostExpensive(data)

  const mainTable = document.getElementById('main-table')
  mainTable.innerHTML = ''
  const htmlFragment = document.createDocumentFragment()
  data.forEach(
    (product, index) => {
      let tableRow = document.createElement('tr')
      tableRow.className = index === cheapest ? 'table-info'
        : index === mostExpensive ? 'table-danger'
          : ''
      tableRow.innerHTML = columns.map(col => `<td>${product[col]}</td>`).join('')
      let buttons = document.createElement('td')
      const commentNode = Array
        .from(document.body.childNodes)
        .find(node => node.nodeType === 8)
      buttons.innerHTML = commentNode.nodeValue  // Inside the <body>, there should be a comment node of how the buttons should look like.
      tableRow.appendChild(buttons)
      htmlFragment.appendChild(tableRow)
    }
  )
  mainTable.appendChild(htmlFragment)
}

window.onload = () => {
  loadTheData().then(buildTheTable).catch(
    () => console.error('The data is missing!')
  )
}