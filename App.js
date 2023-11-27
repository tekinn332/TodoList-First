import React, { useState } from 'react';
import "./edit.css";
import { CiSquarePlus } from "react-icons/ci";
import { CgMoreVertical } from "react-icons/cg";
import { AiTwotoneDelete } from "react-icons/ai";
import { TbEditCircle } from "react-icons/tb";
import { CiSaveUp1 } from "react-icons/ci";

function App() {
  const [baslik, setBaslik] = useState('');
  const [not, setNot] = useState('');
  const [data, setData] = useState([]);
  const [warning, setWarning] = useState(false);
  const [edit, setEdit] = useState(-1);
  const [editedText, setEditedText] = useState("");
  const [showFullText, setShowFullText] = useState([]);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const mapEt = () => {
    if (not !== "") {
      const yenidata = {
        baslik: baslik,
        not: not,
      };

      setData([yenidata, ...data]);
      setBaslik('');
      setNot('');
      setWarning(false);
    } else if (not === "") {
      setWarning(true);
    }
  };

  const handleDelete = (index) => {
    setDeleteIndex(index);
  };

  const confirmDelete = () => {
    const yeniData = [...data];
    yeniData.splice(deleteIndex, 1);
    setData(yeniData);
    setDeleteIndex(null);
  };

  const cancelDelete = () => {
    setDeleteIndex(null);
  };

  const editfonksiyonu = (index) => {
    setEdit(index);
    setEditedText(data[index].not);
  };

  const saveEditedText = (index) => {
    const newData = [...data];
    newData[index].not = editedText;
    setData(newData);
    setEdit(-1);
    setEditedText("");
  };

  const handleAboutClick = (index) => {
    setShowFullText((prev) => {
      if (prev.includes(index)) {
        return prev.filter((item) => item !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  return (



    <>
      <h1 className='titletitle'
      >ToDo List</h1>

      <div className='inputs'>
        <div>
          <input
            className='titleinput'
            placeholder='Title...'
            type="text"
            id="baslik"
            maxLength={35}
            value={baslik}
            onChange={(e) => setBaslik(e.target.value)}
          />

          <div>
            <input
              placeholder='Your Note...'
              className='aboutinput'
              type="text"
              id="not"
              value={not}
              onChange={(e) => setNot(e.target.value)}
            />
          </div>

          <CiSquarePlus className="addbutton" onClick={mapEt} />
        </div>
      </div>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <div className='full'>
              <h1 className='baslik'>
                {item.baslik}
                <CgMoreVertical />
                <AiTwotoneDelete className='delete' onClick={() => handleDelete(index)} />
              </h1>
              <h4 className='not' onClick={() => handleAboutClick(index)}>
                {showFullText.includes(index) ? item.not : item.not.slice(0, 30) + "..." }
              </h4>

              {deleteIndex === index && (
                <div className="delete-confirm">

                  <div >
                  <p style={{marginLeft:"90px",marginTop:"-15px"}} >Are you sure to delete?</p>
                  <div style={{marginLeft:"35px"}} >
                  <button style={{paddingLeft:"50px", paddingRight:"50px", backgroundColor:"black", color:"purple"}} onClick={confirmDelete}>OK</button>
                  <button style={{paddingLeft:"50px", paddingRight:"50px",  backgroundColor:"black", color:"purple", boxShadow: "1px 2px 15px 7px rgba(150, 100, 134, 0.5)"
}} onClick={cancelDelete}>Cancel</button>
                  </div>
                  </div>

                </div>
              )}

              {edit === index ? (
                <>
                  <input
                    className="editinput"
                    style={{marginTop:"20px", backgroundColor: "black", color: "white", borderColor: "orange", width: "200px", height: "20px", fontSize: "15px", borderColor: "orange", borderRadius: "7px",marginLeft:"70px" }}
                    type="text"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                  />
                  <div style={{backgroundColor:"black",marginLeft:"60px" }} >
                    <CiSaveUp1 style={{color:"yellow",border:"5px",
                    
                    
                    borderColor:"red",height: "30px", width: "100px",marginLeft:"100px"}} onClick={() => saveEditedText(index)} />
                  </div>
                </>
              ) : (
                <TbEditCircle style={{}} onClick={() => editfonksiyonu(index)} />
              )}
            </div>
          </li>
        ))}
        <div>
          {warning && <h4 style={{ marginLeft: "540px" }}>Note cannot be empty.</h4>}
        </div>
      </ul>
    </>
  );
}

export default App;
