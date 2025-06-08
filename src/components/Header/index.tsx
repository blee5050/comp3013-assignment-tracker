import styles from "./header.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { uppercase } from "../../helpers/stringHelpers";
import {useTrackerStore} from '../../store';

export function Header() {

  const isEnabled = useTrackerStore((state) => state.isEnabled)
  const toggle = useTrackerStore((state) => state.toggle)
  const inputValue = useTrackerStore((state) => state.inputValue)
  const setInputValue = useTrackerStore((state) => state.setInputValue)

  return (
    <header className={styles.header}>
      {/* This is simply to show you how to use helper functions */}
      <h1>{uppercase("bcit")} Assignment Tracker</h1>
      <form className={styles.newAssignmentForm}>
        <input 
          placeholder="Add a new assignment" 
          type="text"
          value={inputValue} 
          onChange={(e) => {
            setInputValue(e.target.value)

            if(e.target.value.trim().length > 0 && !isEnabled){
              toggle()
            }
            else if(e.target.value.trim().length == 0 && isEnabled){
              toggle()
            }
          }}
          />
        <button disabled={!isEnabled}>
          Create <AiOutlinePlusCircle size={20} />
        </button>
      </form>
    </header>
  );
}
