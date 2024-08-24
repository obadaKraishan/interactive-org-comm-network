import { executiveTeam } from './executiveTeam';
import { departments } from './departments';
import { teams } from './teams';
import { members } from './members';

const sampleData = {
  nodes: [
    ...executiveTeam,
    ...departments,
    ...teams,
    ...members,
  ].map(node => ({ ...node, id: String(node.id) })),  // Ensure all node ids are strings
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
  ].map(link => ({ ...link, source: String(link.source), target: String(link.target) })) // Ensure all link sources and targets are strings
};

export default sampleData;
