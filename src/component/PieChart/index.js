import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const PieChart = ({ data }) => {
  // Filter out cities without a rating and sort the data by rating in descending order
  const filteredData = data.filter((course) => course.rating !== null);
  filteredData.sort((a, b) => b.rating - a.rating);

  // Use the top ten cities with a rating to create dataPoints for the pie chart
  const topTenCities = filteredData.slice(0, 10);



  // Calculate the count of courses in each city and create dataPoints for the pie chart
  const cityCounts = {};
  topTenCities.forEach((course) => {
    const city = course.city;
    cityCounts[city] = (cityCounts[city] || 0) + 1;
  });

  const dataPoints = Object.entries(cityCounts).map(([city, count]) => ({
    y: count, // Use the count value for the y property
    label: city,
  }));

  const options = {
    theme: "dark2",
    animationEnabled: true,
    exportFileName: "Top Ten Cities with Ratings",
    exportEnabled: true,
    title: {
      text: "Top Ten Cities with Ratings",
    },
    data: [{
      type: "pie",
      showInLegend: true,
      legendText: "{label}",
      toolTipContent: "{label}: <strong>{y}</strong>", // Display the count in the tooltip
      indexLabel: "{y}", // Display the count as the index label
      indexLabelPlacement: "inside",
      dataPoints,
    }],
  };

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default PieChart;


