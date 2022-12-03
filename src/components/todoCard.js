import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import moment from "moment";


// passing default value to props
const Todocard = ({ todo = {} }) => {
  const dispatch = useDispatch()

  // converting date to required format
  const convertDate = (date) => {
    return moment(date).format('L'); // December 2, 2022 1:25 PM
  }
 
  return (
  <>
    <div className=" bg-gray-700 px-2 py-1 rounded-md flex justify-between items-center ">
     <div className="flex flex-col justify-between gap-y-1">
     <p className="text-lg font-semibold text-white cursive">{todo.todo}</p>
     <p className="todo-date text-xs text-white capitalize">created at: {convertDate(todo.createdAt)}</p>
      
     </div>
     <div className="flex items-center gap-x-2">
        <MdModeEdit size={25} className="text-white" />
        <AiFillDelete size={25} className="text-white" />
      </div>
      
    </div>
   
  </>
  );
};

export default Todocard;
