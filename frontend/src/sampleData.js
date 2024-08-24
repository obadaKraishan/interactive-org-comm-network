const sampleData = {
    nodes: [
      // Departments
      { id: '1', name: 'Executive Management' },
      { id: '2', name: 'Operations' },
      { id: '3', name: 'Product Development' },
      { id: '4', name: 'Quality Assurance' },
      { id: '5', name: 'Customer Support' },
      { id: '6', name: 'Human Resources' },
      { id: '7', name: 'Information Technology' },
      { id: '8', name: 'Finance' },
      { id: '9', name: 'Marketing' },
      { id: '10', name: 'Sales' },
      { id: '11', name: 'Legal' },
      { id: '12', name: 'Compliance' },
      { id: '13', name: 'Supply Chain' },
      { id: '14', name: 'Research & Development' },
      { id: '15', name: 'Public Relations' },
      { id: '16', name: 'Business Analytics' },
      { id: '17', name: 'Corporate Strategy' },
      { id: '18', name: 'Procurement' },
      { id: '19', name: 'Facilities Management' },
      { id: '20', name: 'Security' },
  
      // Teams
      { id: '21', name: 'Product Design Team' },
      { id: '22', name: 'Backend Development Team' },
      { id: '23', name: 'Frontend Development Team' },
      { id: '24', name: 'QA Automation Team' },
      { id: '25', name: 'Customer Success Team' },
      { id: '26', name: 'HR Recruitment Team' },
      { id: '27', name: 'IT Infrastructure Team' },
      { id: '28', name: 'Finance Auditing Team' },
      { id: '29', name: 'Digital Marketing Team' },
      { id: '30', name: 'Sales Enablement Team' },
      { id: '31', name: 'Legal Compliance Team' },
      { id: '32', name: 'Supply Chain Optimization Team' },
      { id: '33', name: 'Corporate Communications Team' },
      { id: '34', name: 'Research Lab Team' },
      { id: '35', name: 'Security Operations Team' },
  
      // Employees with roles (Manager, Team Leader, Member)
      { id: '36', name: 'Alice Johnson (Manager)', team: 'Product Design' },
      { id: '37', name: 'Bob Smith (Team Leader)', team: 'Backend Development' },
      { id: '38', name: 'Charlie Davis (Member)', team: 'Frontend Development' },
      { id: '39', name: 'Diana Martinez (Manager)', team: 'QA Automation' },
      { id: '40', name: 'Evan Wilson (Team Leader)', team: 'Customer Success' },
      { id: '41', name: 'Fiona Brown (Member)', team: 'HR Recruitment' },
      { id: '42', name: 'George Clark (Manager)', team: 'IT Infrastructure' },
      { id: '43', name: 'Hannah Lee (Member)', team: 'Finance Auditing' },
      { id: '44', name: 'Ian Walker (Team Leader)', team: 'Digital Marketing' },
      { id: '45', name: 'Julia Turner (Member)', team: 'Sales Enablement' },
      { id: '46', name: 'Kevin Hall (Manager)', team: 'Legal Compliance' },
      { id: '47', name: 'Laura Young (Team Leader)', team: 'Supply Chain Optimization' },
      { id: '48', name: 'Mike Allen (Member)', team: 'Corporate Communications' },
      { id: '49', name: 'Nina Scott (Team Leader)', team: 'Research Lab' },
      { id: '50', name: 'Oscar King (Member)', team: 'Security Operations' },
  
      // Additional Employees
      { id: '51', name: 'Patricia Adams (Member)', team: 'Product Design' },
      { id: '52', name: 'Robert James (Member)', team: 'Backend Development' },
      { id: '53', name: 'Emily Clark (Member)', team: 'Frontend Development' },
      { id: '54', name: 'David Thompson (Member)', team: 'QA Automation' },
      { id: '55', name: 'Sarah Harris (Member)', team: 'Customer Success' },
      { id: '56', name: 'Michael Lewis (Member)', team: 'HR Recruitment' },
      { id: '57', name: 'Karen White (Member)', team: 'IT Infrastructure' },
      { id: '58', name: 'Brian Hall (Member)', team: 'Finance Auditing' },
      { id: '59', name: 'Amanda Robinson (Member)', team: 'Digital Marketing' },
      { id: '60', name: 'Joshua Turner (Member)', team: 'Sales Enablement' },
      { id: '61', name: 'Ashley Green (Member)', team: 'Legal Compliance' },
      { id: '62', name: 'Brandon King (Member)', team: 'Supply Chain Optimization' },
      { id: '63', name: 'Jessica Wright (Member)', team: 'Corporate Communications' },
      { id: '64', name: 'Andrew Scott (Member)', team: 'Research Lab' },
      { id: '65', name: 'Stephanie Johnson (Member)', team: 'Security Operations' },
    ],
    links: [
      // Department-Level Communication
      { source: '1', target: '2' },
      { source: '1', target: '3' },
      { source: '1', target: '17' },
      { source: '2', target: '4' },
      { source: '2', target: '13' },
      { source: '2', target: '18' },
      { source: '3', target: '14' },
      { source: '4', target: '5' },
      { source: '5', target: '10' },
      { source: '6', target: '11' },
      { source: '7', target: '8' },
      { source: '7', target: '20' },
      { source: '8', target: '16' },
      { source: '9', target: '14' },
      { source: '9', target: '15' },
      { source: '10', target: '15' },
      { source: '11', target: '12' },
      { source: '12', target: '13' },
      { source: '13', target: '18' },
      { source: '17', target: '18' },
      { source: '19', target: '20' },
  
      // Added additional connections for IT, Security, Finance
      { source: '7', target: '6' }, // IT and HR connection
      { source: '7', target: '1' }, // IT and Executive Management
      { source: '20', target: '7' }, // Security and IT
      { source: '20', target: '8' }, // Security and Finance
      { source: '8', target: '1' }, // Finance and Executive Management
      { source: '8', target: '5' }, // Finance and Customer Support
  
      // Team-Level Communication
      { source: '21', target: '3' },
      { source: '22', target: '3' },
      { source: '23', target: '3' },
      { source: '24', target: '4' },
      { source: '25', target: '5' },
      { source: '26', target: '6' },
      { source: '27', target: '7' },
      { source: '28', target: '8' },
      { source: '29', target: '9' },
      { source: '30', target: '10' },
      { source: '31', target: '11' },
      { source: '32', target: '13' },
      { source: '33', target: '15' },
      { source: '34', target: '14' },
      { source: '35', target: '20' },
  
      // Employee-Level Communication (All employees connected directly to their team)
      { source: '36', target: '21' },
      { source: '51', target: '21' },
      { source: '37', target: '22' },
      { source: '52', target: '22' },
      { source: '38', target: '23' },
      { source: '53', target: '23' },
      { source: '39', target: '24' },
      { source: '54', target: '24' },
      { source: '40', target: '25' },
      { source: '55', target: '25' },
      { source: '41', target: '26' },
      { source: '56', target: '26' },
      { source: '42', target: '27' },
      { source: '57', target: '27' },
      { source: '43', target: '28' },
      { source: '58', target: '28' },
      { source: '44', target: '29' },
      { source: '59', target: '29' },
      { source: '45', target: '30' },
      { source: '60', target: '30' },
      { source: '46', target: '31' },
      { source: '61', target: '31' },
      { source: '47', target: '32' },
      { source: '62', target: '32' },
      { source: '48', target: '33' },
      { source: '63', target: '33' },
      { source: '49', target: '34' },
      { source: '64', target: '34' },
      { source: '50', target: '35' },
      { source: '65', target: '35' },
  
      // Connecting Employees to Department Heads (Ensuring proper hierarchy)
      { source: '36', target: '3' },
      { source: '37', target: '3' },
      { source: '39', target: '4' },
      { source: '40', target: '5' },
      { source: '42', target: '7' },
      { source: '46', target: '11' },
      { source: '49', target: '14' },
    ]
  };
  
  export default sampleData;
  