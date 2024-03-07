"use strict"

fetch("./data.json")
  .then((data) => data.json())
  .then((data) => console.log(data.orders))