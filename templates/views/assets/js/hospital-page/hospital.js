let totalPage = 0;
let currentPage = 1;
let pageSize = 20;

/* global variable for search function */
let suburbFilter;
let postcodeFilter;
let hospitalNameFilter;
let emergencyFilter;
let privateHospitalFilter;

let hospitals = []; // all hospitals
let tempHospitals = []; // hospitals on current page

/**
 * init page
 */
async function init() {
  const response = await getHospitalList();
  hospitals = response.data;
  tempHospitals = getTempHospitalList(currentPage, pageSize, hospitals);

  emergencyFilter = document.getElementById("emergency-capability").checked;
  privateHospitalFilter = document.getElementById("private-hospital").checked;

  suburbFilter = null;
  postcodeFilter = null;
  hospitalNameFilter = null;

  calTotalPage(pageSize, hospitals);
  createTable(tempHospitals);

  showResults(); // hide no result message
}

/**
 * update suburb search keyword
 * @param newSuburb
 */
function updateSuburb(newSuburb) {
  let toReset = false;
  if (newSuburb == "") {
    suburbFilter = null;
    if ((postcodeFilter == null || postcodeFilter == "") && (hospitalNameFilter == null || hospitalNameFilter == "")) {
      resetSearch();
      return;
    }
  }
  suburbFilter = newSuburb;
  search();
}

/**
 * update postcode search keyword
 * @param newPostcode
 */
function updatePostcode(newPostcode) {
  if (newPostcode == "") {
    postcodeFilter = null;
    if ((suburbFilter == null || suburbFilter == "") && (hospitalNameFilter == null || hospitalNameFilter == "")) {
      resetSearch();
      return;
    }
  }
  postcodeFilter = newPostcode;
  search();
}

/**
 * update hospital name search keyword
 * @param newHospitalName
 */
function updateHospitalName(newHospitalName) {
  if (newHospitalName == "") {
    hospitalNameFilter = null;
    if ((suburbFilter == null || suburbFilter == "") && (postcodeFilter == null || postcodeFilter == "")) {
      console.log("HERE");
      resetSearch();
      return;
    }
  }
  hospitalNameFilter = newHospitalName;
  search();
}

/**
 * toggle emergency capability
 */
function toggleEmergency() {
  emergencyFilter = document.getElementById("emergency-capability").checked;
  search();
}

/**
 * toggle search for private hospital
 */
function togglePrivateHospital() {
  privateHospitalFilter = document.getElementById("private-hospital").checked;
  search();
}

/**
 * search function
 */
function search() {
  let resultHospitals = [];
  let counter = 0;
  for (let h of hospitals) {
    let satifyResult = true;
    if (hospitalNameFilter != null) {
      satifyResult = searchHospitalName(h);
      if (!satifyResult) {
        continue;
      }
    }
    if (suburbFilter != null) {
      satifyResult = searchSuburb(h);
      if (!satifyResult) {
        continue;
      }
    }
    if (postcodeFilter != null) {
      satifyResult = searchPostcode(h);
      if (!satifyResult) {
        continue;
      }
    }
    satifyResult = searchEmergency(h);
    if (!satifyResult) {
      continue;
    }
    satifyResult = searchPrivateHospital(h);
    if (!satifyResult) {
      continue;
    }

    if (satifyResult) {
      resultHospitals.push(h);
      if (resultHospitals.length === pageSize) {
        break;
      }
    }
  }
  createTable(resultHospitals);
  document.getElementById("pagination").style.display = "none";
  if (resultHospitals.length == 0) {
    noResultCondition();
  } else {
    showResults();
  }
}

/**
 * search for hospital name
 * @param hospital
 * @returns {*}
 */
function searchHospitalName(hospital) {
  return hospital[1].toLowerCase().includes(hospitalNameFilter.toLowerCase());
}

/**
 * search for suburb
 * @param hospital
 * @returns {boolean}
 */
function searchSuburb(hospital) {
  return hospital[5].toLowerCase().includes(suburbFilter.toLowerCase());
}

/**
 * search for postcode
 * @param hospital
 * @returns {boolean}
 */
function searchPostcode(hospital) {
  let tempPostcode = hospital[6].toString();
  let tempPostcodeFilter = postcodeFilter.toString();

  return tempPostcode.includes(tempPostcodeFilter);
}

/**
 * filter emergency capability
 * @param hospital
 * @returns {boolean}
 */
function searchEmergency(hospital) {
  if (emergencyFilter) {
    return true;
  }
  return hospital[3] === 0; // return hospitals can't deal with emergency
}

/**
 * filter private hospitals
 * @param hospital
 * @returns {boolean}
 */
function searchPrivateHospital(hospital) {
  if (privateHospitalFilter) {
    return true;
  }
  return hospital[7] === "PUBLIC"; // return only public hospitals
}

/**
 * reset search filter
 */
function resetSearch() {
  document.getElementById("suburb").value = "";
  document.getElementById("postcode").value = "";
  document.getElementById("hospital-name").value = "";

  document.getElementById("emergency-capability").checked = true;
  document.getElementById("private-hospital").checked = true;
  document.getElementById("pagination").style.display = "";
  init();
}

/**
 * display previous page
 */
function previousPage() {
  if (currentPage === 1) {
    return;
  }
  currentPage--;
  tempHospitals = getTempHospitalList(currentPage, pageSize, hospitals);
  createTable(tempHospitals);
  updatePageNum();
}

/**
 * display next page
 */
function nextPage() {
  if (currentPage === totalPage) {
    return;
  }
  currentPage++;
  tempHospitals = getTempHospitalList(currentPage, pageSize, hospitals);
  createTable(tempHospitals);
  updatePageNum();
}

/**
 * update current page number
 */
function updatePageNum() {
  document.getElementById("currentPageNum").innerText = currentPage;
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
 * @param tempHospitals
 */
function createTable(tempHospitals) {
  let table = generateTableTag();
  let tableHead = generateTableHeadTag();
  let tableBody = generateTableBodyTag(tempHospitals);

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

  parentNode.innerHTML = "";
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
  tr.appendChild(generateTHTag("Direction"));

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
    tds[tds.length - 1].innerText = "Yes";
  } else {
    tds[tds.length - 1].innerText = "No";
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
  anchor.appendChild(document.createTextNode("Google Maps "));
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
  document.getElementById("totalPageNum").innerText = totalPage;
}

const noSearchResultMsgSecId = "no-result-msg";
const hospitalListSecId = "hospital-list";

/**
 * when user's input match 0 records, hide table and display a msg to users
 * to request to re-enter search keyword
 */
function noResultCondition() {
  let noResultMsgSec = getSectionById(noSearchResultMsgSecId);
  let hospitalList = getSectionById(hospitalListSecId);
  noResultMsgSec.style.display = "";
  hospitalList.style.display = "none";
}

/**
 * when user's input match any record, display search results in a table format
 */
function showResults() {
  let noResultMsgSec = getSectionById(noSearchResultMsgSecId);
  let hospitalList = getSectionById(hospitalListSecId);
  noResultMsgSec.style.display = "none";
  hospitalList.style.display = "";
}

/**
 * get section in HTML element by ID
 * @param id id for required HTML node
 * @returns {HTMLElement}
 */
function getSectionById(id) {
  return document.getElementById(id);
}