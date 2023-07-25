
import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
// import PieChart from './component/PieChart';



function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the API endpoint
    fetch('http://localhost:3000/bigqueryData')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);


  console.log(data);
  return (
  <div>
    {/* <PieChart data={data}/> */}
    <Table variant="dark" striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>City</th>
          <th>State</th>
          <th>Zip</th>
          <th>Hole Count</th>
          <th>Rating</th>
          <th>Latitude</th>
          <th>Longitude</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.city}</td>
            <td>{item.state}</td>
            <td>{item.zip}</td>
            <td>{item.holeCount}</td>
            <td>{item.rating}</td>
            <td>{item.latitude}</td>
            <td>{item.longitude}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    </div>
  );
}

export default App;
