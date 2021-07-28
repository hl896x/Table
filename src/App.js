import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [status, setStatus] = useState(true);
  const [summary, setSummary] = useState([]);
  const [edges, setEdges] = useState([]);
  useEffect(() => {
    axios
      .get("earned.json")
      .then((res) => {
        console.log("res", res);
        setSummary(res.data.data.postsConnection.summary);
        setEdges(res.data.data.postsConnection.edges);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="App">
      {console.log("edge", edges)}
      <table>
        <thead>
          <tr>
            <th>Author</th>
            <th>Date</th>
            <th>Post</th>
            <th>Post Image</th>
            <th>Likes Count</th>
            <th>Comments Count</th>
            <th>Total Engagement↓</th>
          </tr>
        </thead>
        <tbody>
          {summary.map((e) =>
            edges.map((edg) => (
              <tr>
                {console.log("e", e)}
                <td>{e.username}</td>
                <td>{e.uid === edg.node.author.uid ? edg.node.date : ""}</td>
                <td>{e.uid === edg.node.author.uid ? edg.node.post : ""}</td>
                <td>
                  {e.uid === edg.node.author.uid ? (
                    <img width="185" height="185" src={edg.node.image_url} />
                  ) : (
                    ""
                  )}
                </td>
                <td>
                  {" "}
                  {e.uid === edg.node.author.uid ? edg.node.likes_count : ""}
                </td>
                <td>
                  {e.uid === edg.node.author.uid ? edg.node.comments_count : ""}
                </td>
                <td>
                  {e.uid === edg.node.author.uid
                    ? edg.node.comments_count + edg.node.likes_count
                    : ""}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
