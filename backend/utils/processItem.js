const getLink = item => {
  const url = 'https://allegro.pl/oferta/' + item.id
  return url
}

const processItem = item => {
  return {
    id: item.id,
    name: item.name,
    link: getLink(item),
    images: item.images,
    price: item.sellingMode.price.amount
  }
}

module.exports = {
  getLink,
  processItem
}
