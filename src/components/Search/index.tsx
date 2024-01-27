export interface SearchProps {
	search: string;
	handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Search = ({ search, handleSearchChange }: SearchProps) => (
	<input
		className="border rounded-md p-2  md:w-4/5 lg:w-2/3 xl:w-1/2 2xl:w-1/3  w-full"
		onChange={handleSearchChange}
		value={search}
		alt="search"
		placeholder="Search..."
	/>
);
