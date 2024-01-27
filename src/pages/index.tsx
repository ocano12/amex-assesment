import React, { useState, useMemo } from "react";
import axios, { AxiosResponse } from "axios";
import { GetServerSideProps } from "next";
import { Person, RandomUserApiResponse } from "@src/models/person";
import { Avatar } from "@components/Avatar";
import { GridTile } from "@components/GridTile";
import { SiteContainer } from "@components/SiteContainer";
import { Search } from "@components/Search";
import Image from "next/image";
import listIcon from "../../public/list-ul-alt-svgrepo-com.svg";
import gridIcon from "../../public/grid-svgrepo-com.svg";

// TODO: details page
// TODO: finish up some components
// TODO: pagination for more user
// TODO: lighthouse performace
// TODO: translations

export const getServerSideProps: GetServerSideProps = async (context) => {
	//TODO: just get 10 people for now. maybe later we can get custom number
	try {
		const getPeopleResponse: AxiosResponse<RandomUserApiResponse> = await axios.get(`${process.env.CLIENT_DOMAIN}/api/people`, {
			params: {
				numberOfPeople: 10,
			},
		});

		return {
			props: {
				people: getPeopleResponse.data.results,
			},
		};
	} catch (error) {
		//TODO: return error true so that UI can at least notify the user and they can retry

		console.log(error);
		return {
			props: {
				error: true,
			},
		};
	}
};

//TODO: clean up some of the types
export interface UserPageProps {
	people?: Person[];
	error?: boolean;
}

export default function UserPage(props: UserPageProps) {
	const { people, error } = props;
	const [isGrid, setIsGrid] = useState<boolean>(true);
	const [search, setSearch] = useState<string>("");

	//TODO: make this better and retry button?
	if (error) {
		return <div>Error occured please try again</div>;
	}

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	};

	//using memo here in case the user changes other states but people or search doesnt change
	const filteredPeople = useMemo(() => {
		if (search === "") {
			return people;
		}

		return (
			people?.filter(
				(person) =>
					person.name.first.toLowerCase().includes(search.toLowerCase()) || person.name.last.toLowerCase().includes(search.toLowerCase())
			) || []
		);
	}, [search, people]);

	//TODO: clean up UI see what can be components
	return (
		<>
			<SiteContainer>
				<div className="flex justify-center flex-col items-center">
					<div className="sm:max-w-[80%] w-full flex flex-col justify-center">
						<div className="mb-4">
							<h1 className="text-5xl font-bold my-4">Users</h1>
						</div>
						<div className="flex flex-row items-center mb-4 justify-between">
							<div className="basis-4/5">
								<Search search={search} handleSearchChange={handleSearchChange} />
							</div>
							<div className="flex flex-row gap-1">
								{/* TODO: rip this out into a component and make sure icon stays centered. */}
								<div className={`bg-white rounded p-2 ${isGrid ? " border-2 border-sky-500" : null}`} onClick={() => setIsGrid(true)}>
									<Image priority src={gridIcon} alt="grid" className="w-5 h-5 sm:w-8 sm:h-8 md:w-7 md:h-7" />
								</div>
								<div
									className={`bg-white rounded p-2 ${!isGrid ? "border-2 border-sky-500" : null}`}
									onClick={() => setIsGrid(false)}>
									<Image priority src={listIcon} alt="list" className="w-5 h-5 sm:w-8 sm:h-8 md:w-7 md:h-7" />
								</div>
							</div>
						</div>

						<div role="list" className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
							{filteredPeople && filteredPeople.length > 0 ? (
								filteredPeople?.map((person: Person) => {
									return (
										<div key={person.email}>
											<GridTile>
												<div className="flex flex-col items-center p-8">
													<Avatar source={person.picture} size="large" />
													<h3 className="mt-6 text-sm sm:text-base font-semibold leading-7 tracking-tight text-gray-900">
														{`${person.name.first} ${person.name.last}`}, {person.dob.age}
													</h3>
													<p className="text-xs sm:text-sm leading-6 text-gray-600">{`${person.location.city}, ${person.location.country}`}</p>
												</div>
											</GridTile>
										</div>
									);
								})
							) : (
								// TODO: Add more here for ui
								<p> No one Found!</p>
							)}
						</div>
					</div>
				</div>
			</SiteContainer>
		</>
	);
}
