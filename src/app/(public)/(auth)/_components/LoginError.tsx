import { CgDanger } from "react-icons/cg";

function LoginError() {
  return (
    <div className="px-4 rounded py-3 text-sm font-semibold mt-5 flex items-center gap-3 text-white bg-gradient-to-r from-red-500 to-red-400">
      <CgDanger size={20} />
      <p>Something went wrong, Please try again</p>
    </div>
  );
}
export default LoginError;
