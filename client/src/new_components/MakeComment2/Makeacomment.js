import "./makecomment.css";
import profImage from "./prof.jpg";
import { commtdata } from "./data";
import { useState } from "react";

export function Makeacomment() {
  const [len, setCommentlen] = useState(0);
  const [comment, setComment] = useState("");

  const handleInputChange = (event) => {
    let inputstr = event.target.value;
    setCommentlen(inputstr.length);
    setComment(inputstr);
  };

  return (
    <div
      className="manpge fadeInUp bg-cover bg-no-repeat text-black"
      style={{ backgroundImage: "url('./so-white.png')" }}
    >
      <div class="main flex flex-row items-center justify-center">
        <div class="main2 flex justify-center flex-col w-1/2 h-6/10 ml-0">
          <div className="mx-auto relative top-10/4 left-10/4">
            <img
              src={profImage}
              class="bg-white rounded-full border-2 border-black m-4"
              style={{ width: "170px", height: "170px" }}
              alt="profile"
            ></img>
          </div>
          <div className="info block p-0 ">
            <div class="text-center">
              {/* Profile Data here from backend */}
              <p>ABC</p>
              <p>Roll No:220003054</p>
            </div>
          </div>
        </div>

        <div class="flex justify-center  my-20 flex-col Comment mx-10 items-center justify-center">
          <div className="hed">
            <h2 class="text-black  text-4xl font-semibold">Make a Comment</h2>
          </div>
          <textarea
            onInput={handleInputChange}
            value={comment}
            maxLength={250}
            rows={15}
            cols={50}
            className="txtarea"
            placeholder=" Add your Comment (upto 250 characters)"
            style={{ height: "300px" }}
          ></textarea>
          <p class="outof text-gray-500 self-end relative bottom-8 right-12">
            {250 - len}/250
          </p>
          <button className="self-end mr-10 mt-1 w-[190] rounded-2xl border-2 border-dashed border-black bg-white px-6 py-1 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">
            {" "}
            Post!{" "}
          </button>
        </div>
      </div>

      <div>
        <div class="hed">
          <h2 class="text-black text-4xl font-semibold">Approved Comments</h2>
        </div>
        <div className="flex flex-row flex-wrap mt-310">
          {commtdata.map((val) => {
            return (
              <div className="info w-1/4 overflow-y-auto h-40">
                <p className="cmt">{val.commt} </p>
                <p className="cmt">Name: {val.name} </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Makeacomment;
