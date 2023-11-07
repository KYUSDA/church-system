function updateCountdown() {
    const targetDate = new Date('2023-11-11T23:59:59').getTime();
    const currentDate = new Date().getTime();
    const timeRemaining = targetDate - currentDate;

    if (timeRemaining <= 0) {
      // If the target date has passed, you can display a message or take some action here.
      document.getElementById('countdown').textContent = 'Event has started!';
      return;
    }

    const days = String(Math.floor(timeRemaining / (1000 * 60 * 60 * 24)).toString().padStart(2, '0'));
    const hours = String(Math.floor((timeRemaining % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)).toString().padStart(2, '0')));
    const minutes = String(Math.floor((timeRemaining % (1000 * 60 * 60) / (1000 * 60)).toString().padStart(2, '0')));
    const seconds = String(Math.floor((timeRemaining % (1000 * 60) / 1000).toString().padStart(2, '0')));

    document.getElementById('days').innerHTML = days + " <br> Days";
    document.getElementById('hours').innerHTML = hours + " <br> Hours";
    document.getElementById('mins').innerHTML = minutes + " <br> Mins";
    document.getElementById('secs').innerHTML = seconds + " <br> Secs";
  }

  // Update the countdown every second
  setInterval(updateCountdown, 1000);

  // Initial call to set the countdown when the page loads
  updateCountdown();



  // When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the header
let header = document.getElementById("myHeader");

// Get the offset position of the navbar
let sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.scrollY > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}




// Get the search icon and search box elements by their IDs
const searchIcon = document.getElementById('search-icon');
const searchBox = document.getElementById('search-box');

// Add a click event listener to the search icon
searchIcon.addEventListener('click', function() {
    // Toggle the visibility of the search box
    if (searchBox.style.display === 'none' || searchBox.style.display === '') {
        searchBox.style.display = 'inline';
        // make the searchBox width be 100% of the parent element
        searchBox.style.width = '100%';
    } else {
        searchBox.style.display = 'none';
    }
});
