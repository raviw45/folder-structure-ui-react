import { useState } from "react";
import "./styles.css";
import json from "./data.json";
const File = ({ list, addFolderToNode, deleteFromNode }) => {
  const [isExpanded, setIsExpanded] = useState({});
  return (
    <div className="container">
      {list?.map((node) => (
        <div key={node.id}>
          {node.isFolder && (
            <span
              onClick={() =>
                setIsExpanded((prev) => ({
                  ...prev,
                  [node.name]: !prev[node.name],
                }))
              }
            >
              {isExpanded?.[node.name] ? "-" : "+"}
            </span>
          )}
          <span className="name-container">
            <span>{node.name}</span>
            {node.isFolder && (
              <span>
                <img
                  onClick={() => addFolderToNode(node.id)}
                  className="icon"
                  src="https://static-00.iconduck.com/assets.00/add-folder-icon-1024x871-kic500lr.png"
                  alt="folder"
                />
              </span>
            )}
            <span>
              <img
                onClick={() => deleteFromNode(node.id)}
                className="icon"
                src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png"
                alt=""
              />
            </span>
          </span>
          {isExpanded?.[node.name] && node.children && (
            <File
              list={node.children}
              addFolderToNode={addFolderToNode}
              deleteFromNode={deleteFromNode}
            />
          )}
        </div>
      ))}
    </div>
  );
};
export default function App() {
  const [data, setData] = useState(json);

  const addFolderToNode = (parentId) => {
    const name = prompt("Enter Name");
    const updateTree = (list) => {
      return list.map((node) => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [
              ...node.children,
              {
                id: Date.now(),
                name: name,
                isFolder: true,
                children: [],
              },
            ],
          };
        }
        if (node.children) {
          return { ...node, children: updateTree(node.children) };
        }
        return node;
      });
    };
    setData((prev) => updateTree(prev));
  };

  const deleteFromNode = (itemId) => {
    const updateTree = (list) => {
      return list
        .filter((node) => node.id !== itemId)
        .map((node) => {
          if (node.children) {
            return { ...node, children: updateTree(node.children) };
          }
          return node;
        });
    };
    setData((prev) => updateTree(prev));
  };
  return (
    <div className="App">
      <h1>File Explorer</h1>
      <File
        list={data}
        addFolderToNode={addFolderToNode}
        deleteFromNode={deleteFromNode}
      />
    </div>
  );
}
