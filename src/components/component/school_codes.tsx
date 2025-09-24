import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';

interface Team {
  schoolName: string;
  teamCode: string;
  team: string;
}

const leaderboardData: Team[] = [
  { schoolName: "Ananda Sastralaya - Kotte", teamCode: "ASK-A-001", team: "A" },
    { schoolName: "Ananda Sastralaya - Kotte", teamCode: "ASK-B-002", team: "B" },
    { schoolName: "Anula Vidyalaya - Nugegoda", teamCode: "AVN-A-003", team: "A" },
    { schoolName: "Anula Vidyalaya - Nugegoda", teamCode: "AVN-B-004", team: "B" },
    { schoolName: "Bandaranayake College - Gampaha", teamCode: "BCG-A-005", team: "A" },
    { schoolName: "Bandaranayake College - Gampaha", teamCode: "BCG-B-006", team: "B" },
    { schoolName: "Bandaranayake Central College - Veyangoda", teamCode: "BCC-A-007", team: "A" },
    { schoolName: "Bandaranayake Central College - Veyangoda", teamCode: "BCC-B-008", team: "B" },
    { schoolName: "Bandaranayake Central College - Veyangoda", teamCode: "BCC-C-009", team: "C" },
    { schoolName: "Buddhist Ladies College", teamCode: "BLC-A-010", team: "A" },
    { schoolName: "C.M.S. Ladies' College", teamCode: "CMS-A-011", team: "A" },
    { schoolName: "C.M.S. Ladies' College", teamCode: "CMS-B-012", team: "B" },
    { schoolName: "Central College - Kuliyapitiya", teamCode: "CCK-A-013", team: "A" },
    { schoolName: "Central College - Kuliyapitiya", teamCode: "CCK-B-014", team: "B" },
    { schoolName: "Central College - Kuliyapitiya", teamCode: "CCK-C-015", team: "C" },
    { schoolName: "D.S.Senanayake College - Colombo", teamCode: "DSS-A-016", team: "A" },
    { schoolName: "De Mazenod College - Kandana", teamCode: "DMC-A-017", team: "A" },
    { schoolName: "De Mazenod College - Kandana", teamCode: "DMC-B-018", team: "B" },
    { schoolName: "De Mazenod College - Kandana", teamCode: "DMC-C-019", team: "C" },
    { schoolName: "Defence Services College", teamCode: "DSC-A-020", team: "A" },
    { schoolName: "Defence Services College", teamCode: "DSC-B-021", team: "B" },
    { schoolName: "Defence Services College", teamCode: "DSC-C-022", team: "C" },
    { schoolName: "Devi Balika Vidyalaya - Colombo", teamCode: "DBV-A-023", team: "A" },
    { schoolName: "Devi Balika Vidyalaya - Colombo", teamCode: "DBV-B-024", team: "B" },
    { schoolName: "Devi Balika Vidyalaya - Colombo", teamCode: "DBV-C-025", team: "C" },
    { schoolName: "Dharmapala Vidyalaya - Pannipitiya", teamCode: "DVP-A-026", team: "A" },
    { schoolName: "Dharmapala Vidyalaya - Pannipitiya", teamCode: "DVP-B-027", team: "B" },
    { schoolName: "Dharmaraja College - Kandy", teamCode: "DCK-A-028", team: "A" },
    { schoolName: "Dharmaraja College - Kandy", teamCode: "DCK-B-029", team: "B" },
    { schoolName: "Dharmaraja College - Kandy", teamCode: "DCK-C-030", team: "C" },
    { schoolName: "Girls' High School - Kandy", teamCode: "GHS-A-031", team: "A" },
    { schoolName: "Girls' High School - Kandy", teamCode: "GHS-B-032", team: "B" },
    { schoolName: "Girls' High School - Kandy", teamCode: "GHS-C-033", team: "C" },
    { schoolName: "Govt Science College - Matale", teamCode: "GSC-A-034", team: "A" },
    { schoolName: "Govt Science College - Matale", teamCode: "GSC-B-035", team: "B" },
    { schoolName: "Hapugala Maha Vidyalaya - Galle", teamCode: "HMV-A-036", team: "A" },
    { schoolName: "Jinaraja Girls' College - Gampola", teamCode: "JGC-A-037", team: "A" },
    { schoolName: "Jinaraja Girls' College - Gampola", teamCode: "JGC-B-038", team: "B" },
    { schoolName: "Kingswood College - Kandy", teamCode: "KCK-A-039", team: "A" },
    { schoolName: "Kolonnawa Balika Vidyalaya", teamCode: "KBV-A-040", team: "A" },
    { schoolName: "Lyceum International School - Nugegoda", teamCode: "LIN-A-041", team: "A" },
    { schoolName: "Lyceum International School - Nugegoda", teamCode: "LIN-B-042", team: "B" },
    { schoolName: "Lyceum International School - Nugegoda", teamCode: "LIN-C-043", team: "C" },
    { schoolName: "Lyceum International School - Gampaha", teamCode: "LIG-A-044", team: "A" },
    { schoolName: "Lyceum International School - Gampaha", teamCode: "LIG-B-045", team: "B" },
    { schoolName: "Lyceum International School - Gampaha", teamCode: "LIG-C-046", team: "C" },
    { schoolName: "Mahamaya Girls' College - Kandy", teamCode: "MGC-A-047", team: "A" },
    { schoolName: "Mahamaya Girls' College - Kandy", teamCode: "MGC-B-048", team: "B" },
    { schoolName: "Mahamaya Girls' College - Kandy", teamCode: "MGC-C-049", team: "C" },
    { schoolName: "Mahinda College - Galle", teamCode: "MCG-A-050", team: "A" },
    { schoolName: "Mahinda Rajapaksa College - Homagama", teamCode: "MRC-A-051", team: "A" },
    { schoolName: "Mahinda Rajapaksa College - Homagama", teamCode: "MRC-B-052", team: "B" },
    { schoolName: "Musaeus College - Colombo", teamCode: "MCC-A-053", team: "A" },
    { schoolName: "Musaeus College - Colombo", teamCode: "MCC-B-054", team: "B" },
    { schoolName: "Musaeus College - Colombo", teamCode: "MCC-C-055", team: "C" },
    { schoolName: "Nalanda Buddhist College - Pallekale", teamCode: "NBP-A-056", team: "A" },
    { schoolName: "Nalanda College - Colombo", teamCode: "NCC-A-057", team: "A" },
    { schoolName: "Nalanda College - Colombo", teamCode: "NCC-B-058", team: "B" },
    { schoolName: "Nalanda College - Colombo", teamCode: "NCC-C-059", team: "C" },
    { schoolName: "Piliyandala Central College", teamCode: "PCC-A-060", team: "A" },
    { schoolName: "Piliyandala Central College", teamCode: "PCC-B-061", team: "B" },
    { schoolName: "Pushpadana Girls' College - Kandy", teamCode: "PGC-A-062", team: "A" },
    { schoolName: "Rahula College - Matara", teamCode: "RCM-A-063", team: "A" },
    { schoolName: "Rahula College - Matara", teamCode: "RCM-B-064", team: "B" },
    { schoolName: "Rathnavali Balika Vidyalaya - Gampaha", teamCode: "RBG-A-065", team: "A" },
    { schoolName: "Rathnavali Balika Vidyalaya - Gampaha", teamCode: "RBG-B-066", team: "B" },
    { schoolName: "Rathnavali Balika Vidyalaya - Gampaha", teamCode: "RBG-C-067", team: "C" },
    { schoolName: "Richmond College - Galle", teamCode: "RCG-A-068", team: "A" },
    { schoolName: "Richmond College - Galle", teamCode: "RCG-B-069", team: "B" },
    { schoolName: "Richmond College - Galle", teamCode: "RCG-C-070", team: "C" },
    { schoolName: "Royal College - Colombo", teamCode: "RCC-A-071", team: "A" },
    { schoolName: "Royal College - Colombo", teamCode: "RCC-B-072", team: "B" },
    { schoolName: "Royal College - Colombo", teamCode: "RCC-C-073", team: "C" },
    { schoolName: "S.W.R.D.Bandaranaike National School", teamCode: "BNS-A-074", team: "A" },
    { schoolName: "Sanghamiththa Balika Vidyalaya - Galle", teamCode: "SBG-A-075", team: "A" },
    { schoolName: "Sanghamiththa Balika Vidyalaya - Galle", teamCode: "SBG-B-076", team: "B" },
    { schoolName: "Sanghamiththa Balika Vidyalaya - Galle", teamCode: "SBG-C-077", team: "C" },
    { schoolName: "Sirimavo Bandaranaike Vidyalaya - Colombo", teamCode: "SBV-A-078", team: "A" },
    { schoolName: "Sirimavo Bandaranaike Vidyalaya - Colombo", teamCode: "SBV-B-079", team: "B" },
    { schoolName: "Southlands College - Galle", teamCode: "SCG-A-080", team: "A" },
    { schoolName: "St. Annes College - Kurunegala", teamCode: "SAK-A-081", team: "A" },
    { schoolName: "St. Annes College - Kurunegala", teamCode: "SAK-B-082", team: "B" },
    { schoolName: "St. Anthony's College - Kandy", teamCode: "SAC-A-083", team: "A" },
    { schoolName: "St. Anthony's Girls' School - Panadura", teamCode: "SAG-A-084", team: "A" },
    { schoolName: "St. Bridget's Convent - Colombo", teamCode: "SBC-A-085", team: "A" },
    { schoolName: "St. Bridget's Convent - Colombo", teamCode: "SBC-B-086", team: "B" },
    { schoolName: "St. John's College - Nugegoda", teamCode: "SJC-A-087", team: "A" },
    { schoolName: "St. Paul's Girls School - Milagiriya", teamCode: "SPM-A-088", team: "A" },
    { schoolName: "St. Sylvester's College - Kandy", teamCode: "SSC-A-089", team: "A" },
    { schoolName: "Sujatha Vidyalaya - Matara", teamCode: "SVM-A-090", team: "A" },
    { schoolName: "Swarnamali Girls College - Kandy", teamCode: "SGC-A-091", team: "A" },
    { schoolName: "Swarnamali Girls College - Kandy", teamCode: "SGC-B-092", team: "B" },
    { schoolName: "Swarnamali Girls College - Kandy", teamCode: "SGC-C-093", team: "C" },
    { schoolName: "Taxila Central College - Horana", teamCode: "TCH-A-094", team: "A" },
    { schoolName: "Trinity College - Kandy", teamCode: "TCK-A-095", team: "A" },
    { schoolName: "Trinity College - Kandy", teamCode: "TCK-B-096", team: "B" },
    { schoolName: "Vidyartha College - Kandy", teamCode: "VCK-A-097", team: "A" },
    { schoolName: "Vidyartha College - Kandy", teamCode: "VCK-B-098", team: "B" },
    { schoolName: "Vidyartha College - Kandy", teamCode: "VCK-C-099", team: "C" },
    { schoolName: "Viaharamahadevi Balika Vidyalaya - Kiribathgoda", teamCode: "VBV-A-100", team: "A" },
    { schoolName: "Viaharamahadevi Balika Vidyalaya - Kiribathgoda", teamCode: "VBV-B-101", team: "B" },
    { schoolName: "Viaharamahadevi Balika Vidyalaya - Kiribathgoda", teamCode: "VBV-C-102", team: "C" },
    { schoolName: "Visakha Vidyalaya - Colombo", teamCode: "VVC-A-103", team: "A" },
    { schoolName: "Zahira College - Colombo", teamCode: "ZCC-A-104", team: "A" },
];

export default function SchoolCodes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<Team[]>(leaderboardData);

  useEffect(() => {
    const results = leaderboardData.filter((entry) =>
      `${entry.schoolName} ${entry.teamCode} ${entry.team}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredData(results);
  }, [searchTerm]);

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center space-x-2">
        <SearchIcon className="w-5 h-5 text-gray-500" />
        <Input
          type="text"
          placeholder="Search by school name, team code, or team..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
      </div>
      <Table className="w-full border-collapse border border-gray-300">
        <TableCaption>SACCMCT '25 - School Teams and Codes</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="border border-gray-300">School Name</TableHead>
            <TableHead className="border border-gray-300">Team Code</TableHead>
            <TableHead className="border border-gray-300">Team</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.length ? (
            filteredData.map(({ schoolName, teamCode, team }, index) => (
              <TableRow key={index} className="hover:bg-gray-100">
                <TableCell className="border border-gray-300">{schoolName}</TableCell>
                <TableCell className="border border-gray-300">{teamCode}</TableCell>
                <TableCell className="border border-gray-300">{team}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-4">
                No results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}