function getSelected() {
  console.log("test");
  let inputs = document.getElementsByTagName("input");

  let inputNameSet = new Set();
  for (let i of inputs) {
    console.log(i.name);
    inputNameSet.add(i.name);
  }

  console.log(inputNameSet.size);

  let resultMap = new Map();
  for (let val of inputNameSet) {
    let tempInput = document.getElementsByName(val);
    console.log(tempInput);
  }
}