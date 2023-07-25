import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import Chart from 'react-apexcharts';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('ascending');

  useEffect(() => {
    // Fetch data from the API endpoint
    fetch('http://localhost:5050/bigqueryData')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Simulate page loading effect using useEffect
  useEffect(() => {
    // Simulate an API call or any asynchronous task here
    // In this example, we use setTimeout to simulate a 2-second loading time
    const loadingTimer = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds to stop showing the spinner
    }, 2000);

    // Clean up the timer to avoid memory leaks
    return () => clearTimeout(loadingTimer);
  }, []); // Empty dependency array ensures that the useEffect runs only once

  console.log(data);

  // Process the data to get the count of names for each state
  const stateCount = data.reduce((acc, item) => {
    const { state } = item;
    if (state in acc) {
      acc[state] += 1;
    } else {
      acc[state] = 1;
    }
    return acc;
  }, {});

  // Convert the stateCount object to an array of objects for ApexCharts
  const chartData = Object.entries(stateCount).map(([state, count]) => ({
    x: state,
    y: count,
  }));

  // Sort the chartData based on the sortOrder
  const sortedChartData = chartData.slice().sort((a, b) => {
    if (sortOrder === 'ascending') {
      return a.y - b.y;
    } else {
      return b.y - a.y;
    }
  });

  const options = {
    chart: {
      id: 'bar-chart',
      type: 'bar',
    },
    xaxis: {
      categories: sortedChartData.map((dataPoint) => dataPoint.x),
    },
  };

  const toggleSortOrder = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === 'ascending' ? 'descending' : 'ascending'));
  };

  return (
    <div>
      <div className="App">
        {/* Display the Spinner if loading is true */}
        {loading ? (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          /* Your actual app content goes here */
          <div>
            <button onClick={toggleSortOrder}>Toggle Sort Order</button>
            <Chart options={options} series={[{ name: 'Courses', data: sortedChartData }]} type="bar" height={350} />
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
        )}
      </div>
    </div>
  );
}

export default App;

