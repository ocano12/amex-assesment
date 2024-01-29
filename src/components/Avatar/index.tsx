import Image from "next/image";
import React from "react";

export interface AvatarSrc {
	large: string;
	medium: string;
	thumbnail: string;
}

export interface AvatarProps {
	source: AvatarSrc;
	size?: "thumbnail" | "medium" | "large";
}

export const Avatar = ({ source, size = "medium" }: AvatarProps) => {
	const profilePicture = source[size];

	const imageSize = {
		thumbnail: "h-8 w-8",
		medium: "h-16 w-16",
		large: "h-28 w-28",
	};

	return (
		<div className={`relative ${imageSize[size]} rounded-full overflow-hidden`}>
			<Image
				src={profilePicture}
				fill={true}
				alt="Profile"
				quality={75}
				style={{ objectFit: "cover" }}
				sizes="(max-width: 640px) 32px, (max-width: 768px) 64px, 128px"
			/>
		</div>
	);
};
