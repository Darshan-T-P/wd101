document.addEventListener("DOMContentLoaded",()=>{
    const today =new Date();
    const mindate=new Date(today.getFullYear()-55,today.getMonth(),today.getDate()).toISOString().split('T')[0];
    const maxdate=new Date(today.getFullYear()-18,today.getMonth(),today.getDate()).toISOString().split('T')[0];
   
   const dob=document.getElementById("dob");
   dob.setAttribute("min",mindate);
   dob.setAttribute("max",maxdate);
});

let userform = document.getElementById("form");

const retrieveEntries = () => {
    let entries = localStorage.getItem("userEntries");

    if (entries) {
        entries = JSON.parse(entries);
    } else {
        entries = [];
    }
    return entries;
}

// Initialize entries with existing data from localStorage
let user_Entries = retrieveEntries();

const displayEntries = () => {
    const entries = retrieveEntries();
  

    // Map through the entries and create table rows
    const tableEntries = entries.map((entry) => {
        const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
        const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
        const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
        const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
        const acceptTermsCell = `<td class='border px-4 py-2'>${entry.acceptterms ? "Yes" : "No"}</td>`;

        const row = `<tr>${nameCell} ${emailCell} ${dobCell} ${passwordCell} ${acceptTermsCell}</tr>`;
        return row;
    }).join("\n");

    // Define the complete table structure
    const table = `<table class="table-auto w-full">
    <thead>
      <tr>
        <th class="px-4 py-2">Name</th>
        <th class="px-4 py-2">Email</th>
        <th class="px-4 py-2">Date of Birth</th>
        <th class="px-4 py-2">Password</th>
        <th class="px-4 py-2">Accepted terms?</th>
      </tr>
    </thead>
    <tbody>${tableEntries}</tbody>
    </table>`;

    let details = document.getElementById("userEntries");
    details.innerHTML = table;
}

const saveUser = (event) => {
    event.preventDefault();

    const name = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptterms = document.getElementById("agree").checked;

    if (!validAge()) {
        alert("You must be between 18 and 55 years old.");
        return; // Stop the function if age is invalid
    }

    const entry = {
        name,
        email,
        password,
        dob,
        acceptterms
    };

    // Retrieve current entries, add new entry, and save to localStorage
    user_Entries.push(entry);
    localStorage.setItem("userEntries", JSON.stringify(user_Entries));

    displayEntries(); // for  Update table after saving
}

// Validate age to ensure the user is between 18 and 55
const validAge = () => {
    const dobInput = document.getElementById("dob").value;
    if (!dobInput) return false;

    const dob = new Date(dobInput);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDifference = today.getMonth() - dob.getMonth();
    const dayDifference = today.getDate() - dob.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        age--;
    }

    return age >= 18 && age <= 55; 
    // Return true if age is between 18 and 55, false otherwise
}

// Add event listener for form submission
userform.addEventListener("submit", saveUser);

// Display entries on page load
displayEntries();
