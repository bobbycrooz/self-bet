import MatchCard from "../MatchCard";
import Image from "next/image";


export function Matches({ data }: any) {
	return (
		<MatchCard
			teamData={{
				TeamA: {
					Logo: data.Criteria.TeamA.Logo || data.Criteria.TeamA.logo,
					TeamName: data.Criteria.TeamA.TeamName || data.Criteria.TeamA.name,
				},
				TeamB: {
					Logo: data.Criteria.TeamB.Logo || data.Criteria.TeamB.logo,
					TeamName: data.Criteria.TeamB.TeamName || data.Criteria.TeamB.name,
				},
			}}
		/>
	);
}

export function Bets({ data }: any) {
	return (
		<>
			{data?.Criteria.Conditions.map((i: any, k: React.Key | null | undefined) => (
				<div key={k} className="teams_display border border-gray-200 rounded-lg px-4 p-5 ">
					<div className="  space-x-4 items-start flex">
						<Image className="team_logo " src={"/icons/green_ball.svg"} alt="chealse" width={48} height={48} />
						<div className="texts">
							<h1 className="team_name txt-sm f-b text-gray-700">{i.Sector}</h1>
							<p className="team_name txt-sm  text-gray-600">Predict who wins or draws</p>
						</div>
					</div>
				</div>
			))}
		</>
	);
}

export function Creator({ data }: any)
{
	
	const arrr = typeof data?.CreatorSelection?.Conditions === "string";

	return (
		<>
			{/* --team  display baner---- */}
			{!arrr &&
				data?.CreatorSelection?.Conditions?.map(
					(
						i:any,
						k: React.Key | null | undefined
					) => (
						<div key={k} className="creators_card border-gray-200 rounded-lg shadow-md">
							{/* header */}
							<div className="h-12 w-full relative header middle ">
								<h1 className="header_text txt-sm f-b text-gray-50 p-4">
									{data?.Criteria?.TeamA.name || data?.Criteria?.TeamA.TeamName} -{" "}
									{data.Criteria.TeamB.name || data?.Criteria?.TeamB.TeamName}
								</h1>
							</div>

							<div className=" options w-full">
								<div className="middle   px-6  ">
									<div className=" w-full border-b border-dashed py-4 space-x-4 flex">
										<Image className="team_logo " src={"/icons/ball.svg"} alt="chealse" width={24} height={32} />
										<div className="texts w-full">
											<div className="row-between w-full">
												<h1 className="team_name txt-sm f-b text-gray-900">{i.Codes}</h1>

												{/* ssN className="team_name txt-sm f-b text-gray-900">2.45</h1> */}
											</div>
											<p className="team_name txt-xs f-s  text-gray-300">{i.Sector}</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					)
				)}
		</>
	);
}