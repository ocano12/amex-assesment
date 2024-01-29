import axios, { AxiosResponse } from "axios";
import { GetServerSideProps } from "next";
import { RandomUserApiResponse } from "@src/models/profile";
import { setCache } from "@src/utils/caching";
import Link from "next/link";
import { SiteContainer } from "@src/components";
import { getLocale } from "../utils/locale";

export const getServerSideProps: GetServerSideProps = async (context) => {
	//TODO: just get 10 people for now. maybe later we can get custom number
	try {
		const getProfileResponse: AxiosResponse<RandomUserApiResponse> = await axios.get(`${process.env.CLIENT_DOMAIN}/api/profiles`, {
			params: {
				numberOfProfiles: 10,
			},
		});

		setCache("profiles", getProfileResponse.data.results);

		return {
			props: {},
		};
	} catch (error) {
		console.log(error);
		return {
			props: {
				error: true,
			},
		};
	}
};

export default function HomePage() {
	const late = getLocale();
	return (
		<SiteContainer>
			<div className="flex justify-center items-center flex-col">
				<Link href="/profile">
					<button
						type="button"
						className="inline-flex items-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 ">
						{late.viewProfile}
					</button>
				</Link>
			</div>
		</SiteContainer>
	);
}
