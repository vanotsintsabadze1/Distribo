import Button from "../UI/Button";

export default function LoginForm() {
  return (
    <form className="flex flex-col gap-3">
      <label>Email</label>
      <input type="email" className="rounded-md border border-solid p-2 pl-4" />
      <label>Password</label>
      <input
        type="password"
        className="rounded-md border border-solid p-2 pl-4"
      />
      <div className="mb-5 flex items-start">
        <div className="flex h-5 items-center">
          <input
            id="remember"
            type="checkbox"
            value=""
            className="h-4 w-4 rounded border"
            required
          />
        </div>
        <label
          htmlFor="remember"
          className="ms-2 text-sm font-medium text-gray-900"
        >
          Remember me
        </label>
      </div>
      <div className="flex justify-between">
        <Button type="submit" color='secondary' textColor="white" width="full">Login</Button>
      </div>
    </form>
  );
}
