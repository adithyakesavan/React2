import React, { useState, useContext } from "react";
import "./TasksContainer.styles.css";
import { Link } from "react-router-dom";
import plus from "../../../assets/svg/plus.svg";
import Task from "./Task";
import { FetchedContext } from "../../../App";
import AddTaskBox from "./AddTaskBox";
import EditBox from "./EditBox";
import Description from "./Description";

const TasksContainer = () => {
  const [taskBox, setTaskBox] = useState(false);
  const [isCompletedTab, setIsCompletedTab] = useState(false);

  // Accessing Data Compming from provider
  const { tasks, setTasks, isDescriptionOpen } = useContext(FetchedContext);

  // setting up Filter Task Category for work events school

  const [filterTaskCategory, setFilterTaskCategory] = useState("all");

  const showPending = () => {
    setIsCompletedTab(false);
  };

  const showCompleted = () => {
    setIsCompletedTab(true);
  };

  const [editBox, setEditBox] = useState(false);
  const [editData, setEditData] = useState({
    id: "",
    title: "",
    date: "",
    time: "",
    desc: "",
    category: "",
    alert: false,
  });

  const editTaskBox = (id) => {
    console.log("Value of editbox", editBox);
    setEditBox(!editBox);
    console.log("Value of after editbox", editBox);
    console.log("Open Task Box,", id);
    const editableTask = tasks.find((task) => task.id === id);
    setEditData(editableTask);
  };

  const editBoxProps = {
    editData,
    setEditData,
    editBox,
    setEditBox,
  };

  const [searchInput, setSearchInput] = useState("");
  const [searchedTask, setSearchedTask] = useState(null);

  const handleSearch = (e) => {
    let search = e.target.value;
    // e.preventDefault();
    console.log("Handling Search, value:", search);
    if (search === "") {
      console.log("Search Field is empty");
      setSearchedTask(null);
      setTasks(tasks);
      // return;
    } else {
      const regex = new RegExp(search, "i");
      const searchedTasks = tasks.filter((task) => regex.exec(task.title));

      console.log("Searched Tasks:", searchedTasks);
      setSearchedTask(searchedTasks);
      // setTasks(searchedTasks)
    }
  };

  let date = new Date();
  let monthsName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let day = date.getDate();
  let monthIndex = date.getMonth();
  let month = monthsName[monthIndex];
  let year = date.getFullYear();

  return (
    <div className="tasks-main-container">
      <div className="tasks-category">
        <div
          className={`tasks-category-item ${filterTaskCategory==="all" ? "active-item" : ""}`}
          onClick={() => {
            setFilterTaskCategory("all");
          }}
        >
          All
        </div>
        <div
          className={`tasks-category-item ${filterTaskCategory==="Personal" ? "active-item" : ""}`}
          onClick={() => {
            setFilterTaskCategory("Personal");
          }}
        >
          Personal
        </div>
        <div
          className={`tasks-category-item ${filterTaskCategory==="Work" ? "active-item" : ""}`}
          onClick={() => {
            setFilterTaskCategory("Work");
          }}
        >
          Work
        </div>
        <div
          className={`tasks-category-item ${filterTaskCategory==="Events" ? "active-item" : ""}`}
          onClick={() => {
            setFilterTaskCategory("Events");
          }}
        >
          Events
        </div>
      </div>
      <div className="container-header">
        <div className="heading">
          <div className="heading-tasks">Tasks</div>
          <div className="date">
            {month} {day}, {year}
          </div>
        </div>

        <div className="pen-comp-toggler">
          <div
            className={`pending-btn ${isCompletedTab ? "" : "active-item"}`}
            onClick={showPending}
          >
            Pending
          </div>
          <div
            className={`complete-btn ${isCompletedTab ? "active-item" : ""}`}
            onClick={showCompleted}
          >
            Completed
          </div>
        </div>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search"
          value={searchInput}
          className="search-bar"
          name="searchbox"
          onChange={(e) => {
            setSearchInput(e.target.value);
            handleSearch(e);
          }}
        />
        <input value="Search" type="button" className="text-search-btn" />
      </div>
      {/* Rendering Task Component and Handling Search Also */}
      <div className="tasks-container">
        {filterTaskCategory === "all"
          ? tasks
              .filter((task) => task.completed === isCompletedTab)
              .map((task) => {
                return (
                  <Task key={task.id} value={task} editTaskBox={editTaskBox} />
                );
              })
          : filterTaskCategory === "Personal"
          ? tasks
              .filter(
                (task) => task.category === "Personal" || !task.category)
              .map((task) => {
                return (
                  <Task key={task.id} value={task} editTaskBox={editTaskBox} />
                );
              })
          : filterTaskCategory
          ? tasks
              .filter((task) => task.category === filterTaskCategory)
              .map((task) => {
                return (
                  <Task key={task.id} value={task} editTaskBox={editTaskBox} />
                );
              })
          : searchedTask !== null
          ? searchedTask.map((task) => {
              return (
                <Task key={task.id} value={task} editTaskBox={editTaskBox} />
              );
            })
          : tasks
              .filter((task) => task.completed === isCompletedTab)
              .map((task) => {
                return (
                  <Task key={task.id} value={task} editTaskBox={editTaskBox} />
                );
              })}
      </div>
      <div
        className="add-tasks"
        onClick={() => {
          setTaskBox(!taskBox);
        }}
      >
        <img src={plus} alt="" />
      </div>

      {/* <AddTaskBox/> */}
      {taskBox && <AddTaskBox taskBox={taskBox} setTaskBox={setTaskBox} />}
      {console.log("Value of Editbox befor Logging!", editBox)}
      {editBox && <EditBox {...editBoxProps} />}
      {isDescriptionOpen && <Description editTaskBox={editTaskBox} />}
    </div>
  );
};

export default TasksContainer;
