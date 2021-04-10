/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
Author: Alex Hipolito
GitHub: @alexhippo
*/

const studentList = document.querySelector('ul.student-list');
const linkList = document.querySelector('ul.link-list');
const itemsPerPage = 9;

/*
`showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = page * itemsPerPage;
   studentList.innerHTML = '';

   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         const studentName = `${list[i].name.first} ${list[i].name.last}`
         studentList.insertAdjacentHTML('beforeend', `
            <li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src=${list[i].picture.large} alt="Profile Picture of ${studentName}">
                  <h3>${studentName}</h3>
                  <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${list[i].registered.date}</span>
               </div>
            </li>
         `)
      }
   }
};

/*
Append Search component to the Header
*/
const header = document.querySelector('header');
const searchComponent = `
   <label for="search" class="student-search">
   <span>Search by name</span>
   <input id="search" placeholder="Search by name...">
   <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
`
header.insertAdjacentHTML('beforeend', searchComponent);

const searchBar = document.querySelector('#search');
const searchButton = searchBar.nextElementSibling;

/*
`searchStudents` function
This function will search for students based off the searchInput and return the search results
*/
function searchStudents(searchInput, students) {
   let searchResults = [];
   for (let i = 0; i < students.length; i++) {
      if ((searchInput) &&
         (students[i].name.first.toLowerCase().includes(searchInput.toLowerCase()) ||
            students[i].name.last.toLowerCase().includes(searchInput.toLowerCase()))) {
         searchResults.push(students[i]);
      }
   }
   return searchResults;
};

/*
`showSearchResults` function
This will display and paginate the results returned by searchStudents() in the student list
If there are no search results, a "No results found" style message will be displayed
If there is no searchInput (e.g. search was cleared by the user), the full student list will be displayed by default
*/
function showSearchResults(searchInput) {
   if (searchInput) {
      const searchResults = searchStudents(searchBar.value, data);
      if (searchResults.length > 0) {
         showPage(searchResults, 1);
         addPagination(searchResults);
      } else {
         studentList.innerHTML = `
            <div>
               <h1>Sorry, we couldn't find a student with that name. Please check your spelling or try a different name.</h1>
            </div>
         `
         addPagination(searchResults);
      }
      linkList.addEventListener('click', (event) => {
         if (event.target.tagName === 'BUTTON') {
            showPage(searchResults, event.target.textContent);
         }
      })
   } else {
      showDefaultStudentList();
   }
};

function showDefaultStudentList() {
   showPage(data, 1);
   addPagination(data);
};

searchButton.addEventListener('click', () => {
   showSearchResults(searchBar.value);
});

searchBar.addEventListener('keyup', (event) => {
   showSearchResults(event.target.value);
});

/*
`addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
   linkList.innerHTML = '';
   if (list.length > 0) {
      const numberofPages = Math.ceil(list.length / itemsPerPage);
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

   linkList.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
         const clickedButton = event.target;

         for (let listItem of linkList.children) {
            let button = listItem.firstElementChild;
            button.classList.remove('active');
         }
         clickedButton.className = 'active';
         showPage(data, clickedButton.textContent);
      }
   });
};

//Call functions - initialise page
showDefaultStudentList();