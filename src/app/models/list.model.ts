import { Task } from './task.model';

export interface List {
  id: string;
  name: string;
  tasks: Task[];
}