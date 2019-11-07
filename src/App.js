import React, {useState} from 'react';

function App() {
  const [userData, setUserData] = useState([]);
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [editFlag, setEditFlag] = useState({editing: false, id: undefined});

  const handleChange = (event) => {
     if (event.target.name === 'fname') {
        setFname(event.target.value);
     }
     if (event.target.name === 'lname') {
         setLname(event.target.value);
     }
     if (event.target.name === 'email') {
         setEmail(event.target.value);
     }
  };

  const onSubmit = (event) => {
      event.preventDefault();
      if (!editFlag.editing) {
        setUserData([...userData, {fname, lname, email}]);
        setFname('');
        setLname('');
        setEmail('');
        //Make http request to backend to save changed data e.g. axios.post()...
      }
  };

  const onDelete = (id) => {
     const changedData = userData.filter((data, idx) => idx!==id);
     setUserData(changedData);
  };

  const onEdit = (id) => {
     const dataToEdit = userData.filter((data, idx) => idx===id);
     setFname(dataToEdit[0].fname);
     setLname(dataToEdit[0].lname);
     setEmail(dataToEdit[0].email);
     setEditFlag({editing: true, id});
  };

  const onSave = () => {
     const editedData = userData.map(data=>data);// quick solution for copying reference type
     editedData[editFlag.id].fname = fname;
     editedData[editFlag.id].lname = lname;
     editedData[editFlag.id].email = email;
     setUserData(editedData);
     setFname('');
     setLname('');
     setEmail('');
     setEditFlag({editing: false, id: undefined});
     //Make http request to backend to save changed data e.g. axios.post()...
  };

  return (
    <div style={{margin: '30px'}}>
       <form onSubmit={onSubmit}>
          First name: <input type="text" name="fname" value={fname} onChange={handleChange}/><br/>
          Last name: <input type="text" name="lname" value={lname} onChange={handleChange}/><br/>
          Email: <input type="email" name="email" value={email} onChange={handleChange}/><br/>
           {!editFlag.editing && <input type="submit" value="Submit" />}
           {editFlag.editing  && <button onClick={onSave}>Save</button>}
        </form>
        <br/><br/>
        <hr />
        <hr />
        <b>Entered user data:</b><br/><br/>
        {userData.map( (data, id) => {
           return (
             <div key={id}>
                First Name: {data.fname}<br/>
                Last Name: {data.lname}<br/>
                Email: {data.email}<br/>
                <button onClick={()=>onEdit(id)}>Edit</button>
                <button onClick={()=>onDelete(id)}>Delete</button>
                <br/><br/>
             </div>
           );
        })}
    </div>
  );
};

export default App;
