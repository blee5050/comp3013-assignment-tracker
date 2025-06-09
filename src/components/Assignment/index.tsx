import styles from "./assignment.module.css";
import { TbTrash } from "react-icons/tb";
import {useTrackerStore} from '../../store';
import { BsCheckLg } from "react-icons/bs";

interface AssignmentProps{
  data:{
    id: number;
    title: string;
    completed: boolean;
    dueDate: Date; 
  };
}

function diffInDays(due: Date, today: Date): number{
  const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const dueDate = startOfDay(due);
  const todayDate = startOfDay(today);
  const msPerDay = 1000 * 60 * 60 * 24;
  const diffInDays = Math.floor((dueDate.getTime() - todayDate.getTime()) / msPerDay);

  return diffInDays;
};

function calculateDue(due: Date, today: Date): string{
  
  const diff = diffInDays(due, today);

  if(diff == 0){
    return 'Due: today';
  }
  else if(diff == 1){
    return 'Due: tomorrow';
  }
  else if (diff > 1){
    return `Due: ${diff} days`;
  }
  else {
    return `Overdue by ${Math.abs(diff)} day${Math.abs(diff) == 1 ? '' : 's'}`;
  }};

export function Assignment({data}: AssignmentProps) {

  const removeAssignment = useTrackerStore((state) => state.removeAssignment);
  const setNumberOfCompleted = useTrackerStore((state) => state.setNumberOfCompleted);
  const markComplete = useTrackerStore((state) => state.markComplete);
  const completedAssignments = useTrackerStore((state) => state.completedAssignments);
  const selected = useTrackerStore((state) => state.selected);
  const currentDate = new Date();

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
      <p>
        <span className={data.completed ? styles.textCompleted : ''}>{data.title}</span>
        <span className={`${styles.dueDate} ${diffInDays(data.dueDate, currentDate)<= 1 ? styles.warning : ''}`}>
          {data.dueDate ? calculateDue(data.dueDate, currentDate) : ''}</span>
      </p>

      <button 
        className={styles.deleteButton}
        onClick={() => removeAssignment(data.id)}>
        <TbTrash size={20} />
      </button>
    </div>
  );
}