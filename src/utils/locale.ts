import { en, es } from "../translations";
import { useRouter } from "next/router";
export const getLocale = () => {
	const { locale } = useRouter();
	return locale === "es" ? es : en;
};
