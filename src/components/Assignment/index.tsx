import styles from "./assignment.module.css";
import { TbTrash } from "react-icons/tb";
import {useTrackerStore} from '../../store';
import { BsCheckCircleFill } from "react-icons/bs";

interface AssignmentProps{
  data:{
    id: number;
    title: string;
    completed: boolean;
  };
}

export function Assignment({data}: AssignmentProps) {
  return (
    <div className={styles.assignment}>
      <button className={styles.checkContainer}>
        <div />
      </button>

      <p>{data.title}</p>

      <button className={styles.deleteButton}>
        <TbTrash size={20} />
      </button>
    </div>
  );
}
/*<div className={styles.assignment}>
      <button className={styles.checkContainer}>
        <div />
      </button>

      <p>Some Title</p>

      <button className={styles.deleteButton}>
        <TbTrash size={20} />
      </button>
    </div> */