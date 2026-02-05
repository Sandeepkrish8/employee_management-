// Array to store employees
let employees = [];
let nextId = 1;

// Get DOM elements
const form = document.getElementById('employeeForm');
const nameInput = document.getElementById('name');
const professionInput = document.getElementById('profession');
const ageInput = document.getElementById('age');
const messageDiv = document.getElementById('message');
const employeeList = document.getElementById('employeeList');

// Add event listener to form
form.addEventListener('submit', function(e) {
    e.preventDefault();
    addEmployee();
});

// Function to display message
function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    
    // Hide message after 3 seconds
    setTimeout(() => {
        messageDiv.className = 'message';
        messageDiv.style.display = 'none';
    }, 3000);
}

// Function to add employee
function addEmployee() {
    const name = nameInput.value.trim();
    const profession = professionInput.value.trim();
    const age = ageInput.value.trim();
    
    // Validate required fields
    if (!name || !profession || !age) {
        showMessage('Error: All fields are required!', 'error');
        return;
    }
    
    // Create employee object
    const employee = {
        id: nextId++,
        name: name,
        profession: profession,
        age: parseInt(age)
    };
    
    // Add to employees array
    employees.push(employee);
    
    // Show success message
    showMessage('Success! Employee has been added successfully.', 'success');
    
    // Clear form
    form.reset();
    
    // Render employees
    renderEmployees();
}

// Function to delete employee
function deleteEmployee(id) {
    // Remove employee from array
    employees = employees.filter(emp => emp.id !== id);
    
    // Re-render employees
    renderEmployees();
}

// Function to render employees
function renderEmployees() {
    // Clear current list
    employeeList.innerHTML = '';
    
    // If no employees, the CSS :empty pseudo-class will show the message
    if (employees.length === 0) {
        return;
    }
    
    // Map through employees and create HTML
    employees.forEach(employee => {
        const employeeCard = document.createElement('div');
        employeeCard.className = 'employee-card';
        
        employeeCard.innerHTML = `
            <div class="employee-info">
                <p><strong>ID:</strong> ${employee.id}</p>
                <p><strong>Name:</strong> ${employee.name}</p>
                <p><strong>Profession:</strong> ${employee.profession}</p>
                <p><strong>Age:</strong> ${employee.age}</p>
            </div>
            <button class="btn-delete" onclick="deleteEmployee(${employee.id})">Delete User</button>
        `;
        
        employeeList.appendChild(employeeCard);
    });
}

// Initial render (will show "No employees added yet" message)
renderEmployees();
