import { create } from 'zustand'

interface Assignment{
  id: number;
  title: string;
  completed: boolean;
}

interface TrackerState {
  isEnabled: boolean;
  setIsEnabled: (value: boolean) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  assignments: Assignment[];
  completedAssignments: number;
  setNumberOfCompleted: (id: number) => void;
  addAssignment: (assignment: Assignment) => void;
  removeAssignment: (id: number) => void;
  markComplete: (id: number) => void;
}

export const useTrackerStore = create<TrackerState>()((set) => ({
  isEnabled: false,
  inputValue: '',
  assignments: [],
  completedAssignments: 0,
  // function updates the inputValue state with a given string
  setInputValue: (value) => set({inputValue: value}),
  // function updates the isEnabled state with a given boolean value
  setIsEnabled: (value) => set({isEnabled: value}),
  // function returns new array with new Assignment added to the end
  addAssignment: (assignment) => set((state) => ({assignments: [...state.assignments, assignment]})),
  /*
  function removes specified assignment from the array based on its ID
  if assignment was was completed, the 'completedAssignments' count is decremented 
  if not, it is left alone
  */
  removeAssignment: (id) => set((state) => {
    const assignStatus = state.assignments.find(a => a.id == id);
    const updatedAssignments = state.assignments.filter((assignment) => assignment.id != id);
    const updateCount = assignStatus && assignStatus.completed
    ? state.completedAssignments - 1
    : state.completedAssignments;
    return{
      assignments: updatedAssignments,
      completedAssignments: updateCount
    };
  }),
  /*
  function updates the assignments state by toggling the completed property
  of the specified assignment, matched by ID 
  */
  markComplete: (id) => set((state) => ({assignments: state.assignments.map((assignment) => 
    assignment.id == id ? {...assignment, completed: !assignment.completed} : assignment
  )})),
  /*
  function updates the completedAssignments state (increments or decrements) 
  based on whether assignment is completed or not 
  */ 
  setNumberOfCompleted: (id) => set((state) => {
    const assignStatus = state.assignments.find(a => a.id == id);
    if (assignStatus && !assignStatus.completed){
      return {completedAssignments: state.completedAssignments + 1}; 
    }
    else{
      return {completedAssignments: state.completedAssignments - 1};
    }}),

}))
