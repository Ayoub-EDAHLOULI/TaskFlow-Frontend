import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "./store";
import { jwtDecode } from "jwt-decode";

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  isComplete: boolean;
  isImportant: boolean;
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

// Create a slice
const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    fetchTasksStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchTasksSuccess(state, action) {
      state.loading = false;
      state.tasks = action.payload;
    },
    fetchTasksFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export actions
export const { fetchTasksStart, fetchTasksSuccess, fetchTasksFailure } =
  taskSlice.actions;

export default taskSlice.reducer;

// Async thunk to fetch tasks
export const fetchTasks = () => async (dispatch: AppDispatch) => {
  dispatch(fetchTasksStart());

  // Get the user Id from the token
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const decodedToken = jwtDecode(token); // Decode the JWT token
      return decodedToken.sub; // Use the 'sub' field for the user ID
    } catch (error) {
      console.error("Failed to decode token", error);
      return null;
    }
  };

  const userId = getUserIdFromToken();
  if (!userId) {
    dispatch(fetchTasksFailure("User ID not found"));
    return;
  }

  try {
    const response = await axios.get(
      `http://localhost:5174/api/user/tasks/${userId}`
    );
    dispatch(fetchTasksSuccess(response.data.tasks));
  } catch {
    dispatch(fetchTasksFailure("Failed to fetch tasks"));
  }
};
