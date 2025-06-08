import styles from "./header.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { uppercase } from "../../helpers/stringHelpers";
import {useTrackerStore} from '../../store';

export function Header() {

  const isEnabled = useTrackerStore((state) => state.isEnabled)
  const setIsEnabled = useTrackerStore((state) => state.setIsEnabled)
  const inputValue = useTrackerStore((state) => state.inputValue)
  const setInputValue = useTrackerStore((state) => state.setInputValue)
  const addAssignment = useTrackerStore((state) => state.addAssignment)

  return (
    <header className={styles.header}>
      {/* This is simply to show you how to use helper functions */}
      <h1>{uppercase("bcit")} Assignment Tracker</h1>
      <form 
        className={styles.newAssignmentForm}
        onSubmit={(e) => {
          e.preventDefault();
          addAssignment({
            id: Date.now(),
            title: inputValue.trim(),
            completed: false
          });
          setInputValue("");
          setIsEnabled(false);
        }}>
        <input 
          placeholder="Add a new assignment" 
          type="text"
          value={inputValue} 
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsEnabled(e.target.value.trim().length > 0);
          }}
          />
        <button disabled={!isEnabled}>
          Create <AiOutlinePlusCircle size={20} />
        </button>
      </form>
    </header>
  );
}
