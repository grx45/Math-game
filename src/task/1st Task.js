function count(priceList, cart) {
  let bill = [];

  for (let i = 0; i < cart.length; i++) {
    let total = 0;
    for (let j = 0; j < cart[i].length; j++) {
      const movie = cart[i][j];
      const foundMovie = priceList.find((val) => val.title === movie);

      if (foundMovie) {
        total += foundMovie.price;
      }
    }
    bill.push(total);
  }

  let result = "";

  bill.forEach((val) => {
    result += parseInt(val) + "\n";
  });

  return result;
}

console.log(
  count(
    [
      {
        title: "Lord of the Rings",
        price: 28000,
      },
      {
        title: "Star Wars",
        price: 24000,
      },
      {
        title: "Spiderman 3",
        price: 15000,
      },
      {
        title: "Inception",
        price: 32000,
      },
    ],
    [
      ["Lord of the Rings", "Spiderman 3"],
      ["Star Wars", "Inception", "Spiderman 3"],
    ]
  )
);
