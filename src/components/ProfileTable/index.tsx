import { Profile } from "@src/models/profile";
import { Avatar } from "..";
import { getLocale } from "@src/utils/locale";
import { useRouter } from "next/router";

export interface ProfileTableProps {
	profiles?: Profile[];
}

export interface TableHeaderProps {
	title: string;
}

export const TableHeader = ({ title }: TableHeaderProps) => {
	return (
		<th scope="col" className="py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0">
			{title}
		</th>
	);
};

export interface TableDetailProps {
	detail: string;
	avatar?: boolean;
}

export const TableDetail = ({ detail }: TableDetailProps) => {
	return <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{detail}</td>;
};
export const ProfileTable = ({ profiles }: ProfileTableProps) => {
	//this was a simple and quick way to do translation. for a more production app i18n can be used.
	const late = getLocale();
	const router = useRouter();
	return (
		<div className="px-4 sm:px-6 lg:px-8 bg-white">
			<div className="mt-8 flow-root">
				<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
						<table className="min-w-full divide-y divide-gray-300">
							<thead>
								<tr>
									<TableHeader title={late.profile} />
									<TableHeader title={late.name} />
									<TableHeader title={late.age} />
									<TableHeader title={late.email} />
									<TableHeader title={late.city} />
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200">
								{profiles?.map((profile: Profile) => (
									<tr key={profile.email} onClick={() => router.push(`/profile/${profile.email}`)} style={{ cursor: "pointer" }}>
										<td className="px-3 py-4">
											<Avatar source={profile.picture} size="medium" />{" "}
										</td>
										<TableDetail detail={`${profile.name.first} ${profile.name.last}`} />
										<TableDetail detail={`${profile.dob.age}`} />
										<TableDetail detail={profile.email} />
										<TableDetail detail={profile.location.city} />
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};
