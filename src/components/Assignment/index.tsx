import styles from "./assignment.module.css";
import { TbTrash } from "react-icons/tb";
import {useTrackerStore} from '../../store';
import { BsCheckLg } from "react-icons/bs";

interface AssignmentProps{
  data:{
    id: number;
    title: string;
    completed: boolean;
  };
}

export function Assignment({data}: AssignmentProps) {

  const removeAssignment = useTrackerStore((state) => state.removeAssignment);
  const setNumberOfCompleted = useTrackerStore((state) => state.setNumberOfCompleted);
  const markComplete = useTrackerStore((state) => state.markComplete);
  const completedAssignments = useTrackerStore((state) => state.completedAssignments);

  return (
    <div className={styles.assignment}>
      <button 
        className={`${styles.checkContainer} ${data.completed ? styles.completed : ''}`}
        onClick={() => {
          setNumberOfCompleted(data.id);
          markComplete(data.id);
        }}>
        <div>
          {data.completed && <BsCheckLg size={16} />}
        </div>
      </button>

      <p className={data.completed ? styles.textCompleted : ''}>{data.title}</p>

      <button 
        className={styles.deleteButton}
        onClick={() => removeAssignment(data.id)}>
        <TbTrash size={20} />
      </button>
    </div>
  );
}