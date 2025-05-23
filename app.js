document.getElementById('search-btn').addEventListener('click', async () => {
    const resultDiv = document.getElementById('todo-result'); // <-- use 'todo-result'
    resultDiv.innerHTML = '<p>Loading...</p>';
    const fetchOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const API_URL = 'https://dummyjson.com/todos';

    try {
        const response = await fetch(API_URL, fetchOptions);
        if (!response.ok) {
            throw new Error('Failed to fetch todos');
        }
        const data = await response.json();
        if (!data.todos || data.todos.length === 0) {
            resultDiv.innerHTML = '<p>No todos found.</p>';
            return;
        }
        const searchId = document.getElementById('todo-id').value.trim();
        const todo = data.todos.find(t => t.id.toString() === searchId);
        if (!todo) {
            resultDiv.innerHTML = '<p>No todo found with that ID.</p>';
            return;
        }
        resultDiv.innerHTML = `
            <ul class="todo-list">
            <li>
                <strong>ID:</strong> ${todo.id} <br>
                <strong>Todo:</strong> ${todo.todo} <br>
                <strong>Completed:</strong> ${todo.completed ? 'Yes' : 'No'}
            </li>
            </ul>
        `;
    } catch (error) {
        resultDiv.innerHTML = `<p>${error.message}</p>`;
    }
});