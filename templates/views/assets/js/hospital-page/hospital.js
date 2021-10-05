let totalPage = 0;
let currentPage = 1;
let pageSize = 20;

/* global variable for search function */
let suburb = "";
let postcode = "";
let hospitalName = "";
let emergency;
let publicHospital;
let privateHospital;

/**
 * init page
 */
async function init() {
  const response = await getHospitalList();
  let hospitals = response.data;

  emergency = document.getElementById("emergency-capability").checked;
  publicHospital = document.getElementById("public-hospital").checked;
  privateHospital = document.getElementById("private-hospital").checked;

  calTotalPage(pageSize, hospitals);
  createTable(hospitals);
}

function updateSuburb(newSuburb) {
  suburb = newSuburb;
  console.log(newSuburb);
}

function search() {
  // let suburb = document.getElementById("suburb");
  // console.log(suburb.value);
}

/**
 * invoke back-end api to get hosptial data
 * @returns {Promise<any>}
 */
async function getHospitalList() {
  const api = "https://allergyfree.me/api/hospitals-data";
  // const api = "http://localhost:5000/api/hospitals-data";
  const response = await fetch(api);
  const data = await response.json();
  return data;
}

/**
 * create the table
 * @param hospitals
 */
function createTable(hospitals) {
  let table = generateTableTag();
  let tableHead = generateTableHeadTag();
  let tableBody = generateTableBodyTag(getTempHospitalList(currentPage, pageSize, hospitals));

  table.appendChild(tableHead);
  table.appendChild(tableBody);
}

/**
 * generate table tag
 * @returns {HTMLTableElement}
 */
function generateTableTag() {
  let parentNode = document.getElementById("hospital-data");
  let table = document.createElement("table");
  table.setAttribute("class", "table table-striped table-hover")

  parentNode.appendChild(table);
  return table;
}

/**
 * generate table head tag
 * @returns {HTMLTableSectionElement}
 */
function generateTableHeadTag() {
  let thead = document.createElement("thead");
  let tr = generateTRTag();

  tr.appendChild(generateTHTag("Name"));
  tr.appendChild(generateTHTag("Emergency Capability"));
  tr.appendChild(generateTHTag("Address"));
  tr.appendChild(generateTHTag("Suburb"));
  tr.appendChild(generateTHTag("Postcode"));
  tr.appendChild(generateTHTag("Category"));
  tr.appendChild(generateTHTag("Google Maps"));

  thead.appendChild(tr);
  return thead;
}

/**
 * generate table body and its content
 * @param tempHosiptal hospitals in current page
 * @returns {HTMLTableSectionElement}
 */
function generateTableBodyTag(tempHosiptal) {
  let tbody = document.createElement("tbody");
  for (let h of tempHosiptal) {
    let tempTR = generateTRTag();
    let tds = generateTDTags(h);
    for (let td of tds) {
      tempTR.appendChild(td);
    }
    tbody.appendChild(tempTR);
  }

  return tbody;
}

/**
 * generate tr tag
 * @returns {HTMLTableRowElement}
 */
function generateTRTag() {
  return document.createElement("tr");
}

/**
 * generate th tag
 * @param content
 * @returns {HTMLTableHeaderCellElement}
 */
function generateTHTag(content) {
  let th = document.createElement("th");
  th.appendChild(document.createTextNode(content));
  return th;
}

/**
 * generate toble data tags
 * @param info list of information to display
 */
function generateTDTags(info) {
  let tds = [];
  tds.push(generateTDTag(info[1]));
  tds.push(generateTDTag(info[3]));
  if (tds[tds.length - 1].innerText === "1") {
    tds[tds.length - 1].innerText = "True";
  } else {
    tds[tds.length - 1].innerText = "False";
  }
  tds.push(generateTDTag(info[4]));
  tds.push(generateTDTag(info[5]));
  tds.push(generateTDTag(info[6]));
  tds.push(generateTDTag(info[7]));

  tds.push(generateLinkToGoogleMap(info[1], info[4], info[5], info[6]));
  return tds;
}

/**
 * generate link to google map
 * @param name hospital name
 * @param address hospital address
 * @param suburb hospital suburb
 * @param postcode hospital postcode
 * @returns {HTMLTableDataCellElement}
 */
function generateLinkToGoogleMap(name, address, suburb, postcode) {
  let td = document.createElement("td");
  let anchor = document.createElement("a");

  let linkPrefix = "https://maps.google.com/?q=";
  const connector = ",";
  const link = linkPrefix + name + connector + address + connector + suburb + connector + postcode;

  anchor.href = link;
  anchor.setAttribute("target", "_blank");
  anchor.appendChild(document.createTextNode("Google Maps"));
  let i = document.createElement("i");
  i.setAttribute("class", "ri-external-link-line");
  i.setAttribute("style", "vertical-align: middle");
  anchor.appendChild(i);

  td.appendChild(anchor);
  return td;
}

/**
 * generate individual table data tag content
 * @param content
 */
function generateTDTag(content) {
  let td = document.createElement("td");
  td.appendChild(document.createTextNode(content));
  return td;
}

/**
 * get hospitals in the current page
 * @param currentPage
 * @param pageSize
 * @param hospitals
 * @returns {*}
 */
function getTempHospitalList(currentPage, pageSize, hospitals) {
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  return hospitals.slice(start, end);
}

/**
 * calculate total number of pages
 * @param pageSize max records in one page
 * @param data all data
 */
function calTotalPage(pageSize, data) {
  totalPage = Math.floor(data.length / pageSize);
  if (data.length % pageSize !== 0) {
    totalPage++;
  }
}