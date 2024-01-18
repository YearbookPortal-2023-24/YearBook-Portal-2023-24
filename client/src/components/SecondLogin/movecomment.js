import React, { useEffect } from 'react';

const MoveComments = ({ comments }) => {
  useEffect(() => {
    // Log comments to the console when the component mounts
    console.log("All Comments:");

    comments.forEach((val, index) => {
      console.log(`Comment ${index + 1}: ${val.comment}`);
      console.log(`Comment by: ${val.name}`);
    });

    // If you want to print the comments as a single string
    // You can use JSON.stringify to convert the array to a JSON-formatted string
    console.log("All Comments as JSON:");
    console.log(JSON.stringify(comments, null, 2));
  }, [comments]); // Run this effect whenever 'comments' changes

  return (
    <div className="comments2">
      <h1 id="cmt">My Comments</h1>
      <div id="commentsscroll">
        {comments && comments.length !== 0 && (
          <>
            {comments.map((val, index) => (
              <div key={index} id="comment">
                <p id="commentp">{val.comment}</p>
                <p id="commentby">-{val.name}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default MoveComments;
