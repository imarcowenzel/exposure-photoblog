import Link from "next/link";

type Props = {
  loggedInUserIsOwner: boolean;
};

export const NoPostsYets = ({ loggedInUserIsOwner }: Props) => {
  // TODO: improve style css
  return (
    <div className="flex items-center justify-center w-full h-full">
      {loggedInUserIsOwner ? (
        <h3 className="text-center text-sm">
          You have no posts yet!
          <br />
          Submit your first post{" "}
          <Link href={"/submit"} className="text-blue-500">
            here
          </Link>
          !
        </h3>
      ) : (
        <h3 className="text-center text-sm">User has no posts yet!</h3>
      )}
    </div>
  );
};
