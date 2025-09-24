import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function EliminatedTeamsTable() {
  const eliminatedTeamsData = [
    { teamCode: "LIN-B-042", rank: 46 },
    { teamCode: "SGC-A-091", rank: 47 },
    { teamCode: "MCG-A-050", rank: 48 },
    { teamCode: "RCG-C-070", rank: 49 },
    { teamCode: "MRC-B-052", rank: 50 },
    { teamCode: "SGC-B-092", rank: 51 },
    { teamCode: "BCG-B-006", rank: 52 },
    { teamCode: "SBC-B-086", rank: 53 },
    { teamCode: "RBG-B-066", rank: 54 },
    { teamCode: "DSC-C-022", rank: 55 },
    { teamCode: "VBV-A-100", rank: 56 },
    { teamCode: "DBV-B-024", rank: 57 },
    { teamCode: "BCC-B-008", rank: 58 },
    { teamCode: "VBV-B-101", rank: 59 },
    { teamCode: "CCK-A-013", rank: 60 },
    { teamCode: "BNS-A-074", rank: 60 },
    { teamCode: "DVP-A-026", rank: 60 },
    { teamCode: "PGC-A-062", rank: 60 },
    { teamCode: "DCK-C-030", rank: 64 },
    { teamCode: "BCC-C-009", rank: 65 },
    { teamCode: "LIG-B-045", rank: 66 },
    { teamCode: "SCG-A-080", rank: 67 },
    { teamCode: "SVM-A-090", rank: 68 },
    { teamCode: "VBV-C-102", rank: 69 },
    { teamCode: "MRC-A-051", rank: 69 },
    { teamCode: "SAG-A-084", rank: 71 },
    { teamCode: "KBV-A-040", rank: 72 },
    { teamCode: "AVN-B-004", rank: 73 },
    { teamCode: "DSC-B-021", rank: 74 },
    { teamCode: "SAK-B-082", rank: 75 },
    { teamCode: "JGC-A-037", rank: 76 },
    { teamCode: "NBP-A-056", rank: 76 },
    { teamCode: "SPM-A-088", rank: 78 },
    { teamCode: "SGC-C-093", rank: 78 },
    { teamCode: "ASK-A-001", rank: 78 },
    { teamCode: "ASK-B-002", rank: 81 },
    { teamCode: "CMS-A-011", rank: 82 },
    { teamCode: "CMS-B-012", rank: 83 },
    { teamCode: "CCK-C-015", rank: 84 },
    { teamCode: "DBV-A-023", rank: 85 },
    { teamCode: "DVP-B-027", rank: 86 },
    { teamCode: "HMV-A-036", rank: 87 },
    { teamCode: "JGC-B-038", rank: 88 },
    { teamCode: "MCC-A-053", rank: 89 },
    { teamCode: "MCC-B-054", rank: 90 },
    { teamCode: "MCC-C-055", rank: 90 },
    { teamCode: "PCC-A-060", rank: 92 },
    { teamCode: "PCC-B-061", rank: 93 },
    { teamCode: "RCM-A-063", rank: 94 },
    { teamCode: "RCM-B-064", rank: 95 },
    { teamCode: "SBG-C-077", rank: 96 },
    { teamCode: "SBV-A-078", rank: 97 },
    { teamCode: "SBV-B-079", rank: 98 },
    { teamCode: "SAC-A-083", rank: 99 },
    { teamCode: "SJC-A-087", rank: 99 },
    { teamCode: "VCK-A-097", rank: 99 },
    { teamCode: "VCK-B-098", rank: 99 },
    { teamCode: "VCK-C-099", rank: 99 },
    { teamCode: "VVC-A-103", rank: 99 },
  ]

  return (
    <div className="container mx-auto py-10 flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center mb-6">SACCMCT '25 - Previous Results</h2>
      <div className="max-w-xl w-full">
        <Table className="bg-black text-white w-full">
          <TableHeader>
            <TableRow className="border-b border-gray-800">
              <TableHead className="w-1/3 text-gray-400 text-center">Rank</TableHead>
              <TableHead className="w-2/3 text-gray-400 text-center">Team Code</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {eliminatedTeamsData.map((team, index) => (
              <TableRow 
                key={team.teamCode}
                className="border-b border-gray-800 transition-colors hover:bg-red-900"
              >
                <TableCell className="font-medium text-center pr-2">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-700 text-white">
                    {team.rank}
                  </span>
                </TableCell>
                <TableCell className="text-center pl-2">{team.teamCode}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
