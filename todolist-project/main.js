let todos = [];
const todoInput = document.getElementById('todoInput');
let editingTodoId = null;

todoInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        if (editingTodoId !== null) {
            updateTodo();
        } else {
            addTodo();
        }
    }
});

function addTodo() {
    const todoText = todoInput.value.trim();

    if (todoText === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Todo tidak boleh kosong!',
            background: '#f0f8ff',
            iconColor: '#ff6b6b'
        });
        return;
    }

    todos.push({ 
        id: Date.now(), 
        text: todoText, 
        completed: false 
    });

    renderTodos();
    todoInput.value = '';

    Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Todo baru ditambahkan',
        timer: 1500,
        background: '#f0fff4',
        iconColor: '#48bb78'
    });
}

function renderTodos() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-md';
        
        li.innerHTML = `
            <span class="${todo.completed ? 'line-through text-gray-500' : 'text-gray-700'}">${todo.text}</span>
            <div class="flex space-x-2">
                <button onclick="toggleTodo(${todo.id})" class="text-green-500 hover:text-green-600 transition duration-300 ease-in-out transform hover:scale-110">
                    <i class="fas fa-check-circle"></i>
                </button>
                <button onclick="startEditTodo(${todo.id})" class="text-blue-500 hover:text-blue-600 transition duration-300 ease-in-out transform hover:scale-110">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteTodo(${todo.id})" class="text-red-500 hover:text-red-600 transition duration-300 ease-in-out transform hover:scale-110">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;

        todoList.appendChild(li);
    });
}

function toggleTodo(id) {
    todos = todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    renderTodos();
}

function startEditTodo(id) {
    const todo = todos.find(t => t.id === id);
    todoInput.value = todo.text;
    todoInput.focus();
    editingTodoId = id;
    todoInput.classList.add('border-yellow-500');
}

function updateTodo() {
    const newText = todoInput.value.trim();
    
    if (newText === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Todo tidak boleh kosong!',
            background: '#f0f8ff',
            iconColor: '#ff6b6b'
        });
        return;
    }

    todos = todos.map(todo => 
        todo.id === editingTodoId ? { ...todo, text: newText } : todo
    );

    renderTodos();
    todoInput.value = '';
    editingTodoId = null;
    todoInput.classList.remove('border-yellow-500');

    Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Todo berhasil diubah',
        timer: 1500,
        background: '#f0fff4',
        iconColor: '#48bb78'
    });
}

function deleteTodo(id) {
    Swal.fire({
        title: 'Hapus Todo?',
        text: 'Yakin ingin menghapus todo ini?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, Hapus!',
        background: '#fff5f5',
        iconColor: '#f56565'
    }).then((result) => {
        if (result.isConfirmed) {
            todos = todos.filter(todo => todo.id !== id);
            renderTodos();
            Swal.fire({
                title: 'Dihapus!',
                text: 'Todo berhasil dihapus.',
                icon: 'success',
                background: '#f0fff4',
                iconColor: '#48bb78'
            });
        }
    });
}

function clearCompletedTodos() {
    Swal.fire({
        title: 'Hapus Todo Selesai?',
        text: 'Yakin ingin menghapus semua todo yang sudah selesai?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, Hapus!',
        background: '#fff5f5',
        iconColor: '#f56565'
    }).then((result) => {
        if (result.isConfirmed) {
            todos = todos.filter(todo => !todo.completed);
            renderTodos();
            Swal.fire({
                title: 'Dihapus!',
                text: 'Semua todo selesai telah dihapus.',
                icon: 'success',
                background: '#f0fff4',
                iconColor: '#48bb78'
            });
        }
    });
}

function clearAllTodos() {
    Swal.fire({
        title: 'Hapus Semua Todo?',
        text: 'Yakin ingin menghapus SEMUA todo?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, Hapus Semua!',
        background: '#fff5f5',
        iconColor: '#f56565'
    }).then((result) => {
        if (result.isConfirmed) {
            todos = [];
            renderTodos();
            Swal.fire({
                title: 'Dihapus!',
                text: 'Semua todo telah dihapus.',
                icon: 'success',
                background: '#f0fff4',
                iconColor: '#48bb78'
            });
        }
    });
}