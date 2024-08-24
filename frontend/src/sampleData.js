const sampleData = {
    nodes: [
      { id: '1', name: 'Team A' },
      { id: '2', name: 'Team B' },
      { id: '3', name: 'Department X' },
      { id: '4', name: 'Department Y' },
      { id: '5', name: 'Team C' },
      { id: '6', name: 'Department Z' },
      { id: '7', name: 'Team D' },
      { id: '8', name: 'Team E' },
      { id: '9', name: 'Department A' },
      { id: '10', name: 'Department B' },
      { id: '11', name: 'HR' },
      { id: '12', name: 'IT' },
      { id: '13', name: 'Finance' },
      { id: '14', name: 'Marketing' },
      { id: '15', name: 'Sales' },
    ],
    links: [
      { source: '1', target: '2' },
      { source: '2', target: '3' },
      { source: '3', target: '4' },
      { source: '4', target: '5' },
      { source: '5', target: '6' },
      { source: '1', target: '6' },
      { source: '2', target: '5' },
      { source: '7', target: '8' },
      { source: '8', target: '9' },
      { source: '9', target: '10' },
      { source: '10', target: '11' },
      { source: '11', target: '12' },
      { source: '12', target: '13' },
      { source: '13', target: '14' },
      { source: '14', target: '15' },
      { source: '7', target: '15' },
      { source: '1', target: '12' },
      { source: '4', target: '14' },
    ]
  };
  
  export default sampleData;
  