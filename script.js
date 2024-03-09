// Data for chart
let chartData1 = {
    labels: [],
    datasets: []
  };

  let chartData2 = {
    labels :[],
    datasets : []
  };
  
  // Colors for different categories
  const categoryColors1 = {
    'loose-soil': 'rgba(230, 25, 75, 0.5)', // Red
    'clay-1': 'rgba(60, 180, 75, 0.5)', // Green
    'clay-2': 'rgba(255, 225, 25, 0.5)', // Yellow
    'clay-3': 'rgba(70, 99, 216, 0.5)', // Blue
    'fine-sand-1': 'rgba(245, 130, 49, 0.5)', // Orange
    'fine-sand-2': 'rgba(145, 30, 180, 0.5)', // Purple
    'fine-sand-3': 'rgba(70, 240, 240, 0.5)', // Cyan
    'coarse-sand-1': 'rgba(240, 50, 230, 0.5)', // Magenta
    'coarse-sand-2': 'rgba(188, 246, 12, 0.5)', // Lime
    'coarse-sand-3': 'rgba(250, 190, 190, 0.65)', // Pink
    'fine-pebbles-1': 'rgba(0, 128, 128, 0.5)', // Teal
    'fine-pebbles-2': 'rgba(230, 190, 255, 0.65)', // Lavender
    'fine-pebbles-3': 'rgba(154, 99, 36, 0.5)', // Brown
    'hard-rocks-1': 'rgba(255, 250, 200, 0.70)', // Beige
    'hard-rocks-2': 'rgba(128, 0, 0, 0.5)', // Maroon
    'hard-rocks-3': 'rgba(170, 255, 195, 0.5)', // Mint
};

const categoryColors2 = {
    'strainer-1': 'rgba(255, 99, 132, 0.5)',
    'strainer-2': 'rgba(54, 162, 235, 0.5)',
    'strainer-3': 'rgba(255, 206, 86, 0.65)',
    'strainer-4': 'rgba(75, 192, 192, 0.5)',
    'strainer-5': 'rgba(153, 102, 255, 0.5)',
    'blankspace-1' : '#fff',
    'blankspace-2' : '#fff',
    'blankspace-3' : '#fff',
    'blankspace-4' : '#fff',
    'blankspace-5' : '#fff',
    
  };


  
  // Chart configuration
  // Chart configuration
  const chartConfig1 = {
    type: 'bar',
    data: chartData1,
    options: {
        responsive: true,
        scales: {
            x: {
                display: false, // Hide the x-axis labels
                stacked: true,
            },
            y: {
                stacked: true,
                reverse: true,
                title: {
                    display: true,
                    text: 'Depth (BGL - in m)',
                },
                ticks: {
                    stepSize: 3 // Set the step size to 3
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Litholog of Borewell',
                font: {
                    size: 18
                }
            }
        }
    }
};

const chartConfig2 = {
    type: 'bar',
    data: chartData2,
    options: {
        responsive: true,
        scales: {
            x: {
                display: false, // Hide the x-axis labels
                stacked: true,
            },
            y: {
                stacked: true,
                reverse: true,
                title: {
                    display: true,
                    text: 'Depth (BGL - in m)',
                },
                ticks: {
                    stepSize: 3 // Set the step size to 3
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Straining Process',
                font: {
                    size: 18
                }
            }
        }
    }
};
  
  
  // Initialize chart
  const ctx1 = document.getElementById('myChart1').getContext('2d');
  const myChart1 = new Chart(ctx1, chartConfig1);
  
  const ctx2 = document.getElementById('myChart2').getContext('2d');
  const myChart2 = new Chart(ctx2, chartConfig2);
  

function addData1() {
    const category1 = document.getElementById('category1').value;
    const height1 = parseFloat(document.getElementById('height1').value);
  
    // Add label if not already present
    if (!chartData1.labels.includes(category1)) {
      chartData1.labels.push(category1);
    }
  
    // Find dataset index
    const datasetIndex = chartData1.datasets.findIndex(dataset => dataset.label === category1);
  
    if (datasetIndex !== -1) {
      // If dataset already exists, add height to existing data
      chartData1.datasets[datasetIndex].data[0] += height1;
    } else {
      // If dataset doesn't exist, create new dataset with zero height for other categories
      const newData = [0];
      chartData1.labels.forEach((label, index) => {
        if (index !== chartData1.labels.indexOf(category1)) {
          newData.push(0);
        }
      });
      newData[0] = height1;
      chartData1.datasets.push({
        label: category1,
        data: newData,
        backgroundColor: categoryColors1[category1]
      });
    }
  
    // Update chart
    myChart1.update();
  
    // Update legend
    updateLegend();
  }
  

  function addData2() {
    const category2 = document.getElementById('category2').value;
    const height2 = parseFloat(document.getElementById('height2').value);
  
    // Add label if not already present
    if (!chartData2.labels.includes(category2)) {
      chartData2.labels.push(category2);
    }
  
    // Find dataset index
    const datasetIndex = chartData2.datasets.findIndex(dataset => dataset.label === category2);
  
    if (datasetIndex !== -1) {
      // If dataset already exists, add height to existing data
      chartData2.datasets[datasetIndex].data[0] += height2;
    } else {
      // If dataset doesn't exist, create new dataset with zero height for other categories
      const newData = [0];
      chartData2.labels.forEach((label, index) => {
        if (index !== chartData2.labels.indexOf(category2)) {
          newData.push(0);
        }
      });
      newData[0] = height2;
      chartData2.datasets.push({
        label: category2,
        data: newData,
        backgroundColor: categoryColors2[category2]
      });
    }
  
    // Update chart
    myChart2.update();
  
    // Update legend
    updateLegend();
  }
  
  document.getElementById('downloadChart1').addEventListener('click', function() {
    const canvas = document.getElementById('myChart1');
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = 'chart.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

document.getElementById('downloadChart2').addEventListener('click', function() {
    const canvas = document.getElementById('myChart2');
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = 'chart.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});