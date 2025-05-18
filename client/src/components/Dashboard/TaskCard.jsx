import React from "react";

const TaskCard = ({ data }) => {
  const showEditDiv = (e, id) => {
    e.preventDefault();
    window.sessionStorage.setItem("editTaskId", id);
    window.location.reload();
  };

  return (
    <>
      <style jsx global>{`
        @media (max-width: 400px) {
          .text-center-373 {
            text-align: center;
          }
        }
        @media (max-width: 700px) {
          .priority-center {
            margin: auto;
          }
        }
      `}</style>

      <button
        className="bg-white rounded px-4 w-[100%] py-2 hover:shadow transition-all duration-300 bg-"
        onClick={(event) => showEditDiv(event, data._id)}
      >
        <div className="flex items-center justify-between flex-wrap ">
          <h1 className="text-lg font-semibold mb-2 w-full sm:w-auto text-pink-900">
            {data.title}
          </h1>

          {/* <div className={`text-sm ${data.priority === "Low" ? "text-green-500 bg-green-100" : data.priority === "Medium" ? "text-yellow-500 bg-yellow-100" : "text-red-500 bg-red-100"} px-2 rounded-full`}>
    <p>{data.priority}</p>
</div>  */}
          <div
            className={`text-md ${
              data.priority === "Low"
                ? "text-green-600 bg-green-200"
                : data.priority === "Medium"
                ? "text-yellow-600   bg-yellow-200"
                : "text-red-600   bg-red-200"
            } px-2 rounded-full priority-center`}
            style={{
              fontSize: "0.7rem", // Default font size
              paddingLeft: "0.5rem",
              paddingRight: "0.5rem",
              borderRadius: "0.45rem",
              display: "inline-flex", // Use inline-flex for better centering control
              alignItems: "center",
              justifyContent: "center",
              // Add auto margins for centering
              width: "fit-content",
            }}
          >
            <p>{data.priority}</p>
          </div>
        </div>
        <hr className="my-2" />
        <p
          className="text-sm text-purple-700 text-start sm:text-center text-center-373"
          style={{}}
        >
          {data.description}{" "}
        </p>
      </button>
    </>
  );
};

export default TaskCard;
