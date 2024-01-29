import { Profile } from "@src/models/profile";
import { GetServerSideProps } from "next";
import { getCache } from "@src/utils/caching";
import { DetailRow, Avatar, SiteContainer } from "@src/components";
import { DateTime } from "luxon";
import { en, es } from "../../../translations";
import { useRouter } from "next/router";

export interface ProfileDetailsProps {
	profile: Profile;
	error: boolean;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { email } = context.query;

	const profiles = getCache("profiles");

	const profile = profiles?.find((profile: Profile) => profile.email === email);

	if (!profile) {
		return {
			props: {
				error: true,
			},
		};
	}

	return {
		props: {
			profile: profile,
		},
	};
};

export const PersonDetails = (props: ProfileDetailsProps) => {
	const { profile, error } = props;
	//@ts-ignore
	const { locale } = useRouter();

	const late = locale === "es" ? es : en;
	return (
		<SiteContainer>
			<div className="w-4/5 max-w-screen-lg mx-auto px-4 sm:px-0">
				<div className="bg-white rounded p-4">
					<div className="px-4 sm:px-0 flex flex-row">
						<Avatar source={profile.picture} size="large" />
						<div className="flex flex-col justify-center ml-6">
							<h3 className="text-base font-semibold leading-7 text-gray-900">{late.profileInfo}</h3>
						</div>
					</div>
					<div className="mt-6 border-t border-gray-100">
						<dl className="divide-y divide-gray-100">
							<DetailRow title={late.fullName} detail={`${profile.name.first} ${profile.name.last}`} />
							<DetailRow title={late.age} detail={profile.dob.age.toString()} />
							<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
								<dt className="text-sm font-medium leading-6 text-gray-900">{late.address}</dt>
								<div className="sm:col-span-2">
									<dd className="mt-1 text-sm leading-6 text-gray-700">{`${profile.location.street.number} ${profile.location.street.name}`}</dd>
									<dd className="mt-1 text-sm leading-6 text-gray-700">{`${profile.location.city}, ${profile.location.state}, ${profile.location.postcode}`}</dd>
									<dd className="mt-1 text-sm leading-6 text-gray-700">{profile.location.country}</dd>
								</div>
							</div>
							<DetailRow title={late.email} detail={profile.email} />
							<DetailRow title={late.dob} detail={DateTime.fromISO(profile.dob.date).toFormat("MM/dd/yyyy")} />
							<DetailRow title={late.phone} detail={profile.phone} />
						</dl>
					</div>
				</div>
			</div>
		</SiteContainer>
	);
};

export default PersonDetails;
