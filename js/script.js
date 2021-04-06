/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
Author: Alex Hipolito
GitHub: @alexhippo
*/

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
let itemsPerPage = 9;
function showPage(list, page) {
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = page * itemsPerPage;
   const studentList = document.querySelector('ul.student-list');
   studentList.innerHTML = ``;

   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         //@todo: use insertAdjacentHTML and beforeend
         studentList.insertAdjacentHTML('beforeend', `
            <li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src=${list[i].picture.large} alt="Profile Picture of ${list[i].name.first} ${list[i].name.last}">
                  <h3>${list[i].name.first} ${list[i].name.last}</h3>
                  <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">${list[i].registered.date}</span>
               </div>
            </li>
         `)
      }
   }
}

const linkList = document.querySelector('ul.link-list');
/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
   const numberofPages = (list.length / 9) + 1; //index starts at 1
   linkList.innerHTML = ``;

   for (let i = 1; i <= numberofPages; i++) {
      linkList.insertAdjacentHTML('beforeend', `
         <li>
            <button type="button">${i}</button>
         </li>
      `);
   }
   const activeButton = linkList.firstElementChild.firstElementChild;
   activeButton.className = 'active';
}

linkList.addEventListener('click', (e) => {
   if (e.target.tagName === 'BUTTON') {
      const clickedButton = e.target;
      //remove the 'active' class from any other button in the linkList
      for (let listItem of linkList.children) {
         let button = listItem.firstElementChild;
         button.classList.remove('active');
      }
      clickedButton.className = 'active';
      showPage(data, clickedButton.textContent);
   }
})

/*
Create the Search component
This will allow the user to search for a student in the database
*/
const header = document.querySelector('header');
header.insertAdjacentHTML('beforeend', `
   <label for="search" class="student-search">
   <span>Search by name</span>
   <input id="search" placeholder="Search by name...">
   <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
`);

function searchStudents(searchInput, students) {
   console.log('searchInput', searchInput);
   console.log('students', students);
   let searchResults = [];
   for (let i = 0; i < students.length; i++) {
      if ((searchInput.length !== 0) &&
         (students[i].name.first.toLowerCase().includes(searchInput.toLowerCase()) ||
            (students[i].name.last.toLowerCase().includes(searchInput.toLowerCase())))) {
         searchResults.push(students[i]);
      }
   }
   //@todo: Sort based on relevance? or alphabetical order?
   return searchResults;
}

// Call functions
showPage(data, 1);
addPagination(data);
console.log(searchStudents('ethel', data));