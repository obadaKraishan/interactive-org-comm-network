const sampleData = {
    nodes: [
      // Executive Team
      { id: '1', name: 'John Doe (CEO)', type: 'executive' },
      { id: '2', name: 'Jane Smith (COO)', type: 'executive' },
      { id: '3', name: 'Robert Johnson (CFO)', type: 'executive' },
      { id: '4', name: 'Emily Davis (CTO)', type: 'executive' },
      { id: '5', name: 'Michael Brown (CMO)', type: 'executive' },
      { id: '6', name: 'Linda Wilson (CIO)', type: 'executive' },
      { id: '7', name: 'James Taylor (CSO)', type: 'executive' },

      // Departments
      { id: '8', name: 'Operations', type: 'department' },
      { id: '9', name: 'Product Development', type: 'department' },
      { id: '10', name: 'Quality Assurance', type: 'department' },
      { id: '11', name: 'Customer Support', type: 'department' },
      { id: '12', name: 'Human Resources', type: 'department' },
      { id: '13', name: 'Information Technology', type: 'department' },
      { id: '14', name: 'Finance', type: 'department' },
      { id: '15', name: 'Marketing', type: 'department' },
      { id: '16', name: 'Sales', type: 'department' },
      { id: '17', name: 'Legal', type: 'department' },
      { id: '18', name: 'Compliance', type: 'department' },
      { id: '19', name: 'Supply Chain', type: 'department' },
      { id: '20', name: 'Research & Development', type: 'department' },
      { id: '21', name: 'Public Relations', type: 'department' },
      { id: '22', name: 'Business Analytics', type: 'department' },
      { id: '23', name: 'Corporate Strategy', type: 'department' },
      { id: '24', name: 'Procurement', type: 'department' },
      { id: '25', name: 'Facilities Management', type: 'department' },
      { id: '26', name: 'Security', type: 'department' },

      // Teams
      { id: '27', name: 'Product Design Team', parent: '9', type: 'team' },
      { id: '28', name: 'Backend Development Team', parent: '9', type: 'team' },
      { id: '29', name: 'Frontend Development Team', parent: '9', type: 'team' },
      { id: '30', name: 'QA Automation Team', parent: '10', type: 'team' },
      { id: '31', name: 'Customer Success Team', parent: '11', type: 'team' },
      { id: '32', name: 'HR Recruitment Team', parent: '12', type: 'team' },
      { id: '33', name: 'IT Infrastructure Team', parent: '13', type: 'team' },
      { id: '34', name: 'Finance Auditing Team', parent: '14', type: 'team' },
      { id: '35', name: 'Digital Marketing Team', parent: '15', type: 'team' },
      { id: '36', name: 'Sales Enablement Team', parent: '16', type: 'team' },
      { id: '37', name: 'Legal Compliance Team', parent: '17', type: 'team' },
      { id: '38', name: 'Supply Chain Optimization Team', parent: '19', type: 'team' },
      { id: '39', name: 'Corporate Communications Team', parent: '21', type: 'team' },
      { id: '40', name: 'Research Lab Team', parent: '20', type: 'team' },
      { id: '41', name: 'Security Operations Team', parent: '26', type: 'team' },
      { id: '42', name: 'Data Science Team', parent: '22', type: 'team' },
      { id: '43', name: 'Corporate Strategy Planning Team', parent: '23', type: 'team' },
      { id: '44', name: 'Procurement Operations Team', parent: '24', type: 'team' },
      { id: '45', name: 'Facilities Maintenance Team', parent: '25', type: 'team' },

      // Managers, Team Leaders, and Members
      { id: '46', name: 'Alice Johnson (Manager)', parent: '27', type: 'manager' },
      { id: '47', name: 'Bob Smith (Team Leader)', parent: '28', type: 'team-leader' },
      { id: '48', name: 'Charlie Davis (Member)', parent: '29', type: 'member' },
      { id: '49', name: 'Diana Martinez (Manager)', parent: '30', type: 'manager' },
      { id: '50', name: 'Evan Wilson (Team Leader)', parent: '31', type: 'team-leader' },
      { id: '51', name: 'Fiona Brown (Member)', parent: '32', type: 'member' },
      { id: '52', name: 'George Clark (Manager)', parent: '33', type: 'manager' },
      { id: '53', name: 'Hannah Lee (Member)', parent: '34', type: 'member' },
      { id: '54', name: 'Ian Walker (Team Leader)', parent: '35', type: 'team-leader' },
      { id: '55', name: 'Julia Turner (Member)', parent: '36', type: 'member' },
      { id: '56', name: 'Kevin Hall (Manager)', parent: '37', type: 'manager' },
      { id: '57', name: 'Laura Young (Team Leader)', parent: '38', type: 'team-leader' },
      { id: '58', name: 'Mike Allen (Member)', parent: '39', type: 'member' },
      { id: '59', name: 'Nina Scott (Team Leader)', parent: '40', type: 'team-leader' },
      { id: '60', name: 'Oscar King (Member)', parent: '41', type: 'member' },

      // Additional Employees
      { id: '61', name: 'Patricia Adams (Member)', parent: '27', type: 'member' },
      { id: '62', name: 'Robert James (Member)', parent: '28', type: 'member' },
      { id: '63', name: 'Emily Clark (Member)', parent: '29', type: 'member' },
      { id: '64', name: 'David Thompson (Member)', parent: '30', type: 'member' },
      { id: '65', name: 'Sarah Harris (Member)', parent: '31', type: 'member' },
      { id: '66', name: 'Michael Lewis (Member)', parent: '32', type: 'member' },
      { id: '67', name: 'Karen White (Member)', parent: '33', type: 'member' },
      { id: '68', name: 'Brian Hall (Member)', parent: '34', type: 'member' },
      { id: '69', name: 'Amanda Robinson (Member)', parent: '35', type: 'member' },
      { id: '70', name: 'Joshua Turner (Member)', parent: '36', type: 'member' },
      { id: '71', name: 'Ashley Green (Member)', parent: '37', type: 'member' },
      { id: '72', name: 'Brandon King (Member)', parent: '38', type: 'member' },
      { id: '73', name: 'Jessica Wright (Member)', parent: '39', type: 'member' },
      { id: '74', name: 'Andrew Scott (Member)', parent: '40', type: 'member' },
      { id: '75', name: 'Stephanie Johnson (Member)', parent: '41', type: 'member' },
      { id: '76', name: 'Victor Hugo (Manager)', parent: '42', type: 'manager' },
      { id: '77', name: 'Lisa Wong (Team Leader)', parent: '43', type: 'team-leader' },
      { id: '78', name: 'Peter Parker (Member)', parent: '44', type: 'member' },
      { id: '79', name: 'Bruce Wayne (Manager)', parent: '45', type: 'manager' },
      { id: '80', name: 'Diana Prince (Team Leader)', parent: '45', type: 'team-leader' },
      { id: '81', name: 'Clark Kent (Member)', parent: '45', type: 'member' },
    ],
    links: [
      // Executive-Level Communication
      { source: '1', target: '2' },
      { source: '1', target: '3' },
      { source: '1', target: '4' },
      { source: '1', target: '5' },
      { source: '1', target: '6' },
      { source: '1', target: '7' },
      { source: '2', target: '8' },  // COO to Operations
      { source: '3', target: '14' }, // CFO to Finance
      { source: '4', target: '13' }, // CTO to IT
      { source: '5', target: '15' }, // CMO to Marketing
      { source: '6', target: '12' }, // CIO to HR
      { source: '7', target: '26' }, // CSO to Security

      // Department-Level Communication
      { source: '8', target: '9' },
      { source: '8', target: '10' },
      { source: '8', target: '11' },
      { source: '9', target: '20' },
      { source: '10', target: '11' },
      { source: '12', target: '17' },
      { source: '13', target: '14' },
      { source: '15', target: '16' },
      { source: '16', target: '21' },
      { source: '17', target: '18' },
      { source: '18', target: '19' },
      { source: '19', target: '26' },

      // Team-Level Communication
      { source: '27', target: '9' },
      { source: '28', target: '9' },
      { source: '29', target: '9' },
      { source: '30', target: '10' },
      { source: '31', target: '11' },
      { source: '32', target: '12' },
      { source: '33', target: '13' },
      { source: '34', target: '14' },
      { source: '35', target: '15' },
      { source: '36', target: '16' },
      { source: '37', target: '17' },
      { source: '38', target: '19' },
      { source: '39', target: '21' },
      { source: '40', target: '20' },
      { source: '41', target: '26' },
      { source: '42', target: '22' },
      { source: '43', target: '23' },
      { source: '44', target: '24' },
      { source: '45', target: '25' },

      // Employee-Level Communication
      { source: '46', target: '27' },
      { source: '61', target: '27' },
      { source: '47', target: '28' },
      { source: '62', target: '28' },
      { source: '48', target: '29' },
      { source: '63', target: '29' },
      { source: '49', target: '30' },
      { source: '64', target: '30' },
      { source: '50', target: '31' },
      { source: '65', target: '31' },
      { source: '51', target: '32' },
      { source: '66', target: '32' },
      { source: '52', target: '33' },
      { source: '67', target: '33' },
      { source: '53', target: '34' },
      { source: '68', target: '34' },
      { source: '54', target: '35' },
      { source: '69', target: '35' },
      { source: '55', target: '36' },
      { source: '70', target: '36' },
      { source: '56', target: '37' },
      { source: '71', target: '37' },
      { source: '72', target: '38' },
      { source: '73', target: '39' },
      { source: '74', target: '40' },
      { source: '75', target: '41' },
      { source: '76', target: '42' },
      { source: '77', target: '43' },
      { source: '78', target: '44' },
      { source: '79', target: '45' },
      { source: '80', target: '45' },
      { source: '81', target: '45' },
    ]
  };

export default sampleData;
