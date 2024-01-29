import React, { useState, useMemo, useEffect } from "react";
import { GetServerSideProps } from "next";
import { Profile } from "@src/models/profile";
import { GridTile, SiteContainer, Search, ProfileCard } from "@components";
import Image from "next/image";
import listIcon from "../../../public/list-ul-alt-svgrepo-com.svg";
import gridIcon from "../../../public/grid-svgrepo-com.svg";
import { getCache } from "@src/utils/caching";
import { ProfileTable } from "@src/components/ProfileTable";
import Head from "next/head";
import { getLocale } from "@src/utils/locale";

export const getServerSideProps: GetServerSideProps = async (context) => {
	const profiles = getCache("profiles");

	if (!profiles) {
		return {
			props: {
				error: true,
			},
		};
	}

	return {
		props: {
			profiles: profiles,
		},
	};
};

//TODO: clean up some of the types
export interface UserPageProps {
	profiles?: Profile[];
	error?: boolean;
}

export default function ProfilePage(props: UserPageProps) {
	const { profiles, error } = props;

	//@ts-ignore

	//this was a simple and quick way to do translation. for a more production app i18n can be used.
	const late = getLocale();

	const [isGrid, setIsGrid] = useState<boolean>(true);

	useEffect(() => {
		// Access localStorage in useEffect, which runs on the client side
		const savedView = localStorage.getItem("profileView");
		if (savedView !== null) {
			console.log("saved", savedView);
			setIsGrid(savedView === "grid");
		}
	}, []);

	const [search, setSearch] = useState<string>("");

	if (error) {
		return <div>Error occured please try again</div>;
	}

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	};

	//using memo here in case the user changes other states but people or search doesnt change
	const filteredProfiles = useMemo(() => {
		if (search === "") {
			return profiles;
		}

		return (
			profiles?.filter(
				(profile) =>
					profile.name.first.toLowerCase().includes(search.toLowerCase()) || profile.name.last.toLowerCase().includes(search.toLowerCase())
			) || []
		);
	}, [search, profiles]);

	const handleGridChange = (changed: boolean) => {
		setIsGrid(changed);
		localStorage.setItem("profileView", changed ? "grid" : "list");
		console.log(isGrid);
	};

	return (
		<>
			<SiteContainer>
				<Head>
					<title>{late.profile}</title>
				</Head>
				<div className="flex justify-center flex-col items-center">
					<div className="sm:max-w-[80%] w-full flex flex-col justify-center">
						<div className="mb-4">
							<h1 className="text-5xl font-bold my-4">{late.users}</h1>
						</div>
						<div className="flex flex-row items-center mb-4 justify-between">
							<div className="basis-4/5">
								<Search search={search} handleSearchChange={handleSearchChange} />
							</div>
							<div className="flex flex-row gap-1">
								{/* TODO: rip this out into a component and make sure icon stays centered. */}
								<div
									className={`bg-white rounded p-2 ${isGrid ? " border-2 border-sky-500" : null}`}
									onClick={() => handleGridChange(true)}>
									<Image priority src={gridIcon} alt="grid" className="w-5 h-5 sm:w-8 sm:h-8 md:w-7 md:h-7" />
								</div>
								<div
									className={`bg-white rounded p-2 ${!isGrid ? "border-2 border-sky-500" : null}`}
									onClick={() => handleGridChange(false)}>
									<Image priority src={listIcon} alt="list" className="w-5 h-5 sm:w-8 sm:h-8 md:w-7 md:h-7" />
								</div>
							</div>
						</div>

						{isGrid ? (
							<GridTile>
								{filteredProfiles && filteredProfiles.length > 0 ? (
									filteredProfiles?.map((profile: Profile) => {
										return (
											<div key={profile.email}>
												<ProfileCard profile={profile} />
											</div>
										);
									})
								) : (
									<p> {late.notFound}</p>
								)}
							</GridTile>
						) : (
							<ProfileTable profiles={filteredProfiles} />
						)}
					</div>
				</div>
			</SiteContainer>
		</>
	);
}
