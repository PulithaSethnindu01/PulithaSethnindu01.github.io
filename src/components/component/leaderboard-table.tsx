import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function LeaderboardTable() {
  const leaderboardData = [
    { teamCode: "RCC-A-071", average: 70.00, rank: 1 },
    { teamCode: "DCK-A-028", average: 58.95, rank: 2 },
    { teamCode: "DMC-A-017", average: 56.30, rank: 3 },
    { teamCode: "TCK-A-095", average: 55.75, rank: 4 },
    { teamCode: "NCC-A-057", average: 53.31, rank: 5 },
    { teamCode: "GHS-A-031", average: 48.56, rank: 6 },
    { teamCode: "GSC-A-034", average: 46.80, rank: 7 },
    { teamCode: "RCG-B-069", average: 46.24, rank: 8 },
    { teamCode: "RCC-B-072", average: 46.13, rank: 9 },
    { teamCode: "MGC-A-047", average: 45.80, rank: 10 },
    { teamCode: "SAK-A-081", average: 43.15, rank: 11 },
    { teamCode: "LIG-A-044", average: 41.93, rank: 12 },
    { teamCode: "KCK-A-039", average: 41.82, rank: 13 },
    { teamCode: "BCG-A-005", average: 41.71, rank: 14 },
    { teamCode: "DMC-B-018", average: 40.83, rank: 15 },
    { teamCode: "DCK-B-029", average: 40.06, rank: 16 },
    { teamCode: "NCC-B-058", average: 38.18, rank: 17 },
    { teamCode: "LIN-A-041", average: 37.85, rank: 18 },
    { teamCode: "AVN-A-003", average: 37.29, rank: 19 },
    { teamCode: "DSC-A-020", average: 37.07, rank: 20 },
    { teamCode: "MGC-B-048", average: 35.64, rank: 21 },
    { teamCode: "TCH-A-094", average: 35.64, rank: 21 },
    { teamCode: "ZCC-A-104", average: 34.31, rank: 23 },
    { teamCode: "RCC-C-073", average: 34.20, rank: 24 },
    { teamCode: "LIN-C-043", average: 33.43, rank: 25 },
    { teamCode: "SBG-B-076", average: 33.43, rank: 25 },
    { teamCode: "SBG-A-075", average: 33.31, rank: 27 },
    { teamCode: "GSC-B-035", average: 32.98, rank: 28 },
    { teamCode: "TCK-B-096", average: 32.87, rank: 29 },
    { teamCode: "SBC-A-085", average: 32.76, rank: 30 },
    { teamCode: "NCC-C-059", average: 32.65, rank: 31 },
    { teamCode: "GHS-B-032", average: 32.54, rank: 32 },
    { teamCode: "DBV-C-025", average: 32.43, rank: 33 },
    { teamCode: "SSC-A-089", average: 32.43, rank: 33 },
    { teamCode: "RCG-A-068", average: 32.21, rank: 35 },
    { teamCode: "BLC-A-010", average: 31.88, rank: 36 },
    { teamCode: "CCK-B-014", average: 31.88, rank: 36 },
    { teamCode: "MGC-C-049", average: 31.55, rank: 38 },
    { teamCode: "RBG-C-067", average: 31.44, rank: 39 },
    { teamCode: "RBG-A-065", average: 30.88, rank: 40 },
    { teamCode: "GHS-C-033", average: 30.66, rank: 41 },
    { teamCode: "LIG-C-046", average: 30.44, rank: 42 },
    { teamCode: "DSS-A-016", average: 30.33, rank: 43 },
    { teamCode: "BCC-A-007", average: 30.22, rank: 44 },
    { teamCode: "DMC-C-019", average: 30.22, rank: 44 },
  ]

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center mb-6">SACCMCT '25 - Selected Teams</h2>
      <div className="max-w-3xl mx-auto">
        <Table className="bg-black text-white w-full">
          <TableHeader>
            <TableRow className="border-b border-gray-800">
              <TableHead className="w-1/4 text-gray-400 text-center">Rank</TableHead>
              <TableHead className="w-1/2 text-gray-400 text-center">Team Code</TableHead>
              <TableHead className="w-1/4 text-gray-400 text-center">Average (Normalized)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboardData.map((team, index) => (
              <TableRow 
                key={team.teamCode}
                className={`border-b border-gray-800 transition-colors ${
                  index < 3 ? "hover:bg-green-900" : "hover:bg-gray-900"
                }`}
              >
                <TableCell className="font-medium text-center pr-2">
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${
                    index < 3 ? "bg-green-700 text-white" : "bg-gray-700 text-white"
                  }`}>
                    {team.rank}
                  </span>
                </TableCell>
                <TableCell className="text-center">{team.teamCode}</TableCell>
                <TableCell className="text-center">{team.average.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
