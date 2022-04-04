import TodoModel from "../models/todo";

export const addTodosAPI = async (todo: TodoModel) => {
	try {
		const response = await fetch("http://51.250.12.157:3333/todos/", {
			method: "POST",
			mode: "cors",
			body: JSON.stringify({ ...todo }),
			headers: {
				"Content-Type": "application/json",
			}
		});

		if (!response.ok) {
			throw new Error("Sending Todo Fail");
		}

		const data = await response.json();
		return data;
	} catch (e) {
		throw new Error("Sending Todo Fail")
	}
};

export const removeTodoAPI = async (id: string) => {
	try {
		const response = await fetch(`http://51.250.12.157:3333/todos/${id}`, {
			method: "DELETE",
			mode: "cors",
			headers: {
				"Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
				"Access-Control-Allow-Origin": "localhost",
				"Access-Control-Allow-Credentials": "true",
				"Access-Control-Allow-Methods": "GET,DELETE,POST,PUT"

			}
		});

		if (!response.ok) {
			throw new Error("Todo Delete Fail");
		}
	} catch (error) {
		throw new Error("Cannot Delete Todos")
	}
};

export const editTodoAPI = async (id: string, updateName: string, updateDescription: string) => {
	try {
		const response = await fetch(`http://51.250.12.157:3333/todos/${id}`, {
			method: "PUT",
			mode: "cors",
			body: JSON.stringify({ name: updateName, description: updateDescription }),
			headers: {
				'Content-Type': 'application/json'
			}
		}
		);

		if (!response.ok) {
			throw new Error("Updating Todo Fail")
		}

		const data = await response.json();
		console.log(response);

	} catch (error) {
		throw new Error("Updating Todo Fail")
	}
};

export const checkTodoAPI = async (id: string, updateComplete: boolean) => {
	try {
		const response = await fetch(`http://51.250.12.157:3333/todos/${id}`, {
			method: "PUT",
			body: JSON.stringify({ isDone: updateComplete }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (!response.ok) {
      throw new Error("Updating Todo Fail");
    }
  } catch (error) {
    throw new Error("Updating Todo Fail");
  }
};


export const getTodosAPI = async () => {
  try {
    const response = await fetch(
      "http://51.250.12.157:3333/todos/"
    );
		if (!response.ok) {
			throw new Error("Cannot get Todos, please check source");
		}

		const data = await response.json().then(res => res.todos);
		const loadedTodos: TodoModel[] = [];
		console.log(loadedTodos);
		
		for (const key of data) {
			loadedTodos.push({
				id: key.id,
				name: key.name,
				description: key.description,
				isDone: key.isDone,
			});
		}

		return loadedTodos;
	} catch (error) {
		throw new Error("Cannot get Todos")
	}
};