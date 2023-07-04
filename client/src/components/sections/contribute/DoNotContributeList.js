import React, { useEffect, useState } from "react";

const DoNotContributeList = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    // Fetch data from API and set the list
    fetch("/api/communities/dnc-list")
      .then((response) => response.json())
      .then((data) => setList(data))
      .catch((error) => console.error("Error fetching Do Not Contribute List:", error));
  }, []);

  return (
    <div className="box pad" style={{ margin: "0px auto", width: "700px" }}>
      <h3 id="dnu_header">Do Not Contribute List</h3>
      <p>
        <strong className="important_text">Last updated: Never</strong>
      </p>
      <p>
        The following releases are currently forbidden from being contributed to
        the site. Do not upload them unless your community meets a condition
        specified in the comment.
      </p>
      <table id="dnulist" className="">
        <tbody>
          <tr className="colhead">
            <td width="50%">
              <strong>Name</strong>
            </td>
            <td>
              <strong>Comment</strong>
            </td>
          </tr>
          {list.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoNotContributeList;
