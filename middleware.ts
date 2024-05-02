export { default } from "next-auth/middleware";
// TODO: pages to be safe
export const config = { matcher: ["/account", "/submit", "/profile/undefined"] };
