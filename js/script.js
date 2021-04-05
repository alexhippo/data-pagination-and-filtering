/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
Author: Alex Hipolito
GitHub: @alexhippo
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
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
         studentList.innerHTML += `
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
         `;
      }
   }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
   const numberofPages = (list.length / 9) + 1; //index starts at 1
   const linkList = document.querySelector('ul.link-list');
   linkList.innerHTML = ``;

   for (let i = 1; i <= numberofPages; i++) {
      //@todo: use insertAdjacentHTML and beforeend
      linkList.innerHTML += `
         <li>
            <button type="button">${i}</button>
         </li>
      `;
   }

   const activeButton = linkList.firstElementChild;
   activeButton.className = 'active';
}




// Call functions
showPage(data, 5);
addPagination(data);