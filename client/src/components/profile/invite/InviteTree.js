import React, { useEffect, useState } from "react";
import axios from "axios";

const renderTree = (node) => {
  return (
    <tr>
      <td>{node.username}</td>
      <td>{node.email}</td>
      <td>{node.joined}</td>
      <td>{node.lastSeen}</td>
      <td>{node.uploaded}</td>
      <td>{node.downloaded}</td>
      <td>{node.ratio}</td>
      {node.children && node.children.map((child) => renderTree(child))}
    </tr>
  );
};

const InviteTree = ({ userID }) => {
  const [inviteTreeData, setInviteTreeData] = useState(null);

  useEffect(() => {
    const fetchInviteTree = async () => {
      try {
        const response = await axios.get("/api/profile/invite-tree", {
          params: { userID: userID },
        });
        setInviteTreeData(response.data.data);
      } catch (error) {
        console.error("Failed to fetch invite tree data", error);
      }
    };

    fetchInviteTree();
  }, []);

  return (
    <div>
      <h3>Invitee list</h3>
      <div className="box pad">
        <table className="invite_table m_table" width="100%">
          <thead>
            <tr className="colhead">
              <td className="m_th_left">Username</td>
              <td>Email</td>
              <td>Joined</td>
              <td>Last Seen</td>
              <td className="m_th_right">Uploaded</td>
              <td className="m_th_right">Downloaded</td>
              <td className="m_th_right">Ratio</td>
            </tr>
          </thead>
          <tbody>
            {inviteTreeData &&
              inviteTreeData.map((invitee) => renderTree(invitee))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InviteTree;
